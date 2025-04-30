
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

  // Handle retry with exponential backoff
  const handleRetryWithBackoff = useCallback(async (
    fn: () => Promise<any>,
    errorMessage: string = "Failed to get response from AI"
  ) => {
    try {
      return await fn();
    } catch (err) {
      console.error("Error in operation:", err);
      
      if (retryAttemptsRef.current < MAX_RETRIES) {
        console.log(`Retry attempt ${retryAttemptsRef.current + 1}/${MAX_RETRIES}`);
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
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Reset retry counter
  const resetRetries = useCallback(() => {
    retryAttemptsRef.current = 0;
    setError(null);
  }, []);

  return {
    error,
    setError,
    retryAttemptsRef,
    handleRetryWithBackoff,
    resetRetries
  };
}
