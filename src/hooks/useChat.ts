
import { useState } from 'react';
import { Message } from '@/types/chat';
import { AgentKey, agents, getAgentFromMessage } from '@/utils/agentStyles';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<AgentKey>("miles");

  const sendMessage = async (input: string) => {
    if (input.trim() === "") return;

    const userMessage = {
      text: input,
      isUser: true,
      agent: currentAgent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      let nextAgent = currentAgent;

      if (input.toLowerCase().includes("growth") || input.toLowerCase().includes("strategy")) {
        aiResponse = "Let me bring in Giselle, our growth specialist.\n\nGiselle here! I'd be happy to discuss growth strategies for your dental practice. What specific areas are you looking to improve?";
        nextAgent = "giselle";
      } else if (input.toLowerCase().includes("train") || input.toLowerCase().includes("education") || input.toLowerCase().includes("learn")) {
        aiResponse = "Let me bring in Devon, our education expert.\n\nDevon here! I'd love to help with training or educational resources. What specific skills or knowledge areas are you interested in?";
        nextAgent = "devon";
      } else if (input.toLowerCase().includes("team") || input.toLowerCase().includes("culture") || input.toLowerCase().includes("staff")) {
        aiResponse = "Let me bring in Alma, our team performance specialist.\n\nAlma here! I'm excited to help with your team and culture questions. What specific challenges are you facing with your practice team?";
        nextAgent = "alma";
      } else if (input.toLowerCase().includes("back") || input.toLowerCase().includes("miles")) {
        aiResponse = "Back to Miles, your practice management AI.\n\nMiles here! How else can I assist with your practice management needs?";
        nextAgent = "miles";
      } else {
        aiResponse = `I understand you're asking about "${input}". I can provide guidance on practice management, growth strategies, team culture, or clinical education. What specific aspect would you like to focus on?`;
      }

      setMessages(prev => [...prev, {
        text: aiResponse,
        isUser: false,
        agent: nextAgent,
        timestamp: new Date()
      }]);
      
      setIsTyping(false);
    }, 1500);
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      setMessages([
        { 
          text: agents[currentAgent].intro,
          isUser: false, 
          agent: currentAgent,
          timestamp: new Date()
        }
      ]);
    }
  };

  return {
    messages,
    isTyping,
    currentAgent,
    setCurrentAgent,
    sendMessage,
    initializeChat
  };
};

