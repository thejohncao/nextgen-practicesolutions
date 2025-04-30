
import { useState, useCallback, useRef, useEffect } from 'react';
import { AiMessage } from '@/types/conversation';
import { toast } from 'sonner';
import { AGENT_WELCOME_MESSAGES } from './useAgentContent';
import { fetchAgentReply } from '@/utils/aiService';

// Agent-specific fallback responses
const MILES_FALLBACK_RESPONSES = [
  "Let me pull that up for you... one moment.",
  "I'm looking into that for you. Just a moment please.",
  "Let me check our practice records on that. One moment.",
  "Retrieving that information for you now..."
];

const DEVON_FALLBACK_RESPONSES = [
  "Let me think through the best way to handle that for you.",
  "Still working on it — I'll be back with a game plan in just a moment.",
  "I'm strategizing your next step now. Stay with me…",
  "One sec — pulling up the best playbook for that scenario."
];

const GISELLE_FALLBACK_RESPONSES = [
  "I'm reviewing your recent campaigns to optimize performance.",
  "Let me pull some lead data to target next steps.",
  "Thinking through your growth channels — give me a second.",
  "Still strategizing — we'll find the right lever to pull."
];

const ALMA_FALLBACK_RESPONSES = [
  "Loading the right SOP for that — just a moment.",
  "Let me build a quick micro-training path for you.",
  "Reviewing the most relevant materials for that request.",
  "Still working — I'll have a recommendation shortly."
];

// Agent-specific first responses
const AGENT_FIRST_RESPONSES = {
  miles: "Looks like your schedule is clear this afternoon. Want to add a recall block?",
  devon: "Absolutely. I'm reviewing your treatment opportunities now — one sec.",
  giselle: "Got it. Let's work on growing your patient base — one opportunity at a time.",
  alma: "Welcome to your training HQ! Let's get your team equipped to succeed."
};

