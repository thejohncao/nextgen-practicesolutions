import { useState, useEffect } from 'react';
import { AiMessage } from '@/types/conversation';

export const useEmailCollection = (messages: AiMessage[]) => {
  // Always keep email dialog hidden per user request
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [sessionMessageCount, setSessionMessageCount] = useState(0);
  
  // Track message count but don't show email dialog
  useEffect(() => {
    setSessionMessageCount(messages.filter(m => m.isUser).length);
    
    // Don't show email dialog even after 8 messages
    // setShowEmailDialog remains false
  }, [messages]);

  const handleFirstUserMessage = () => {
    // If this is the first user message or the second with the first being from the assistant
    const isFirstUserMessage = 
      messages.length === 0 || 
      (messages.length === 1 && !messages[0].isUser);
      
    // Do not show email dialog
  };

  return {
    showEmailDialog,
    setShowEmailDialog,
    sessionMessageCount,
    handleFirstUserMessage
  };
};
