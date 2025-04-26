import { useState, useCallback, useEffect } from 'react';
import { callOpenAI, SYSTEM_PROMPT, detectAgentFromMessage, Message } from '@/lib/openai';

type MessageRole = 'user' | 'assistant' | 'system';

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

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          text: "Hi there, and welcome to NextGen Practice Solutions!\n\nI'm Miles, your AI Practice Concierge.\n\nI'm here to help you:\n\n➔ Learn about Practice Growth Packages\n➔ Explore the Academy & Certification\n➔ Book a Discovery Call\n➔ Ask a General Question\n\nJust click or type what you'd like to explore!\nI'm here to guide you.",
          isUser: false,
          agent: "miles",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.isUser) {
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

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

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
    
    setIsTyping(true);
    setError(null);

    try {
      const messageHistory: Message[] = messages.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text,
      }));

      messageHistory.push({
        role: "user",
        content: userMessage,
      });

      if (suggestedAgent !== currentAgent && messages.length > 1) {
        messageHistory.push({
          role: "system",
          content: `The user's question seems to be about ${suggestedAgent}'s specialty. Consider handing off to ${suggestedAgent}.`
        });
      }

      const response = await callOpenAI(messageHistory, SYSTEM_PROMPT);

      if (response) {
        const aiMessage = {
          text: response,
          isUser: false,
          agent: currentAgent,
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
