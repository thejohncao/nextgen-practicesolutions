
import { useState, useCallback, useRef } from 'react';

/**
 * Hook for managing AI response timeout
 */
export function useResponseTimeout() {
  const [isTimedOut, setIsTimedOut] = useState(false);
  
  // Timeout reference for response waiting
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle timeout 
  const startResponseTimeout = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout for 12 seconds
    timeoutRef.current = setTimeout(() => {
      setIsTimedOut(true);
      console.log("Response timeout triggered - showing fallback message");
    }, 12000);
  }, []);
  
  // Clear timeout when response is received
  const clearResponseTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    isTimedOut,
    setIsTimedOut,
    startResponseTimeout,
    clearResponseTimeout
  };
}
