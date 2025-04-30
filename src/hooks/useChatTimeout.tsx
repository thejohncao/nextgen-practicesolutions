
import { useState, useEffect } from 'react';

export const useChatTimeout = (isTyping: boolean, timeoutDuration: number = 10000) => {
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    if (isTyping) {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Set a new timeout for 10 seconds
      const newTimeoutId = window.setTimeout(() => {
        setShowTimeout(true);
      }, timeoutDuration);
      
      setTimeoutId(Number(newTimeoutId));
    } else {
      // Clear timeout when not typing
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setShowTimeout(false);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isTyping, timeoutDuration]);

  const resetTimeout = () => {
    setShowTimeout(false);
  };

  const handleQuickReply = (action: string) => {
    resetTimeout();
    return action;
  };

  return { 
    showTimeout, 
    resetTimeout,
    handleQuickReply
  };
};
