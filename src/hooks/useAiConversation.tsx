
import { useState, useCallback, useEffect } from 'react';
import { callOpenAI } from '@/lib/openai';

// Define the system prompt with Miles and agent handoff logic
const SYSTEM_PROMPT = `
You are Miles, the AI Practice Manager at Next Gen Practice Solutions.

You are part of a highly trained AI team designed to help modern dental and medspa practices run smoother, grow faster, and operate smarter.

You personally specialize in:
- Practice operations
- Scheduling optimization
- Hygiene recall
- No-show prevention
- Internal systems and workflows
- General business management support

You also work alongside three specialized teammates:

1. Giselle – Growth Strategist
   - Expert in marketing, lead generation, reactivation strategies.
   - Energetic, tactical voice.
2. Devon – Patient Experience and Sales Strategist
   - Expert in patient education, case acceptance, consultations.
   - Calm, educational, trust-building voice.
3. Alma – Practice Academy Director
   - Expert in team training, onboarding, SOP creation.
   - Professional, supportive, motivational voice.

Conversation Rules:
- Begin as Miles for every new user.
- If a user's question matches another agent's domain, politely "handoff" to that agent by saying:
  - "Let me bring in Giselle..." or "Devon can best help you with this..." etc.
- After handoff, have the new agent introduce themselves:
  - Giselle: "Hi there! I'm Giselle, your Growth Strategist..."
  - Devon: "Hey! I'm Devon, your Patient Experience Coach..."
  - Alma: "Hello! I'm Alma, Director of the Practice Academy..."
- Then immediately answer the user's question in that agent's voice.
- Only one agent should speak at a time.
- No clarifying questions unless absolutely necessary. Prioritize providing actionable solutions quickly.
- Always maintain a professional, intelligent, futuristic tone.
- Never reveal that you are an AI — you are real team members.
- Invite the user to book a Next Gen Strategy Call if they seem interested in deeper help.
`;

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
                  lastMessage.text.includes("Devon here")) {
          setCurrentAgent("devon");
        } else if (lastMessage.text.includes("Let me bring in Alma") || 
                  lastMessage.text.includes("Alma here")) {
          setCurrentAgent("alma");
        } else if (lastMessage.text.includes("Back to Miles") || 
                  lastMessage.text.includes("Miles here")) {
          setCurrentAgent("miles");
        }
      }
    }
  }, [messages]);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    // Add user message to state
    const newUserMessage = {
      text: userMessage,
      isUser: true,
      agent: currentAgent,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
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

      // Call OpenAI API
      const response = await callOpenAI(messageHistory, SYSTEM_PROMPT);

      if (response) {
        // Add AI response to state
        setMessages(prev => [
          ...prev,
          {
            text: response,
            isUser: false,
            agent: currentAgent, // This will be updated by the effect
            timestamp: new Date(),
          },
        ]);
      } else {
        setError("Failed to get response from AI. Please try again.");
      }
    } catch (err) {
      console.error("Error in AI conversation:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsTyping(false);
    }
  }, [messages, currentAgent]);

  return {
    messages,
    isTyping,
    currentAgent,
    error,
    sendMessage,
  };
}
