
import { useState, useEffect } from 'react';

export const useChatTimeout = (isTyping: boolean, timeoutDuration: number = 3500) => {
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [showTimeout, setShowTimeout] = useState(false);
  const [isFallbackActive, setIsFallbackActive] = useState(false);

  useEffect(() => {
    if (isTyping) {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Set a new timeout - 3.5 seconds
      const newTimeoutId = window.setTimeout(() => {
        setShowTimeout(true);
        setIsFallbackActive(true);
      }, timeoutDuration);
      
      setTimeoutId(Number(newTimeoutId));
    } else {
      // Clear timeout when not typing
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setShowTimeout(false);
      setIsFallbackActive(false);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isTyping, timeoutDuration]);

  const resetTimeout = () => {
    setShowTimeout(false);
    setIsFallbackActive(false);
  };

  const handleQuickReply = (action: string) => {
    resetTimeout();
    return action;
  };

  return { 
    showTimeout, 
    isFallbackActive,
    resetTimeout,
    handleQuickReply
  };
};
