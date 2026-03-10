
import { useState, useCallback, useRef } from 'react';

/**
 * Hook for managing AI response timeout
 */
export function useResponseTimeout() {
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [timeoutLevel, setTimeoutLevel] = useState<'none' | 'warning' | 'error'>('none');
  
  // Timeout reference for response waiting
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle timeout with multiple levels
  const startResponseTimeout = useCallback(() => {
    // Clear any existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    
    setTimeoutLevel('none');
    setIsTimedOut(false);
    
    // Set warning timeout after 5 seconds
    warningTimeoutRef.current = setTimeout(() => {
      setTimeoutLevel('warning');
      console.log("Warning timeout triggered - showing indicator");
    }, 5000);
    
    // Set error timeout after 12 seconds
    timeoutRef.current = setTimeout(() => {
      setTimeoutLevel('error');
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
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
    setTimeoutLevel('none');
  }, []);

  return {
    isTimedOut,
    setIsTimedOut,
    timeoutLevel,
    setTimeoutLevel,
    startResponseTimeout,
    clearResponseTimeout
  };
}
