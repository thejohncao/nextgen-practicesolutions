
import { useState, useCallback, useEffect } from 'react';
import { AiMessage } from '@/types/conversation';
import { toast } from 'sonner';
import { useTimeout } from './useTimeout';

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

// Generate suggestions based on current agent
const getAgentSuggestionsByName = (agent: string): string[] => {
  const suggestions: Record<string, string[]> = {
    miles: [
      "How can you reduce no-shows?",
      "What's the best way to handle schedule gaps?",
      "Can you automate appointment reminders?"
    ],
    giselle: [
      "How do I get more Google reviews?",
      "What marketing channels work best for dental?",
      "How can I reactivate dormant patients?"
    ],
    devon: [
      "How do I improve case acceptance?",
      "What financing options should we offer?",
      "How can we increase our average treatment value?"
    ],
    alma: [
      "How do I train a new treatment coordinator?",
      "What are the best metrics for staff performance?",
      "How do we create effective training materials?"
    ]
  };

  return suggestions[agent.toLowerCase()] || suggestions.miles;
};

export const useAiConversation = () => {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState('miles');
  const [showExpandedMessage, setShowExpandedMessage] = useState<number | null>(null);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [messageQueue, setMessageQueue] = useState<{text: string, agent: string}[]>([]);
  
  // Process the message queue
  useEffect(() => {
    if (messageQueue.length > 0 && !isTyping) {
      const nextMessage = messageQueue[0];
      setMessageQueue(prev => prev.slice(1));
      
      // Process this message
      handleMockResponse(nextMessage.text, nextMessage.agent);
    }
  }, [messageQueue, isTyping]);

  // Timeout effect to simulate connection issues occasionally
  useTimeout(() => {
    // Simulate timeout after a random long response time
    if (isTyping && Math.random() < 0.05) { // 5% chance of timeout
      setIsTyping(false);
      setIsTimedOut(true);
    }
  }, isTyping ? Math.random() * 10000 + 5000 : null); // Random timeout between 5-15 seconds

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

  // Retry after timeout
  const handleRetry = useCallback(() => {
    setIsTimedOut(false);
    setIsTyping(true);
    
    // Generate a recovery message
    setTimeout(() => {
      const recoveryMessage: AiMessage = {
        text: "I apologize for the connection issue. Let's continue our conversation. What else would you like to know?",
        isUser: false,
        timestamp: new Date().toISOString(),
        agent: currentAgent
      };
      
      setMessages(prev => [...prev, recoveryMessage]);
      setIsTyping(false);
    }, 1500);
  }, [currentAgent]);

  // Start over after timeout
  const handleStartOver = useCallback(() => {
    setIsTimedOut(false);
    setMessages([]);
    
    // Add a welcome message from the current agent
    setIsTyping(true);
    setTimeout(() => {
      const welcomeMessage: AiMessage = {
        text: `Hi, I'm ${currentAgent}. How can I help your practice today?`,
        isUser: false,
        timestamp: new Date().toISOString(),
        agent: currentAgent
      };
      
      setMessages([welcomeMessage]);
      setIsTyping(false);
    }, 1000);
  }, [currentAgent]);

  // Toggle message expansion
  const toggleMessageExpansion = useCallback((index: number) => {
    setShowExpandedMessage(prev => prev === index ? null : index);
  }, []);

  // Get agent-specific suggestions
  const getAgentSuggestions = useCallback(() => {
    return getAgentSuggestionsByName(currentAgent);
  }, [currentAgent]);

  // Select specific agent
  const selectAgent = useCallback((agent: string) => {
    const normalizedAgent = agent.toLowerCase();
    setCurrentAgent(normalizedAgent);
    setMessages([]);
    
    // Add welcome message from this agent
    setIsTyping(true);
    setTimeout(() => {
      const agentName = normalizedAgent.charAt(0).toUpperCase() + normalizedAgent.slice(1);
      
      const welcomeMessage: AiMessage = {
        text: `Hi, I'm ${agentName}. How can I help your practice today?`,
        isUser: false,
        timestamp: new Date().toISOString(),
        agent: normalizedAgent
      };
      
      setMessages([welcomeMessage]);
      setIsTyping(false);
      
      toast.success(`Now chatting with ${agentName}`, {
        description: `Your AI ${getAgentRole(normalizedAgent)} specialist`
      });
    }, 1000);
  }, []);

  // Get agent role based on name
  const getAgentRole = (agent: string): string => {
    switch(agent.toLowerCase()) {
      case 'miles': return 'Operations';
      case 'giselle': return 'Growth';
      case 'devon': return 'Treatment';
      case 'alma': return 'Training';
      default: return 'Assistant';
    }
  };

  return {
    messages,
    sendMessage,
    isTyping,
    currentAgent,
    isTimedOut,
    handleRetry,
    handleStartOver,
    showExpandedMessage,
    toggleMessageExpansion,
    getAgentSuggestions,
    selectAgent
  };
};

export default useAiConversation;
