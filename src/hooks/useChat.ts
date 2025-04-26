
import { useState, useEffect } from 'react';
import { agents } from '@/config/agents';
import { AgentType } from '@/types/agent';

interface Message {
  text: string;
  isUser: boolean;
  agent: AgentType;
  timestamp: Date;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAgent, setCurrentAgent] = useState<AgentType>('miles');
  const [messageCount, setMessageCount] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        text: agents[currentAgent].intro,
        isUser: false,
        agent: currentAgent,
        timestamp: new Date()
      }]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.isUser) {
        // Handle agent transitions
        if (lastMessage.text.includes("Let me bring in Giselle")) {
          setCurrentAgent('giselle');
          addMessage(agents.giselle.intro, false, 'giselle');
        } else if (lastMessage.text.includes("Let me bring in Devon")) {
          setCurrentAgent('devon');
          addMessage(agents.devon.intro, false, 'devon');
        } else if (lastMessage.text.includes("Let me bring in Alma")) {
          setCurrentAgent('alma');
          addMessage(agents.alma.intro, false, 'alma');
        }
      }
    }
  }, [messages]);

  useEffect(() => {
    // Show CTA after 3 message exchanges
    if (messageCount >= 3 && !showCTA) {
      setShowCTA(true);
      addMessage(
        "If you'd like a personalized strategy session with our Next Gen team, we'd love to meet you.",
        false,
        currentAgent
      );
    }
  }, [messageCount]);

  const addMessage = (text: string, isUser: boolean, agent: AgentType) => {
    setMessages(prev => [...prev, {
      text,
      isUser,
      agent,
      timestamp: new Date()
    }]);
    if (isUser) {
      setMessageCount(prev => prev + 1);
    }
  };

  return {
    messages,
    currentAgent,
    addMessage,
    showCTA
  };
};
