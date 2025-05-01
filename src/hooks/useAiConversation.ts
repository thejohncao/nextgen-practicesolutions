
import { useState, useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCoreConversation } from './ai-chat/useCoreConversation';
import { useAgentManagement } from './ai-chat/useAgentManagement';
import { AiMessage, TimeoutLevel } from './ai-chat/types';

/**
 * Main hook for AI conversation functionality
 */
export function useAiConversation() {
  // Generate unique conversation ID for this session if not already created
  const [conversationId] = useState(() => {
    const existingId = sessionStorage.getItem('nextgen_conversation_id');
    if (existingId) return existingId;
    
    const newId = `conversation-${uuidv4()}`;
    sessionStorage.setItem('nextgen_conversation_id', newId);
    return newId;
  });
  
  // Set up retry counter
  const [retryCount, setRetryCount] = useState(0);
  
  const resetRetries = useCallback(() => {
    setRetryCount(0);
  }, []);
  
  // Agent management hook
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
  
  // Core conversation functionality
  const {
    sendMessage: coreSendMessage,
    isTyping,
    isTimedOut, 
    timeoutLevel,
    error,
    cancelStreamingResponse
  } = useCoreConversation(
    currentAgent,
    agentConversations,
    setAgentConversations,
    saveMessagesToSession,
    conversationId,
    resetRetries
  );
  
  // Retry handler - attempts to resend the last user message
  const handleRetry = useCallback(() => {
    // Find the last user message
    const lastUserMessage = [...messages].reverse().find(msg => msg.isUser);
    if (!lastUserMessage) return;
    
    // Increment retry count
    setRetryCount(prev => prev + 1);
    
    // Cancel any ongoing streaming
    cancelStreamingResponse();
    
    // Remove the last AI message if it was empty or an error
    setAgentConversations(prev => {
      const currentMessages = [...prev[currentAgent]];
      const lastMessage = currentMessages[currentMessages.length - 1];
      
      // If the last message was from AI and is empty/error, remove it
      if (lastMessage && !lastMessage.isUser && 
          (lastMessage.text.trim() === '' || 
           lastMessage.text.includes('trouble') || 
           lastMessage.text.includes('error'))) {
        currentMessages.pop();
      }
      
      return {
        ...prev,
        [currentAgent]: currentMessages
      };
    });
    
    // Resend the last user message
    coreSendMessage(lastUserMessage.text, true);
  }, [messages, currentAgent, setAgentConversations, coreSendMessage, cancelStreamingResponse]);
  
  // Reset the conversation to start over
  const handleStartOver = useCallback(() => {
    // Cancel any ongoing streaming response
    cancelStreamingResponse();
    
    // Clear all agent conversations
    clearAgentConversations(conversationId);
    
    // Reset the current agent to Miles
    resetCurrentAgent();
    
    // Reset retry count
    resetRetries();
  }, [cancelStreamingResponse, clearAgentConversations, conversationId, resetCurrentAgent, resetRetries]);
  
  // Clear just the current agent's conversation
  const clearConversation = useCallback(() => {
    // Get the agent's welcome message
    const currentAgentName = currentAgent;
    
    // Clear the conversation for this agent only
    setAgentConversations(prev => {
      return {
        ...prev,
        [currentAgentName]: []
      };
    });
    
    // Remove from session storage
    sessionStorage.removeItem(`${conversationId}-${currentAgentName}`);
    
    // Reset retry count
    resetRetries();
  }, [currentAgent, setAgentConversations, conversationId, resetRetries]);
  
  return {
    messages,
    sendMessage: coreSendMessage,
    isTyping,
    currentAgent,
    timeoutLevel,
    isTimedOut,
    handleRetry,
    handleStartOver,
    changeAgent,
    clearConversation
  };
}

// Re-export the types
export type { AiMessage, TimeoutLevel } from './ai-chat/types';
