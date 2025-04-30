import { useState, useCallback, useEffect } from 'react';
import { AiMessage } from '@/types/conversation';
import { toast } from 'sonner';
import { useTimeout } from './useTimeout';

// Agent-specific welcome messages according to requirements
export const AGENT_WELCOME_MESSAGES = {
  miles: "Hi, I'm Miles — I keep your schedule full and your team focused. What do you need help with today?",
  giselle: "Hey there! I'm Giselle — your go-to for leads, follow-ups, and growth strategy. Want to boost your pipeline?",
  devon: "I'm Devon — your AI closer. If you're trying to get more patients to say yes, you're in the right place.",
  alma: "Welcome! I'm Alma — here to train your team with scripts, SOPs, and support so you can scale confidently."
};

// Agent roles mapping
export const AGENT_ROLES = {
  miles: "Practice Manager",
  giselle: "Growth Strategist",
  devon: "Treatment Closer",
  alma: "Academy Director"
};

// Agent-specific prompt suggestions for immediate display
export const AGENT_SUGGESTIONS = {
  miles: [
    "What's on today's schedule?",
    "Reschedule a patient",
    "Send appointment reminders",
    "Handle incoming calls for me"
  ],
  giselle: [
    "Help me get more veneer patients",
    "Show my active campaigns",
    "Follow up with leads",
    "How can I reduce no-shows?"
  ],
  devon: [
    "Recover unscheduled treatment",
    "Send a quote with financing",
    "Follow up with Ashley from yesterday",
    "What scripts work best for closing implants?"
  ],
  alma: [
    "Train my new front desk",
    "Show me SOPs for phone calls",
    "Role-play a treatment presentation",
    "How do I train my treatment coordinator?"
  ]
};

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
  return AGENT_SUGGESTIONS[agent.toLowerCase() as keyof typeof AGENT_SUGGESTIONS] || AGENT_SUGGESTIONS.miles;
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
    
    // Add a welcome message from the current agent using the agent-specific welcome message
    setIsTyping(true);
    setTimeout(() => {
      const welcomeMessage: AiMessage = {
        text: AGENT_WELCOME_MESSAGES[currentAgent.toLowerCase()] || AGENT_WELCOME_MESSAGES.miles,
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
        description: `Your AI ${getAgentRole(normalizedAgent)} specialist`
      });
    }, 1000);
  }, []);

  // Get agent role based on name
  const getAgentRole = (agent: string): string => {
    return AGENT_ROLES[agent.toLowerCase() as keyof typeof AGENT_ROLES] || "Assistant";
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
