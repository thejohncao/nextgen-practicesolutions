
import { useState, useCallback, useEffect, useRef } from 'react';
import { callOpenAI, SYSTEM_PROMPT, detectAgentFromMessage, Message } from '@/lib/openai';
import { toast } from '@/components/ui/use-toast';
import { getAgentChatData } from '@/data/agentChatData';

type MessageRole = 'user' | 'assistant' | 'system';

export interface AiMessage {
  text: string;
  isUser: boolean;
  agent: string;
  timestamp: Date;
}

export interface ConversationState {
  messages: AiMessage[];
  currentAgent: string;
  userIntent?: string;
}

// Keys for local storage
const CURRENT_AGENT_KEY = 'nextgen_current_agent';
const SELECTED_AGENT_KEY = 'nextgen_selected_agent';
const USER_INTENT_KEY = 'nextgen_user_intent';

export function useAiConversation() {
  // Store conversations by agent
  const [agentConversations, setAgentConversations] = useState<Record<string, AiMessage[]>>({
    miles: [],
    giselle: [],
    devon: [],
    alma: []
  });
  
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string>(() => {
    // Try to restore the selected agent from session storage, fall back to current agent
    const selectedAgent = sessionStorage.getItem(SELECTED_AGENT_KEY);
    if (selectedAgent) {
      sessionStorage.removeItem(SELECTED_AGENT_KEY); // Clear after reading
      return selectedAgent;
    }
    
    // Fall back to the last used agent
    const savedAgent = sessionStorage.getItem(CURRENT_AGENT_KEY);
    return savedAgent || "miles";
  });
  
  const [userIntent, setUserIntent] = useState<string | undefined>(() => {
    // Try to restore user intent from session storage
    return sessionStorage.getItem(USER_INTENT_KEY) || undefined;
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [conversationId, setConversationId] = useState<string>(
    () => `conversation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );
  
  // Get current messages for the current agent
  const messages = agentConversations[currentAgent] || [];
  
  // Timeout reference for response waiting
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Change the current agent
  const changeAgent = useCallback((agentName: string) => {
    const lowerCaseName = agentName.toLowerCase();
    if (['miles', 'giselle', 'devon', 'alma'].includes(lowerCaseName)) {
      setCurrentAgent(lowerCaseName);
      sessionStorage.setItem(CURRENT_AGENT_KEY, lowerCaseName);
      
      // Initialize conversation for this agent if needed
      setAgentConversations(prev => {
        if (!prev[lowerCaseName] || prev[lowerCaseName].length === 0) {
          const chatData = getAgentChatData(lowerCaseName);
          return {
            ...prev,
            [lowerCaseName]: [{
              text: chatData.welcomeMessage,
              isUser: false,
              agent: lowerCaseName,
              timestamp: new Date()
            }]
          };
        }
        return prev;
      });
    }
  }, []);

  // Define a function to detect and save user intent from message
  const detectAndSaveUserIntent = useCallback((message: string) => {
    // Enhanced intent detection logic with more specific keywords
    let detectedIntent: string | undefined;
    
    const lowerMessage = message.toLowerCase();
    
    // Marketing/Growth intent
    if (lowerMessage.includes('patient acquisition') || 
        lowerMessage.includes('growth') ||
        lowerMessage.includes('marketing') ||
        lowerMessage.includes('leads') ||
        lowerMessage.includes('advertising') ||
        lowerMessage.includes('campaign') ||
        lowerMessage.includes('social media') ||
        lowerMessage.includes('facebook') ||
        lowerMessage.includes('google ads')) {
      detectedIntent = 'marketing';
    } 
    // Treatment intent
    else if (lowerMessage.includes('treatment') || 
             lowerMessage.includes('case acceptance') ||
             lowerMessage.includes('conversion') ||
             lowerMessage.includes('follow-up') ||
             lowerMessage.includes('patient education') ||
             lowerMessage.includes('consultation') ||
             lowerMessage.includes('close cases')) {
      detectedIntent = 'treatment';
    } 
    // Training/system intent
    else if (lowerMessage.includes('team') || 
             lowerMessage.includes('staff') ||
             lowerMessage.includes('training') ||
             lowerMessage.includes('sop') ||
             lowerMessage.includes('onboarding') ||
             lowerMessage.includes('systems') ||
             lowerMessage.includes('workflow') ||
             lowerMessage.includes('protocol')) {
      detectedIntent = 'training';
    }
    // Scheduling/operations intent
    else if (lowerMessage.includes('schedule') || 
             lowerMessage.includes('appointment') ||
             lowerMessage.includes('front desk') ||
             lowerMessage.includes('no-show') ||
             lowerMessage.includes('cancellation') ||
             lowerMessage.includes('reschedule') ||
             lowerMessage.includes('booking')) {
      detectedIntent = 'operations';
    }
    
    if (detectedIntent) {
      setUserIntent(detectedIntent);
      sessionStorage.setItem(USER_INTENT_KEY, detectedIntent);
    }
    
    return detectedIntent;
  }, []);

  // Initialize conversations for agents
  useEffect(() => {
    setAgentConversations(prev => {
      const updatedConversations = { ...prev };
      
      // For each agent, initialize with welcome message if empty
      ['miles', 'giselle', 'devon', 'alma'].forEach(agentName => {
        if (!updatedConversations[agentName] || updatedConversations[agentName].length === 0) {
          const chatData = getAgentChatData(agentName);
          updatedConversations[agentName] = [{
            text: chatData.welcomeMessage,
            isUser: false,
            agent: agentName,
            timestamp: new Date()
          }];
        }
      });
      
      return updatedConversations;
    });
  }, []);

  // Handle timeout 
  const startResponseTimeout = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout for 12 seconds (increased from 10)
    timeoutRef.current = setTimeout(() => {
      setIsTimedOut(true);
      setIsTyping(false);
      console.log("Response timeout triggered - showing fallback message");
    }, 12000);
  }, []);
  
  // Clear timeout when response is received
  const clearResponseTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Handle retry after timeout
  const handleRetry = useCallback(() => {
    setIsTimedOut(false);
    // Restart the last message exchange
    const lastUserMessage = [...messages].reverse().find(msg => msg.isUser);
    if (lastUserMessage) {
      sendMessage(lastUserMessage.text, true);
    }
  }, [messages]);
  
  // Handle start over after timeout
  const handleStartOver = useCallback(() => {
    setIsTimedOut(false);
    clearConversation();
  }, []);

  const saveMessagesToSession = useCallback((agent: string, newMessages: AiMessage[]) => {
    try {
      sessionStorage.setItem(`${conversationId}-${agent}`, JSON.stringify(newMessages));
    } catch (err) {
      console.error(`Error saving messages for ${agent} to sessionStorage:`, err);
    }
  }, [conversationId]);

  const sendMessage = useCallback(async (userMessage: string, isRetry: boolean = false) => {
    if (!userMessage.trim()) return;

    // Don't add user message again if this is a retry
    if (!isRetry) {
      // Enhanced: Detect user intent from message for better agent routing
      const detectedIntent = detectAndSaveUserIntent(userMessage);
      
      // Potentially switch agent based on detected intent (if intent is strong)
      if (detectedIntent) {
        const shouldSwitchAgent = userMessage.length > 20; // Only consider switching for longer messages
        if (shouldSwitchAgent) {
          // Map intent to agent
          let suggestedAgent = currentAgent;
          switch(detectedIntent) {
            case 'marketing': suggestedAgent = 'giselle'; break;
            case 'treatment': suggestedAgent = 'devon'; break; 
            case 'training': suggestedAgent = 'alma'; break;
            case 'operations': suggestedAgent = 'miles'; break;
          }
          
          // Only switch if we're not already using that agent
          if (suggestedAgent !== currentAgent) {
            console.log(`Intent suggests switching from ${currentAgent} to ${suggestedAgent}`);
            // We could auto-switch here, but for now just log it
          }
        }
      }
      
      // Add user message to current agent's conversation
      setAgentConversations(prev => {
        const agentMessages = [...(prev[currentAgent] || [])];
        agentMessages.push({
          text: userMessage,
          isUser: true,
          agent: currentAgent,
          timestamp: new Date()
        });
        const updatedConversations = {
          ...prev,
          [currentAgent]: agentMessages
        };
        
        // Save to session storage
        saveMessagesToSession(currentAgent, agentMessages);
        
        return updatedConversations;
      });
    }
    
    setIsTimedOut(false); // Reset timeout status
    setIsTyping(true);
    setError(null);
    startResponseTimeout(); // Start timeout tracking

    try {
      // Get current agent's messages - ensure we send full history for context
      const agentMessages = agentConversations[currentAgent] || [];
      
      // Transform to OpenAI message format, preserving all conversation history
      const messageHistory: Message[] = agentMessages.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text,
      }));

      // For retry, we find the last user message and use that
      if (isRetry) {
        const lastUserMessage = [...agentMessages].reverse().find(msg => msg.isUser);
        if (lastUserMessage) {
          // We add it explicitly to make sure it's the last message
          messageHistory.push({
            role: "user",
            content: lastUserMessage.text,
          });
        }
      } else {
        // Not a retry, so we add the new user message
        messageHistory.push({
          role: "user",
          content: userMessage,
        });
      }
      
      // Use agent-specific system prompt with the enhanced prompts
      const agentData = getAgentChatData(currentAgent);
      const systemPrompt = agentData.systemPrompt || SYSTEM_PROMPT;

      const response = await callOpenAI(messageHistory, systemPrompt);

      clearResponseTimeout(); // Clear timeout since we received a response

      if (response) {
        setAgentConversations(prev => {
          // If retry, we don't add the user message again
          const agentMessages = isRetry 
            ? [...(prev[currentAgent] || [])]
            : [...(prev[currentAgent] || []), {
                text: userMessage,
                isUser: true,
                agent: currentAgent,
                timestamp: new Date()
              }];
          
          // Add AI response with full content (no truncation)
          agentMessages.push({
            text: response,
            isUser: false,
            agent: currentAgent,
            timestamp: new Date()
          });
          
          const updatedConversations = {
            ...prev,
            [currentAgent]: agentMessages
          };
          
          // Save updated conversation to session storage
          saveMessagesToSession(currentAgent, agentMessages);
          
          return updatedConversations;
        });
      } else {
        setError("Failed to get response from AI. Please try again.");
        setIsTimedOut(true); // Show timeout UI if response failed
      }
    } catch (err) {
      console.error("Error in AI conversation:", err);
      setError("Something went wrong. Please try again.");
      setIsTimedOut(true); // Show timeout UI if there was an error
    } finally {
      setIsTyping(false);
      clearResponseTimeout(); // Clear timeout just in case
    }
  }, [
    currentAgent, 
    agentConversations, 
    saveMessagesToSession, 
    startResponseTimeout, 
    clearResponseTimeout, 
    detectAndSaveUserIntent
  ]);

  // Clear conversation and reset state
  const clearConversation = useCallback(() => {
    // Reset all agent conversations
    setAgentConversations({
      miles: [],
      giselle: [],
      devon: [],
      alma: []
    });
    
    setUserIntent(undefined);
    setCurrentAgent("miles");
    sessionStorage.removeItem(USER_INTENT_KEY);
    sessionStorage.removeItem(CURRENT_AGENT_KEY);
    
    // Generate new conversation ID
    const newConversationId = `conversation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setConversationId(newConversationId);
    
    // Clean up old conversation data from session storage
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith(conversationId)) {
        sessionStorage.removeItem(key);
      }
    });
    
    // Initialize new welcome messages
    setTimeout(() => {
      ['miles', 'giselle', 'devon', 'alma'].forEach(agentName => {
        const chatData = getAgentChatData(agentName);
        setAgentConversations(prev => ({
          ...prev,
          [agentName]: [{
            text: chatData.welcomeMessage,
            isUser: false,
            agent: agentName,
            timestamp: new Date()
          }]
        }));
      });
    }, 100);
  }, [conversationId]);

  return {
    messages,
    isTyping,
    currentAgent,
    userIntent,
    error,
    isTimedOut,
    sendMessage,
    changeAgent,
    handleRetry,
    handleStartOver,
    clearConversation
  };
}
