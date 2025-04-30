
import { useState, useCallback } from 'react';
import { AiMessage } from '@/types/conversation';
import { toast } from 'sonner';
import { AGENT_WELCOME_MESSAGES } from './useAgentContent';

export const useMessageHandling = (currentAgent: string, setCurrentAgent: (agent: string) => void) => {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showExpandedMessage, setShowExpandedMessage] = useState<number | null>(null);
  const [messageQueue, setMessageQueue] = useState<{text: string, agent: string}[]>([]);

  // Process the message queue
  const processQueue = useCallback(() => {
    if (messageQueue.length > 0 && !isTyping) {
      const nextMessage = messageQueue[0];
      setMessageQueue(prev => prev.slice(1));
      
      // Process this message
      handleMockResponse(nextMessage.text, nextMessage.agent);
    }
  }, [messageQueue, isTyping]);

  // Send a message and get a response
  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: AiMessage = {
      text,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // For the MVP, we'll use a fixed response after 1.5 seconds
    setTimeout(() => {
      const responseText = "Looks like your schedule is clear this afternoon. Want to add a recall block?";
      
      const newMessage: AiMessage = {
        text: responseText,
        isUser: false,
        timestamp: new Date().toISOString(),
        agent: currentAgent
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500); // Exactly 1.5 seconds as specified
  }, [currentAgent]);

  // This is kept for compatibility but not used in the MVP
  const handleMockResponse = useCallback((userMessage: string, agent: string) => {
    setIsTyping(true);
    
    // MVP fixed response
    setTimeout(() => {
      const responseText = "Looks like your schedule is clear this afternoon. Want to add a recall block?";
      
      const newMessage: AiMessage = {
        text: responseText,
        isUser: false,
        timestamp: new Date().toISOString(),
        agent: agent
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  }, []);

  // Toggle message expansion
  const toggleMessageExpansion = useCallback((index: number) => {
    setShowExpandedMessage(prev => prev === index ? null : index);
  }, []);

  // Select specific agent
  const selectAgent = useCallback((agent: string) => {
    const normalizedAgent = agent.toLowerCase();
    setCurrentAgent(normalizedAgent);
    setMessages([]);
    
    // Add welcome message from this agent using the agent-specific message
    setIsTyping(true);
    setTimeout(() => {
      // Use agent-specific welcome message
      const welcomeMessage: AiMessage = {
        text: AGENT_WELCOME_MESSAGES[normalizedAgent] || AGENT_WELCOME_MESSAGES.miles,
        isUser: false,
        timestamp: new Date().toISOString(),
        agent: normalizedAgent
      };
      
      setMessages([welcomeMessage]);
      setIsTyping(false);
      
      toast.success(`Now chatting with ${normalizedAgent.charAt(0).toUpperCase() + normalizedAgent.slice(1)}`, {
        description: `Your AI ${normalizedAgent} specialist`
      });
    }, 1000);
  }, []);

  return {
    messages,
    isTyping,
    showExpandedMessage,
    sendMessage,
    processQueue,
    toggleMessageExpansion,
    selectAgent,
    setMessages
  };
};
