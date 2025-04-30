
import { useState, useEffect } from 'react';
import { AiMessage } from '@/types/conversation';

export const useEmailCollection = (messages: AiMessage[]) => {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [sessionMessageCount, setSessionMessageCount] = useState(0);
  
  // Track message count to show email dialog when session limit is reached
  useEffect(() => {
    setSessionMessageCount(messages.filter(m => m.isUser).length);
    
    // Show email dialog after 8 messages (counting user messages)
    if (messages.filter(m => m.isUser).length >= 8) {
      setShowEmailDialog(true);
    }
  }, [messages]);

  const handleFirstUserMessage = () => {
    // If this is the first user message or the second with the first being from the assistant
    const isFirstUserMessage = 
      messages.length === 0 || 
      (messages.length === 1 && !messages[0].isUser);
      
    // Show email dialog after a delay for the first message
    if (isFirstUserMessage) {
      setTimeout(() => setShowEmailDialog(true), 5000);
    }
  };

  return {
    showEmailDialog,
    setShowEmailDialog,
    sessionMessageCount,
    handleFirstUserMessage
  };
};
