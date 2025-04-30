
import { useState, useCallback } from 'react';

// Define intent categories
export type UserIntent = 'marketing' | 'treatment' | 'training' | 'operations' | undefined;

/**
 * Hook for detecting user intent from messages
 */
export function useIntentDetection() {
  const [userIntent, setUserIntent] = useState<UserIntent>(() => {
    // Try to restore user intent from session storage
    return (sessionStorage.getItem('nextgen_user_intent') as UserIntent) || undefined;
  });

  // Define a function to detect and save user intent from message
  const detectAndSaveUserIntent = useCallback((message: string): UserIntent => {
    // Enhanced intent detection logic with more specific keywords
    let detectedIntent: UserIntent = undefined;
    
    const lowerMessage = message.toLowerCase();
    
    // Marketing/Growth intent
    if (lowerMessage.includes("patient acquisition") || 
        lowerMessage.includes("growth") ||
        lowerMessage.includes("marketing") ||
        lowerMessage.includes("leads") ||
        lowerMessage.includes("advertising") ||
        lowerMessage.includes("campaign") ||
        lowerMessage.includes("social media") ||
        lowerMessage.includes("facebook") ||
        lowerMessage.includes("google ads")) {
      detectedIntent = 'marketing';
    } 
    // Treatment intent
    else if (lowerMessage.includes("treatment") || 
             lowerMessage.includes("case acceptance") ||
             lowerMessage.includes("conversion") ||
             lowerMessage.includes("follow-up") ||
             lowerMessage.includes("patient education") ||
             lowerMessage.includes("consultation") ||
             lowerMessage.includes("close cases")) {
      detectedIntent = 'treatment';
    } 
    // Training/system intent
    else if (lowerMessage.includes("team") || 
             lowerMessage.includes("staff") ||
             lowerMessage.includes("training") ||
             lowerMessage.includes("sop") ||
             lowerMessage.includes("onboarding") ||
             lowerMessage.includes("systems") ||
             lowerMessage.includes("workflow") ||
             lowerMessage.includes("protocol")) {
      detectedIntent = 'training';
    }
    // Scheduling/operations intent
    else if (lowerMessage.includes("schedule") || 
             lowerMessage.includes("appointment") ||
             lowerMessage.includes("front desk") ||
             lowerMessage.includes("no-show") ||
             lowerMessage.includes("cancellation") ||
             lowerMessage.includes("reschedule") ||
             lowerMessage.includes("booking")) {
      detectedIntent = 'operations';
    }
    
    if (detectedIntent) {
      setUserIntent(detectedIntent);
      sessionStorage.setItem('nextgen_user_intent', detectedIntent);
    }
    
    return detectedIntent;
  }, []);

  return {
    userIntent,
    setUserIntent,
    detectAndSaveUserIntent,
    clearUserIntent: useCallback(() => {
      setUserIntent(undefined);
      sessionStorage.removeItem('nextgen_user_intent');
    }, [])
  };
}
