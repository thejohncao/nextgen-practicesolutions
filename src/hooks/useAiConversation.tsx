
import { useEffect } from 'react';
import { useAgentContent } from './useAgentContent';
import { useMessageHandling } from './useMessageHandling';
import { useConversationErrors } from './useConversationErrors';
import { AiMessage } from '@/types/conversation';

export { AGENT_WELCOME_MESSAGES, AGENT_ROLES, AGENT_SUGGESTIONS } from './useAgentContent';

export const useAiConversation = () => {
  // Compose smaller hooks
  const { 
    currentAgent, 
    setCurrentAgent, 
    getAgentSuggestions, 
    getAgentRole 
  } = useAgentContent();
  
  const { 
    messages, 
    isTyping, 
    showExpandedMessage, 
    sendMessage, 
    processQueue, 
    toggleMessageExpansion, 
    selectAgent 
  } = useMessageHandling(currentAgent, setCurrentAgent);
  
  const { 
    isTimedOut, 
    handleRetry, 
    handleStartOver 
  } = useConversationErrors(isTyping, currentAgent, (updater: (prevMessages: AiMessage[]) => AiMessage[]) => {
    setMessages(updater);
  });

  // Process the message queue when it changes or typing status changes
  useEffect(() => {
    processQueue();
  }, [processQueue]);
  
  return {
    // From agent content hook
    currentAgent,
    getAgentSuggestions,
    getAgentRole,
    
    // From message handling hook
    messages,
    sendMessage,
    isTyping,
    showExpandedMessage,
    toggleMessageExpansion,
    selectAgent,
    
    // From conversation errors hook
    isTimedOut,
    handleRetry,
    handleStartOver
  };
};

export default useAiConversation;
