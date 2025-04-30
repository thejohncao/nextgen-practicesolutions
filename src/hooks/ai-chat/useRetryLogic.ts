
import { useState, useRef, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

// Number of retries before giving up
const MAX_RETRIES = 3;

/**
 * Hook for managing retry logic for API calls
 */
export function useRetryLogic() {
  const [error, setError] = useState<string | null>(null);
  const retryAttemptsRef = useRef(0);
  const autoRetryRef = useRef(false);

  // Handle retry with exponential backoff
  const handleRetryWithBackoff = useCallback(async (
    fn: () => Promise<any>,
    errorMessage: string = "Failed to get response from AI"
  ) => {
    try {
      // Mark that we're in auto-retry mode
      autoRetryRef.current = true;
      return await fn();
    } catch (err) {
      console.error("Error in operation:", err);
      
      if (retryAttemptsRef.current < MAX_RETRIES) {
        console.log(`Retry attempt ${retryAttemptsRef.current + 1}/${MAX_RETRIES}`);
        
        // If this was triggered by an empty response and it's the first retry,
        // don't show a toast notification (silent retry)
        if (retryAttemptsRef.current === 0 && err.message?.includes("Empty response")) {
          console.log("Silent retry for empty response");
        } else {
          // Show retry notification for subsequent attempts
          toast({
            title: "Retrying...",
            description: "Attempting to reconnect to AI service",
          });
        }
        
        // Exponential backoff
        const backoff = Math.min(1000 * Math.pow(2, retryAttemptsRef.current), 10000);
        
        retryAttemptsRef.current += 1;
        
        // Wait for backoff time and retry
        return new Promise((resolve) => {
          setTimeout(async () => {
            try {
              const result = await handleRetryWithBackoff(fn, errorMessage);
              resolve(result);
            } catch (retryErr) {
              // This will be caught by the outer catch
              throw retryErr;
            }
          }, backoff);
        });
      }
      
      // All retries failed
      autoRetryRef.current = false;
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Reset retry counter
  const resetRetries = useCallback(() => {
    retryAttemptsRef.current = 0;
    autoRetryRef.current = false;
    setError(null);
  }, []);
  
  // Check if we're in auto-retry mode
  const isAutoRetrying = useCallback(() => {
    return autoRetryRef.current;
  }, []);

  return {
    error,
    setError,
    retryAttemptsRef,
    handleRetryWithBackoff,
    resetRetries,
    isAutoRetrying
  };
}
