
import { useState, useCallback } from 'react';
import { callOpenAI } from '@/lib/openai';
import { toast } from '@/components/ui/use-toast';
import { getAgentChatData } from '@/data/agentChatData';
import { useAgentManagement } from './ai-chat/useAgentManagement';
import { useIntentDetection } from './ai-chat/useIntentDetection';
import { useResponseTimeout } from './ai-chat/useResponseTimeout';

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

export function useAiConversation() {
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string>(
    () => `conversation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );
  
  // Import sub-hooks
  const { 
    agentConversations, 
    setAgentConversations, 
    currentAgent, 
    messages, 
    changeAgent, 
    saveMessagesToSession, 
    clearAgentConversations, 
    resetCurrentAgent 
  } = useAgentManagement();
  
  const { 
    userIntent, 
    setUserIntent, 
    detectAndSaveUserIntent, 
    clearUserIntent 
  } = useIntentDetection();
  
  const { 
    isTimedOut, 
    setIsTimedOut, 
    startResponseTimeout, 
    clearResponseTimeout 
  } = useResponseTimeout();

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

  // Send a message to the AI
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
        saveMessagesToSession(conversationId, currentAgent, agentMessages);
        
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
      const messageHistory = agentMessages.map(msg => ({
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
      const systemPrompt = agentData.systemPrompt;

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
          saveMessagesToSession(conversationId, currentAgent, agentMessages);
          
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
    conversationId,
    detectAndSaveUserIntent,
    saveMessagesToSession,
    startResponseTimeout,
    clearResponseTimeout
  ]);

  // Clear conversation and reset state
  const clearConversation = useCallback(() => {
    clearAgentConversations(conversationId);
    clearUserIntent();
    resetCurrentAgent();
    
    // Generate new conversation ID
    const newConversationId = `conversation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setConversationId(newConversationId);
  }, [conversationId, clearAgentConversations, clearUserIntent, resetCurrentAgent]);

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
