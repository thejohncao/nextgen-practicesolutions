
import { useState, useCallback, useEffect } from 'react';
import { callOpenAI, SYSTEM_PROMPT, detectAgentFromMessage } from '@/lib/openai';

export interface AiMessage {
  text: string;
  isUser: boolean;
  agent: string;
  timestamp: Date;
}

export function useAiConversation() {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState("miles");
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string>(
    () => `conversation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          text: "Hi, I'm Miles, your practice management AI. How can I help optimize your dental practice today?",
          isUser: false,
          agent: "miles",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  // Detect agent handoffs in messages and change the agent
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.isUser) {
        // Check for handoff phrases
        if (lastMessage.text.includes("Let me bring in Giselle") || 
            lastMessage.text.includes("Giselle here")) {
          setCurrentAgent("giselle");
        } else if (lastMessage.text.includes("Let me bring in Devon") || 
                  lastMessage.text.includes("Devon here") ||
                  lastMessage.text.includes("I'm Devon")) {
          setCurrentAgent("devon");
        } else if (lastMessage.text.includes("Let me bring in Alma") || 
                  lastMessage.text.includes("Alma here") ||
                  lastMessage.text.includes("I'm Alma")) {
          setCurrentAgent("alma");
        } else if (lastMessage.text.includes("Back to Miles") || 
                  lastMessage.text.includes("Miles here")) {
          setCurrentAgent("miles");
        }
      }
    }
  }, [messages]);

  // Function to persist messages in sessionStorage
  const saveMessagesToSession = useCallback((newMessages: AiMessage[]) => {
    try {
      sessionStorage.setItem(conversationId, JSON.stringify(newMessages));
    } catch (err) {
      console.error("Error saving messages to sessionStorage:", err);
    }
  }, [conversationId]);

  // Load messages from sessionStorage on initial load
  useEffect(() => {
    try {
      const savedMessages = sessionStorage.getItem(conversationId);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages) as AiMessage[];
        // Convert stored date strings back to Date objects
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

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    // Detect potential agent from user message
    const suggestedAgent = detectAgentFromMessage(userMessage);

    // Add user message to state
    const newUserMessage = {
      text: userMessage,
      isUser: true,
      agent: currentAgent,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    saveMessagesToSession(updatedMessages);
    
    setIsTyping(true);
    setError(null);

    try {
      // Format messages for OpenAI API
      const messageHistory = messages.map(msg => ({
        role: msg.isUser ? "user" as const : "assistant" as const,
        content: msg.text,
      }));

      // Add the new user message
      messageHistory.push({
        role: "user" as const,
        content: userMessage,
      });

      // If the detected agent is different from current agent, add a hint to switch
      if (suggestedAgent !== currentAgent && messages.length > 1) {
        messageHistory.push({
          role: "system" as const,
          content: `The user's question seems to be about ${suggestedAgent}'s specialty. Consider handing off to ${suggestedAgent}.`
        });
      }

      // Call OpenAI API
      const response = await callOpenAI(messageHistory, SYSTEM_PROMPT);

      if (response) {
        // Add AI response to state
        const aiMessage = {
          text: response,
          isUser: false,
          agent: currentAgent, // This will be updated by the effect
          timestamp: new Date(),
        };
        
        const newMessages = [...updatedMessages, aiMessage];
        setMessages(newMessages);
        saveMessagesToSession(newMessages);
      } else {
        setError("Failed to get response from AI. Please try again.");
      }
    } catch (err) {
      console.error("Error in AI conversation:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsTyping(false);
    }
  }, [messages, currentAgent, saveMessagesToSession]);

  return {
    messages,
    isTyping,
    currentAgent,
    error,
    sendMessage,
    clearConversation: () => {
      setMessages([]);
      const newConversationId = `conversation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setConversationId(newConversationId);
      sessionStorage.removeItem(conversationId);
    }
  };
}
