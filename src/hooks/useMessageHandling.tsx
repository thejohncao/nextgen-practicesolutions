
import { useState, useCallback } from 'react';
import { AiMessage } from '@/types/conversation';
import { toast } from 'sonner';
import { AGENT_WELCOME_MESSAGES } from './useAgentContent';

// Mock response generator for development
const getMockResponse = (message: string, agent: string = 'miles'): string => {
  const agentResponses: Record<string, string[]> = {
    miles: [
      "I can help streamline your front desk operations. What specific area are you looking to improve?",
      "Automating your scheduling can save your team 15-20 hours per week. Would you like to see how?",
      "I notice many practices struggle with patient cancellations. I can reduce those by 35% using our automated follow-up system."
    ],
    giselle: [
      "Let's boost your practice growth! I can help with marketing campaigns that actually convert.",
      "Did you know personalized patient outreach can increase your case acceptance by 27%?",
      "I specialize in helping practices acquire new patients through digital channels. Where are you currently finding most of your patients?"
    ],
    devon: [
      "I can help your team convert more treatment plans. What's your current acceptance rate?",
      "Large case financing is often a barrier. I can implement automated payment plan systems.",
      "Many practices leave money on the table with collections. I can automate your AR follow-up."
    ],
    alma: [
      "Training new team members is critical. I can create custom onboarding protocols for your practice.",
      "I specialize in staff development and retention strategies. What's your current turnover rate?",
      "Let me help implement performance metrics that motivate your team while delivering better patient care."
    ]
  };

  const responses = agentResponses[agent.toLowerCase()] || agentResponses.miles;
  return responses[Math.floor(Math.random() * responses.length)];
};

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
    
    // Add to processing queue
    setMessageQueue(prev => [...prev, {text, agent: currentAgent}]);
  }, [currentAgent]);

  // Handle mock response generation for development
  const handleMockResponse = useCallback((userMessage: string, agent: string) => {
    const typingDelay = 1000 + Math.random() * 2000; 
    
    setTimeout(() => {
      const responseText = getMockResponse(userMessage, agent);
      
      const newMessage: AiMessage = {
        text: responseText,
        isUser: false,
        timestamp: new Date().toISOString(),
        agent: agent
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
      
    }, typingDelay);
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
