
import { useState, useCallback } from 'react';
import { useTimeout } from './useTimeout';
import { AiMessage } from '@/types/conversation';

export const useConversationErrors = (
  isTyping: boolean, 
  currentAgent: string,
  setMessages: (updater: (prevMessages: AiMessage[]) => AiMessage[]) => void
) => {
  const [isTimedOut, setIsTimedOut] = useState(false);
  
  // Timeout effect to simulate connection issues occasionally
  useTimeout(() => {
    // Simulate timeout after a random long response time
    if (isTyping && Math.random() < 0.05) { // 5% chance of timeout
      setIsTimedOut(true);
    }
  }, isTyping ? Math.random() * 10000 + 5000 : null); // Random timeout between 5-15 seconds

  // Retry after timeout
  const handleRetry = useCallback(() => {
    setIsTimedOut(false);
    
    // Generate a recovery message
    setTimeout(() => {
      const recoveryMessage: AiMessage = {
        text: "I apologize for the connection issue. Let's continue our conversation. What else would you like to know?",
        isUser: false,
        timestamp: new Date().toISOString(),
        agent: currentAgent
      };
      
      setMessages(prev => [...prev, recoveryMessage]);
    }, 1500);
  }, [currentAgent, setMessages]);

  // Start over after timeout
  const handleStartOver = useCallback(() => {
    setIsTimedOut(false);
    setMessages([]);
    
    // Add a welcome message from the current agent using the agent-specific welcome message
    setTimeout(() => {
      const welcomeMessage: AiMessage = {
        text: "Let's start fresh. How can I help you today?",
        isUser: false,
        timestamp: new Date().toISOString(),
        agent: currentAgent
      };
      
      setMessages([welcomeMessage]);
    }, 1000);
  }, [currentAgent, setMessages]);

  return {
    isTimedOut,
    setIsTimedOut,
    handleRetry,
    handleStartOver
  };
};
