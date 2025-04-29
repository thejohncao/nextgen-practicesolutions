
import { useState, useCallback, useEffect, useRef } from 'react';
import { callOpenAI, SYSTEM_PROMPT, detectAgentFromMessage, Message } from '@/lib/openai';
import { toast } from '@/components/ui/use-toast';

type MessageRole = 'user' | 'assistant' | 'system';

export interface AiMessage {
  text: string;
  isUser: boolean;
  agent: string;
  timestamp: Date;
}

export interface ConversationState {
  messages: AiMessage[];
  currentAgent: string;
  userIntent?: string;
}

// Keys for local storage
const CURRENT_AGENT_KEY = 'nextgen_current_agent';
const USER_INTENT_KEY = 'nextgen_user_intent';

export function useAiConversation() {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string>(() => {
    // Try to restore the current agent from session storage
    const savedAgent = sessionStorage.getItem(CURRENT_AGENT_KEY);
    return savedAgent || "miles";
  });
  const [userIntent, setUserIntent] = useState<string | undefined>(() => {
    // Try to restore user intent from session storage
    return sessionStorage.getItem(USER_INTENT_KEY) || undefined;
  });
  const [error, setError] = useState<string | null>(null);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [conversationId, setConversationId] = useState<string>(
    () => `conversation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );
  
  // Timeout reference for response waiting
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Define a function to detect and save user intent from message
  const detectAndSaveUserIntent = useCallback((message: string) => {
    // Simple intent detection logic
    let detectedIntent: string | undefined;
    
    if (message.toLowerCase().includes('patient') || 
        message.toLowerCase().includes('growth') ||
        message.toLowerCase().includes('marketing')) {
      detectedIntent = 'marketing';
    } else if (message.toLowerCase().includes('treatment') || 
               message.toLowerCase().includes('case acceptance') ||
               message.toLowerCase().includes('conversion')) {
      detectedIntent = 'treatment';
    } else if (message.toLowerCase().includes('team') || 
               message.toLowerCase().includes('staff') ||
               message.toLowerCase().includes('training')) {
      detectedIntent = 'training';
    }
    
    if (detectedIntent) {
      setUserIntent(detectedIntent);
      sessionStorage.setItem(USER_INTENT_KEY, detectedIntent);
    }
    
    return detectedIntent;
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      // Check if returning user with saved intent
      if (userIntent) {
        setMessages([
          {
            text: `Welcome back — I remember you were exploring ${userIntent}. Would you like to continue from there?`,
            isUser: false,
            agent: "miles",
            timestamp: new Date(),
          },
        ]);
      } else {
        // First-time greeting
        setMessages([
          {
            text: "Hey, I'm Miles — your AI Concierge here at NextGen.\nWhat can I help you with today?",
            isUser: false,
            agent: "miles",
            timestamp: new Date(),
          },
        ]);
      }
    }
  }, [messages.length, userIntent]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.isUser) {
        // Update agent based on response content
        if (lastMessage.text.includes("Let me bring in Giselle") || 
            lastMessage.text.includes("Giselle here") ||
            lastMessage.text.includes("Introducing Giselle")) {
          setCurrentAgent("giselle");
          sessionStorage.setItem(CURRENT_AGENT_KEY, "giselle");
        } else if (lastMessage.text.includes("Let me bring in Devon") || 
                  lastMessage.text.includes("Devon here") ||
                  lastMessage.text.includes("I'm Devon") ||
                  lastMessage.text.includes("Introducing Devon")) {
          setCurrentAgent("devon");
          sessionStorage.setItem(CURRENT_AGENT_KEY, "devon");
        } else if (lastMessage.text.includes("Let me bring in Alma") || 
                  lastMessage.text.includes("Alma here") ||
                  lastMessage.text.includes("I'm Alma") ||
                  lastMessage.text.includes("Introducing Alma")) {
          setCurrentAgent("alma");
          sessionStorage.setItem(CURRENT_AGENT_KEY, "alma");
        } else if (lastMessage.text.includes("Back to Miles") || 
                  lastMessage.text.includes("Miles here") ||
                  lastMessage.text.includes("Introducing Miles")) {
          setCurrentAgent("miles");
          sessionStorage.setItem(CURRENT_AGENT_KEY, "miles");
        }
      }
    }
  }, [messages]);

  const saveMessagesToSession = useCallback((newMessages: AiMessage[]) => {
    try {
      sessionStorage.setItem(conversationId, JSON.stringify(newMessages));
    } catch (err) {
      console.error("Error saving messages to sessionStorage:", err);
    }
  }, [conversationId]);

  useEffect(() => {
    try {
      const savedMessages = sessionStorage.getItem(conversationId);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages) as AiMessage[];
        const messagesWithDates = parsedMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      }
    } catch (err) {
      console.error("Error loading messages from sessionStorage:", err);
    }
  }, [conversationId]);

  // Handle timeout 
  const startResponseTimeout = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout for 10 seconds
    timeoutRef.current = setTimeout(() => {
      setIsTimedOut(true);
      setIsTyping(false);
      console.log("Response timeout triggered - showing fallback message");
    }, 10000);
  }, []);
  
  // Clear timeout when response is received
  const clearResponseTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Handle retry after timeout
  const handleRetry = useCallback(() => {
    setIsTimedOut(false);
    // Restart the last message exchange
    const lastUserMessage = [...messages].reverse().find(msg => msg.isUser);
    if (lastUserMessage) {
      sendMessage(lastUserMessage.text, true);
    }
  }, [messages]);
  
  // Handle start over after timeout
  const handleStartOver = useCallback(() => {
    setIsTimedOut(false);
    clearConversation();
  }, []);

  const sendMessage = useCallback(async (userMessage: string, isRetry: boolean = false) => {
    if (!userMessage.trim()) return;

    // Don't add user message again if this is a retry
    if (!isRetry) {
      // Detect user intent from message
      detectAndSaveUserIntent(userMessage);
      
      // Detect suggested agent
      const suggestedAgent = detectAgentFromMessage(userMessage);

      const newUserMessage = {
        text: userMessage,
        isUser: true,
        agent: currentAgent,
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, newUserMessage];
      setMessages(updatedMessages);
      saveMessagesToSession(updatedMessages);
    }
    
    setIsTimedOut(false); // Reset timeout status
    setIsTyping(true);
    setError(null);
    startResponseTimeout(); // Start timeout tracking

    try {
      const messageHistory: Message[] = messages.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text,
      }));

      if (!isRetry) {
        messageHistory.push({
          role: "user",
          content: userMessage,
        });
      } else {
        // If retry, find the last user message
        const lastUserMessage = [...messages].reverse().find(msg => msg.isUser);
        if (lastUserMessage) {
          messageHistory.push({
            role: "user",
            content: lastUserMessage.text,
          });
        }
      }
      
      // Add routing hint for agent specialization
      const suggestedAgent = detectAgentFromMessage(isRetry ? 
        [...messages].reverse().find(msg => msg.isUser)?.text || "" : userMessage);
        
      if (suggestedAgent !== currentAgent && messages.length > 1) {
        messageHistory.push({
          role: "system",
          content: `The user's question seems to be about ${suggestedAgent}'s specialty. Consider handing off to ${suggestedAgent}.`
        });
      }

      const response = await callOpenAI(messageHistory, SYSTEM_PROMPT);

      clearResponseTimeout(); // Clear timeout since we received a response

      if (response) {
        const aiMessage = {
          text: response,
          isUser: false,
          agent: currentAgent,
          timestamp: new Date(),
        };
        
        const newMessages = [...(isRetry ? messages : messages.concat({
          text: userMessage,
          isUser: true,
          agent: currentAgent,
          timestamp: new Date(),
        })), aiMessage];
        
        setMessages(newMessages);
        saveMessagesToSession(newMessages);
      } else {
        setError("Failed to get response from AI. Please try again.");
        setIsTimedOut(true); // Show timeout UI if response failed
      }
    } catch (err) {
      console.error("Error in AI conversation:", err);
      setError("Something went wrong. Please try again.");
      setIsTimedOut(true); // Show timeout UI if there was an error
    } finally {
      setIsTyping(false);
      clearResponseTimeout(); // Clear timeout just in case
    }
  }, [messages, currentAgent, saveMessagesToSession, startResponseTimeout, clearResponseTimeout, detectAndSaveUserIntent]);

  // Clear conversation and reset state
  const clearConversation = useCallback(() => {
    setMessages([]);
    setUserIntent(undefined);
    setCurrentAgent("miles");
    sessionStorage.removeItem(USER_INTENT_KEY);
    sessionStorage.removeItem(CURRENT_AGENT_KEY);
    const newConversationId = `conversation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setConversationId(newConversationId);
    sessionStorage.removeItem(conversationId);
  }, [conversationId]);

  return {
    messages,
    isTyping,
    currentAgent,
    userIntent,
    error,
    isTimedOut,
    sendMessage,
    handleRetry,
    handleStartOver,
    clearConversation
  };
}
