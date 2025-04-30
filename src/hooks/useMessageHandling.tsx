
import { useState, useCallback } from 'react';
import { AiMessage } from '@/types/conversation';
import { toast } from 'sonner';
import { AGENT_WELCOME_MESSAGES } from './useAgentContent';

// Miles-specific fallback responses
const MILES_FALLBACK_RESPONSES = [
  "Let me pull that up for you... one moment.",
  "I'm looking into that for you. Just a moment please.",
  "Let me check our practice records on that. One moment.",
  "Retrieving that information for you now..."
];

export const useMessageHandling = (currentAgent: string, setCurrentAgent: (agent: string) => void) => {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showExpandedMessage, setShowExpandedMessage] = useState<number | null>(null);
  const [messageQueue, setMessageQueue] = useState<{text: string, agent: string}[]>([]);
  const [isFirstUserMessage, setIsFirstUserMessage] = useState(true);
  const [lastResponseText, setLastResponseText] = useState<string>("");
  const [fallbackResponseIndex, setFallbackResponseIndex] = useState(0);

  // Process the message queue
  const processQueue = useCallback(() => {
    if (messageQueue.length > 0 && !isTyping) {
      const nextMessage = messageQueue[0];
      setMessageQueue(prev => prev.slice(1));
      
      // Process this message
      handleMockResponse(nextMessage.text, nextMessage.agent);
    }
  }, [messageQueue, isTyping]);

  // Get next fallback response and rotate through the available responses
  const getNextFallbackResponse = useCallback(() => {
    const response = MILES_FALLBACK_RESPONSES[fallbackResponseIndex];
    setFallbackResponseIndex((prev) => (prev + 1) % MILES_FALLBACK_RESPONSES.length);
    return response;
  }, [fallbackResponseIndex]);

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
    
    // For the MVP, we'll use a fixed response with appropriate delay
    setTimeout(() => {
      // For first message, use the clear schedule response
      // For subsequent messages, use the fallback response with Miles tone
      const responseText = isFirstUserMessage 
        ? "Looks like your schedule is clear this afternoon. Want to add a recall block?"
        : getNextFallbackResponse();
      
      // Prevent duplicate consecutive messages
      if (responseText === lastResponseText) {
        const altResponse = "I understand. Let me think about how best to help with your practice management needs.";
        setLastResponseText(altResponse);
        
        const newMessage: AiMessage = {
          text: altResponse,
          isUser: false,
          timestamp: new Date().toISOString(),
          agent: currentAgent
        };
        
        setMessages(prev => [...prev, newMessage]);
      } else {
        setLastResponseText(responseText);
        
        const newMessage: AiMessage = {
          text: responseText,
          isUser: false,
          timestamp: new Date().toISOString(),
          agent: currentAgent
        };
        
        setMessages(prev => [...prev, newMessage]);
      }
      
      // Set first message flag to false after first message exchange
      if (isFirstUserMessage) {
        setIsFirstUserMessage(false);
      }
      
      setIsTyping(false);
    }, isFirstUserMessage ? 1500 : 2000); // Longer delay for follow-up messages to improve realism
  }, [currentAgent, isFirstUserMessage, lastResponseText, getNextFallbackResponse]);

  // This is kept for compatibility but updated for MVP requirements
  const handleMockResponse = useCallback((userMessage: string, agent: string) => {
    setIsTyping(true);
    
    // MVP fixed response with appropriate delay
    setTimeout(() => {
      // For first message, use the clear schedule response
      // For subsequent messages, use the fallback response with Miles tone
      const responseText = isFirstUserMessage 
        ? "Looks like your schedule is clear this afternoon. Want to add a recall block?" 
        : getNextFallbackResponse();
      
      const newMessage: AiMessage = {
        text: responseText,
        isUser: false,
        timestamp: new Date().toISOString(),
        agent: agent
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // Set first message flag to false after first message exchange
      if (isFirstUserMessage) {
        setIsFirstUserMessage(false);
      }
      
      setIsTyping(false);
    }, isFirstUserMessage ? 1500 : 2000); // Different delay based on message position
  }, [isFirstUserMessage, getNextFallbackResponse]);

  // Toggle message expansion
  const toggleMessageExpansion = useCallback((index: number) => {
    setShowExpandedMessage(prev => prev === index ? null : index);
  }, []);

  // Select specific agent
  const selectAgent = useCallback((agent: string) => {
    const normalizedAgent = agent.toLowerCase();
    setCurrentAgent(normalizedAgent);
    setMessages([]);
    setIsFirstUserMessage(true); // Reset first message flag when changing agents
    
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
