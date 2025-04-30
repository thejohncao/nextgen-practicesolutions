import { useState, useEffect } from 'react';
import { AiMessage } from '@/types/conversation';

export const useEmailCollection = (messages: AiMessage[]) => {
  // Always keep email dialog hidden
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [sessionMessageCount, setSessionMessageCount] = useState(0);
  
  // Track message count but don't show email dialog
  useEffect(() => {
    setSessionMessageCount(messages.filter(m => m.isUser).length);
    // We never show the email dialog - keeping this commented out:
    // setShowEmailDialog(sessionMessageCount >= 7 && !showEmailDialog);
  }, [messages]);

  const handleFirstUserMessage = () => {
    // If this is the first user message or the second with the first being from the assistant
    const isFirstUserMessage = 
      messages.length === 0 || 
      (messages.length === 1 && !messages[0].isUser);
      
    // Do not show email dialog - intentionally empty
  };

  return {
    showEmailDialog: false, // Always return false to never show the dialog
    setShowEmailDialog, // Still return this for interface compatibility
    sessionMessageCount,
    handleFirstUserMessage
  };
};
