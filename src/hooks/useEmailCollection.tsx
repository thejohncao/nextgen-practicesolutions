
import { useState, useEffect } from 'react';
import { AiMessage } from '@/types/conversation';

export const useEmailCollection = (messages: AiMessage[]) => {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [sessionMessageCount, setSessionMessageCount] = useState(0);
  
  // Track message count to show email dialog when session limit is reached
  useEffect(() => {
    setSessionMessageCount(messages.filter(m => m.isUser).length);
    
    // We're no longer showing the email dialog automatically
    // Left commented for future reference
    // if (messages.filter(m => m.isUser).length >= 8) {
    //   setShowEmailDialog(true);
    // }
  }, [messages]);

  const handleFirstUserMessage = () => {
    // No longer triggering email dialog on first message
    // Left commented for future reference
    // const isFirstUserMessage = 
    //   messages.length === 0 || 
    //   (messages.length === 1 && !messages[0].isUser);
    //   
    // if (isFirstUserMessage) {
    //   setTimeout(() => setShowEmailDialog(true), 5000);
    // }
  };

  return {
    showEmailDialog,
    setShowEmailDialog,
    sessionMessageCount,
    handleFirstUserMessage
  };
};