export const useMessageHandling = (currentAgent: string, setCurrentAgent: (agent: string) => void) => {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showExpandedMessage, setShowExpandedMessage] = useState<number | null>(null);
  const [messageQueue, setMessageQueue] = useState<{text: string, agent: string}[]>([]);
  const [isFirstUserMessage, setIsFirstUserMessage] = useState(true);
  const [lastResponseText, setLastResponseText] = useState<string>("");
  const [fallbackResponseIndex, setFallbackResponseIndex] = useState(0);
  
  // New settings for GPT integration
  const [useGptEnabled, setUseGptEnabled] = useState(true); // Enable by default for testing
  const isPendingGptResponse = useRef(false);
  const [isApiFailure, setIsApiFailure] = useState(false);

  // Store the active agent for sending messages to prevent race conditions
  const activeAgentRef = useRef(currentAgent);

  // Update the ref when currentAgent changes
  useEffect(() => {
    activeAgentRef.current = currentAgent;
  }, [currentAgent]);

  // Keyboard shortcut to toggle GPT mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift + G to toggle GPT mode (for dev/testing)
      if (e.shiftKey && e.key === 'G') {
        setUseGptEnabled(prev => {
          const newState = !prev;
          toast.info(
            newState ? "GPT responses enabled" : "GPT responses disabled", 
            { description: newState ? "Using OpenAI API" : "Using fallback responses" }
          );
          return newState;
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Process the message queue
  const processQueue = useCallback(() => {
    if (messageQueue.length > 0 && !isTyping && !isPendingGptResponse.current) {
      const nextMessage = messageQueue[0];
      setMessageQueue(prev => prev.slice(1));
      
      // Process this message
      handleMockResponse(nextMessage.text, nextMessage.agent);
    }
  }, [messageQueue, isTyping]);

  // Get next fallback response based on current agent
  const getNextFallbackResponse = useCallback(() => {
    // Use the stored agent ref to prevent race conditions
    const agent = activeAgentRef.current.toLowerCase();
    let responses;
    
    switch(agent) {
      case 'devon':
        responses = DEVON_FALLBACK_RESPONSES;
        break;
      case 'giselle':
        responses = GISELLE_FALLBACK_RESPONSES;
        break;
      case 'alma':
        responses = ALMA_FALLBACK_RESPONSES;
        break;
      case 'miles':
      default:
        responses = MILES_FALLBACK_RESPONSES;
    }
    
    const response = responses[fallbackResponseIndex];
    setFallbackResponseIndex((prev) => (prev + 1) % responses.length);
    return response;
  }, [fallbackResponseIndex]);

  // Get first response for new conversations
  const getFirstResponse = useCallback(() => {
    // Use the stored agent ref to prevent race conditions
    const agent = activeAgentRef.current.toLowerCase();
    return AGENT_FIRST_RESPONSES[agent as keyof typeof AGENT_FIRST_RESPONSES] 
      || AGENT_FIRST_RESPONSES.miles;
  }, []);

  // Send a message and get a response
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    // Lock in the current agent at the time of sending to avoid race conditions
    const selectedAgent = activeAgentRef.current;
    
    // Add user message
    const userMessage: AiMessage = {
      text,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setIsApiFailure(false);
    
    // Choose between GPT and fallback responses
    if (useGptEnabled) {
      try {
        isPendingGptResponse.current = true;
        
        // Use different timing for first vs. subsequent messages
        const typingDelay = isFirstUserMessage ? 1500 : 2000;
        
        // Wait a short time to show typing indicator
        await new Promise(resolve => setTimeout(resolve, typingDelay));
        
        // Try to get response from GPT
        const gptResponse = await fetchAgentReply(text, selectedAgent, useGptEnabled);
        
        // If GPT response failed or returned empty, use fallback
        if (!gptResponse) {
          throw new Error("Failed to get GPT response");
        }
        
        // Add GPT response to messages
        const newMessage: AiMessage = {
          text: gptResponse,
          isUser: false,
          timestamp: new Date().toISOString(),
          agent: selectedAgent
        };
        
        setMessages(prev => [...prev, newMessage]);
        setLastResponseText(gptResponse);
        console.log(`GPT response for ${selectedAgent}: ${gptResponse.substring(0, 50)}...`);
      } 
      catch (error) {
        console.error("Error getting GPT response:", error);
        setIsApiFailure(true);
        
        // Use fallback for first message or regular fallback for subsequent messages
        const fallbackText = isFirstUserMessage 
          ? getFirstResponse()
          : getNextFallbackResponse();
          
        // Prevent duplicate consecutive messages
        if (fallbackText === lastResponseText) {
          const altResponse = "I understand. Let me think about how best to help with your practice management needs.";
          setLastResponseText(altResponse);
          
          const newMessage: AiMessage = {
            text: altResponse,
            isUser: false,
            timestamp: new Date().toISOString(),
            agent: selectedAgent
          };
          
          setMessages(prev => [...prev, newMessage]);
        } else {
          setLastResponseText(fallbackText);
          
          const newMessage: AiMessage = {
            text: fallbackText,
            isUser: false,
            timestamp: new Date().toISOString(),
            agent: selectedAgent
          };
          
          setMessages(prev => [...prev, newMessage]);
        }
      }
      finally {
        isPendingGptResponse.current = false;
        setIsTyping(false);
        
        // Set first message flag to false after first message exchange
        if (isFirstUserMessage) {
          setIsFirstUserMessage(false);
        }
      }
    } 
    else {
      // For the MVP fallback mode, use a fixed response with appropriate delay
      setTimeout(() => {
        // For first message, use the agent-specific first response
        // For subsequent messages, use the fallback response with agent-specific tone
        const responseText = isFirstUserMessage 
          ? getFirstResponse()
          : getNextFallbackResponse();
        
        // Prevent duplicate consecutive messages
        if (responseText === lastResponseText) {
          const altResponse = "I understand. Let me think about how best to help with your practice management needs.";
          setLastResponseText(altResponse);
          
          const newMessage: AiMessage = {
            text: altResponse,
            isUser: false,
            timestamp: new Date().toISOString(),
            agent: selectedAgent
          };
          
          setMessages(prev => [...prev, newMessage]);
        } else {
          setLastResponseText(responseText);
          
          const newMessage: AiMessage = {
            text: responseText,
            isUser: false,
            timestamp: new Date().toISOString(),
            agent: selectedAgent
          };
          
          setMessages(prev => [...prev, newMessage]);
        }
        
        // Set first message flag to false after first message exchange
        if (isFirstUserMessage) {
          setIsFirstUserMessage(false);
        }
        
        setIsTyping(false);
      }, isFirstUserMessage ? 1500 : 2000);
    }
  }, [
    isFirstUserMessage, 
    lastResponseText, 
    getNextFallbackResponse, 
    getFirstResponse, 
    useGptEnabled
  ]);

  // This is kept for compatibility but updated to support GPT
  const handleMockResponse = useCallback(async (userMessage: string, agent: string) => {
    setIsTyping(true);
    
    // Lock in the agent at the time of the mock response
    const selectedAgent = agent;
    
    // Choose between GPT and fallback responses
    if (useGptEnabled) {
      try {
        isPendingGptResponse.current = true;
        
        // Use different timing for first vs. subsequent messages
        const typingDelay = isFirstUserMessage ? 1500 : 2000;
        
        // Wait a short time to show typing indicator
        await new Promise(resolve => setTimeout(resolve, typingDelay));
        
        // Try to get response from GPT
        const gptResponse = await fetchAgentReply(userMessage, selectedAgent, useGptEnabled);
        
        // If GPT response failed or returned empty, use fallback
        if (!gptResponse) {
          throw new Error("Failed to get GPT response");
        }
        
        // Add GPT response to messages
        const newMessage: AiMessage = {
          text: gptResponse,
          isUser: false,
          timestamp: new Date().toISOString(),
          agent: selectedAgent
        };
        
        setMessages(prev => [...prev, newMessage]);
        setLastResponseText(gptResponse);
      } 
      catch (error) {
        console.error("Error getting GPT response:", error);
        setIsApiFailure(true);
        
        // Use fallback for first message or regular fallback for subsequent messages
        const fallbackText = isFirstUserMessage 
          ? AGENT_FIRST_RESPONSES[selectedAgent.toLowerCase() as keyof typeof AGENT_FIRST_RESPONSES] || AGENT_FIRST_RESPONSES.miles
          : getNextFallbackResponse();
          
        const newMessage: AiMessage = {
          text: fallbackText,
          isUser: false,
          timestamp: new Date().toISOString(),
          agent: selectedAgent
        };
        
        setMessages(prev => [...prev, newMessage]);
      }
      finally {
        isPendingGptResponse.current = false;
        setIsTyping(false);
        
        // Set first message flag to false after first message exchange
        if (isFirstUserMessage) {
          setIsFirstUserMessage(false);
        }
      }
    }
    else {
      // MVP fixed response with appropriate delay
      setTimeout(() => {
        // For first message, use agent-specific first response
        // For subsequent messages, use the fallback response with agent tone
        const responseText = isFirstUserMessage 
          ? AGENT_FIRST_RESPONSES[selectedAgent.toLowerCase() as keyof typeof AGENT_FIRST_RESPONSES] || AGENT_FIRST_RESPONSES.miles
          : getNextFallbackResponse();
        
        const newMessage: AiMessage = {
          text: responseText,
          isUser: false,
          timestamp: new Date().toISOString(),
          agent: selectedAgent
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        // Set first message flag to false after first message exchange
        if (isFirstUserMessage) {
          setIsFirstUserMessage(false);
        }
        
        setIsTyping(false);
      }, isFirstUserMessage ? 1500 : 2000);
    }
  }, [isFirstUserMessage, getNextFallbackResponse, useGptEnabled]);

  // Toggle message expansion
  const toggleMessageExpansion = useCallback((index: number) => {
    setShowExpandedMessage(prev => prev === index ? null : index);
  }, []);

  // Select specific agent
  const selectAgent = useCallback((agent: string) => {
    const normalizedAgent = agent.toLowerCase();
    
    // Update the active agent ref immediately to prevent race conditions
    activeAgentRef.current = normalizedAgent;
    
    // Then update the state
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

  // Handle API failure recovery
  const handleRetryAfterFailure = useCallback(() => {
    setIsApiFailure(false);
    
    // Get the last user message
    const lastUserMessage = messages.filter(m => m.isUser).pop();
    
    if (lastUserMessage) {
      sendMessage(lastUserMessage.text);
    }
  }, [messages, sendMessage]);

  return {
    messages,
    isTyping,
    showExpandedMessage,
    sendMessage,
    processQueue,
    toggleMessageExpansion,
    selectAgent,
    setMessages,
    useGptEnabled,
    setUseGptEnabled,
    isApiFailure,
    handleRetryAfterFailure
  };
};

export default useMessageHandling;
