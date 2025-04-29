
import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  callOpenAI, 
  getAgentSystemPrompt, 
  detectAgentFromMessage, 
  isVagueInput, 
  getAgentFallbackResponse,
  AGENT_SUGGESTIONS,
  Message 
} from '@/lib/openai';
import { toast } from '@/components/ui/use-toast';

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
const USER_INTENT_KEY = 'nextgen_user_intent';
const USER_TOPIC_KEY = 'nextgen_last_topic';

export function useAiConversation() {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string>(() => {
    // Try to restore the current agent from session storage
    const savedAgent = sessionStorage.getItem(CURRENT_AGENT_KEY);
    return savedAgent || "miles";
  });
  const [userIntent, setUserIntent] = useState<string | undefined>(() => {
    // Try to restore user intent from session storage
    return sessionStorage.getItem(USER_INTENT_KEY) || undefined;
  });
  const [lastTopic, setLastTopic] = useState<string | undefined>(() => {
    // Try to restore user's last topic from session storage
    return sessionStorage.getItem(USER_TOPIC_KEY) || undefined;
  });
  const [error, setError] = useState<string | null>(null);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [conversationId, setConversationId] = useState<string>(
    () => `conversation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );
  const [showExpandedMessage, setShowExpandedMessage] = useState<number | null>(null);
  const [isVagueQuery, setIsVagueQuery] = useState<boolean>(false);
  
  // Timeout reference for response waiting
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Define a function to detect and save user intent from message
  const detectAndSaveUserIntent = useCallback((message: string) => {
    // If it's a vague query, don't try to detect intent
    if (isVagueInput(message)) {
      return undefined;
    }
    
    // Store the message as last topic for memory context (if not vague)
    if (message.length > 10) {
      setLastTopic(message);
      sessionStorage.setItem(USER_TOPIC_KEY, message);
    }
    
    // Simple intent detection logic for broad categorization
    let detectedIntent: string | undefined;
    
    if (message.toLowerCase().includes('patient') || 
        message.toLowerCase().includes('growth') ||
        message.toLowerCase().includes('marketing') ||
        message.toLowerCase().includes('lead') ||
        message.toLowerCase().includes('veneer') ||
        message.toLowerCase().includes('ortho')) {
      detectedIntent = 'marketing';
    } else if (message.toLowerCase().includes('treatment') || 
               message.toLowerCase().includes('case acceptance') ||
               message.toLowerCase().includes('conversion') || 
               message.toLowerCase().includes('ghosting') ||
               message.toLowerCase().includes('consult')) {
      detectedIntent = 'treatment';
    } else if (message.toLowerCase().includes('team') || 
               message.toLowerCase().includes('staff') ||
               message.toLowerCase().includes('training') || 
               message.toLowerCase().includes('front desk') ||
               message.toLowerCase().includes('assistant')) {
      detectedIntent = 'training';
    } else if (message.toLowerCase().includes('scheduling') ||
               message.toLowerCase().includes('no-show') ||
               message.toLowerCase().includes('operations') ||
               message.toLowerCase().includes('workflow') ||
               message.toLowerCase().includes('efficiency')) {
      detectedIntent = 'operations';
    }
    
    if (detectedIntent) {
      setUserIntent(detectedIntent);
      sessionStorage.setItem(USER_INTENT_KEY, detectedIntent);
    }
    
    return detectedIntent;
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      // Check if returning user with saved intent
      if (userIntent) {
        setMessages([
          {
            text: `Welcome back — I remember you were exploring ${userIntent}. Would you like to continue from there?`,
            isUser: false,
            agent: "miles",
            timestamp: new Date(),
          },
        ]);
      } else {
        // First-time greeting
        setMessages([
          {
            text: "Hey, I'm Miles — your AI Concierge here at NextGen.\nWhat can I help you with today?",
            isUser: false,
            agent: "miles",
            timestamp: new Date(),
          },
        ]);
      }
    }
  }, [messages.length, userIntent]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.isUser) {
        // Update agent based on response content
        if (lastMessage.text.includes("Let me bring in Giselle") || 
            lastMessage.text.includes("Giselle here") ||
            lastMessage.text.includes("Introducing Giselle")) {
          setCurrentAgent("giselle");
          sessionStorage.setItem(CURRENT_AGENT_KEY, "giselle");
        } else if (lastMessage.text.includes("Let me bring in Devon") || 
                  lastMessage.text.includes("Devon here") ||
                  lastMessage.text.includes("I'm Devon") ||
                  lastMessage.text.includes("Introducing Devon")) {
          setCurrentAgent("devon");
          sessionStorage.setItem(CURRENT_AGENT_KEY, "devon");
        } else if (lastMessage.text.includes("Let me bring in Alma") || 
                  lastMessage.text.includes("Alma here") ||
                  lastMessage.text.includes("I'm Alma") ||
                  lastMessage.text.includes("Introducing Alma")) {
          setCurrentAgent("alma");
          sessionStorage.setItem(CURRENT_AGENT_KEY, "alma");
        } else if (lastMessage.text.includes("Back to Miles") || 
                  lastMessage.text.includes("Miles here") ||
                  lastMessage.text.includes("Introducing Miles")) {
          setCurrentAgent("miles");
          sessionStorage.setItem(CURRENT_AGENT_KEY, "miles");
        }
      }
    }
  }, [messages]);

  const saveMessagesToSession = useCallback((newMessages: AiMessage[]) => {
    try {
      sessionStorage.setItem(conversationId, JSON.stringify(newMessages));
    } catch (err) {
      console.error("Error saving messages to sessionStorage:", err);
    }
  }, [conversationId]);

  useEffect(() => {
    try {
      const savedMessages = sessionStorage.getItem(conversationId);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages) as AiMessage[];
        const messagesWithDates = parsedMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      }
    } catch (err) {
      console.error("Error loading messages from sessionStorage:", err);
    }
  }, [conversationId]);

  // Handle timeout 
  const startResponseTimeout = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout for 15 seconds
    timeoutRef.current = setTimeout(() => {
      setIsTimedOut(true);
      setIsTyping(false);
      console.log("Response timeout triggered - showing fallback message");
    }, 15000);
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

  // Get suggestions for the current agent
  const getAgentSuggestions = useCallback(() => {
    return AGENT_SUGGESTIONS[currentAgent.toLowerCase() as keyof typeof AGENT_SUGGESTIONS] || 
           AGENT_SUGGESTIONS.miles;
  }, [currentAgent]);

  // Handle vague query with fallback response
  const handleVagueQuery = useCallback((userMessage: string) => {
    setIsVagueQuery(true);
    
    // Get agent-specific fallback response
    const fallbackResponse = getAgentFallbackResponse(currentAgent);
    
    // Add fallback to the conversation
    const newMessages = [...messages, {
      text: userMessage,
      isUser: true,
      agent: currentAgent,
      timestamp: new Date()
    }, {
      text: fallbackResponse,
      isUser: false,
      agent: currentAgent, 
      timestamp: new Date()
    }];
    
    setMessages(newMessages);
    saveMessagesToSession(newMessages);
    
    return true; // Indicate that we handled the vague query
  }, [currentAgent, messages, saveMessagesToSession]);

  const sendMessage = useCallback(async (userMessage: string, isRetry: boolean = false) => {
    if (!userMessage.trim()) return;

    // Check if this is a vague query that should trigger a fallback response
    if (!isRetry && isVagueInput(userMessage)) {
      // Handle vague query with agent-specific fallback
      if (handleVagueQuery(userMessage)) {
        return; // Exit early, fallback response was added
      }
    }
    
    setIsVagueQuery(false); // Reset vague query flag for non-vague inputs

    // Don't add user message again if this is a retry
    if (!isRetry) {
      // Detect user intent from message
      detectAndSaveUserIntent(userMessage);
      
      // Detect suggested agent
      const suggestedAgent = detectAgentFromMessage(userMessage);

      const newUserMessage = {
        text: userMessage,
        isUser: true,
        agent: currentAgent,
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, newUserMessage];
      setMessages(updatedMessages);
      saveMessagesToSession(updatedMessages);
    }
    
    setIsTimedOut(false); // Reset timeout status
    setIsTyping(true);
    setError(null);
    setShowExpandedMessage(null); // Reset expanded message state
    startResponseTimeout(); // Start timeout tracking

    try {
      const messageHistory: Message[] = messages.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text,
      }));

      if (!isRetry) {
        messageHistory.push({
          role: "user",
          content: userMessage,
        });
      } else {
        // If retry, find the last user message
        const lastUserMessage = [...messages].reverse().find(msg => msg.isUser);
        if (lastUserMessage) {
          messageHistory.push({
            role: "user",
            content: lastUserMessage.text,
          });
        }
      }
      
      // Add routing hint for agent specialization
      const suggestedAgent = detectAgentFromMessage(isRetry ? 
        [...messages].reverse().find(msg => msg.isUser)?.text || "" : userMessage);
      
      // Get message count for conversation context
      const messageLength = messages.length;
      
      // Use last topic for memory context in system prompt
      const currentTopic = lastTopic || userMessage;
        
      // Get appropriate system prompt based on agent
      const systemPrompt = getAgentSystemPrompt(currentAgent, currentTopic, messageLength);

      if (suggestedAgent !== currentAgent && messages.length > 1) {
        messageHistory.push({
          role: "system",
          content: `The user's question seems to be about ${suggestedAgent}'s specialty. Consider handing off to ${suggestedAgent}.`
        });
      }

      const response = await callOpenAI(messageHistory, systemPrompt);

      clearResponseTimeout(); // Clear timeout since we received a response

      if (response) {
        const aiMessage = {
          text: response,
          isUser: false,
          agent: currentAgent,
          timestamp: new Date(),
        };
        
        const newMessages = [...(isRetry ? messages : messages.concat({
          text: userMessage,
          isUser: true,
          agent: currentAgent,
          timestamp: new Date(),
        })), aiMessage];
        
        setMessages(newMessages);
        saveMessagesToSession(newMessages);
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
  }, [messages, currentAgent, saveMessagesToSession, startResponseTimeout, clearResponseTimeout, detectAndSaveUserIntent, handleVagueQuery, lastTopic]);

  // Clear conversation and reset state
  const clearConversation = useCallback(() => {
    setMessages([]);
    setUserIntent(undefined);
    setLastTopic(undefined);
    setCurrentAgent("miles");
    setIsVagueQuery(false);
    sessionStorage.removeItem(USER_INTENT_KEY);
    sessionStorage.removeItem(USER_TOPIC_KEY);
    sessionStorage.removeItem(CURRENT_AGENT_KEY);
    const newConversationId = `conversation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setConversationId(newConversationId);
    sessionStorage.removeItem(conversationId);
    setShowExpandedMessage(null);
  }, [conversationId]);
  
  // Toggle message expansion for long messages
  const toggleMessageExpansion = useCallback((index: number) => {
    setShowExpandedMessage(prev => prev === index ? null : index);
  }, []);

  return {
    messages,
    isTyping,
    currentAgent,
    userIntent,
    error,
    isTimedOut,
    isVagueQuery,
    showExpandedMessage,
    sendMessage,
    handleRetry,
    handleStartOver,
    clearConversation,
    toggleMessageExpansion,
    getAgentSuggestions
  };
}
