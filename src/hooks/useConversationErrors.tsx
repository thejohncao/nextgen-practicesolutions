
import { useState } from 'react';
import { AiMessage } from '@/types/conversation';

export const useConversationErrors = (
  isTyping: boolean,
  currentAgent: string, 
  setMessages: React.Dispatch<React.SetStateAction<AiMessage[]>>
) => {
  const [isTimedOut, setIsTimedOut] = useState(false);
  
  const handleRetry = () => {
    setIsTimedOut(false);
    // Generate a fallback response
    const fallback: AiMessage = {
      text: "Let me continue where we left off. What specific information would you like about your schedule?",
      isUser: false,
      timestamp: new Date().toISOString(),
      agent: currentAgent
    };
    
    setMessages(prev => [...prev, fallback]);
  };
  
  const handleStartOver = () => {
    setIsTimedOut(false);
    // Clear messages and add a new welcome message
    const welcomeBack: AiMessage = {
      text: "Let's start fresh. How can I help you with your practice management today?",
      isUser: false,
      timestamp: new Date().toISOString(),
      agent: currentAgent
    };
    
    setMessages([welcomeBack]);
  };
  
  return {
    isTimedOut,
    setIsTimedOut,
    handleRetry,
    handleStartOver
  };
};
