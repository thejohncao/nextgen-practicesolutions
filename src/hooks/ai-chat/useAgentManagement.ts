
import { useState, useCallback, useEffect } from 'react';
import { getAgentChatData } from '@/data/agentChatData';
import { AiMessage } from '../useAiConversation';

// Valid agent names
export type AgentName = 'miles' | 'giselle' | 'devon' | 'alma';

/**
 * Hook for managing AI agents and their conversations
 */
export function useAgentManagement() {
  // Store conversations by agent
  const [agentConversations, setAgentConversations] = useState<Record<AgentName, AiMessage[]>>({
    miles: [],
    giselle: [],
    devon: [],
    alma: []
  });
  
  const [currentAgent, setCurrentAgent] = useState<AgentName>(() => {
    // Try to restore the selected agent from session storage, fall back to current agent
    const selectedAgent = sessionStorage.getItem('nextgen_selected_agent');
    if (selectedAgent && ['miles', 'giselle', 'devon', 'alma'].includes(selectedAgent)) {
      sessionStorage.removeItem('nextgen_selected_agent'); // Clear after reading
      return selectedAgent as AgentName;
    }
    
    // Fall back to the last used agent
    const savedAgent = sessionStorage.getItem('nextgen_current_agent');
    return (savedAgent as AgentName) || "miles";
  });

  // Get current messages for the current agent
  const messages = agentConversations[currentAgent] || [];
  
  // Change the current agent
  const changeAgent = useCallback((agentName: string) => {
    const lowerCaseName = agentName.toLowerCase();
    if (['miles', 'giselle', 'devon', 'alma'].includes(lowerCaseName)) {
      setCurrentAgent(lowerCaseName as AgentName);
      sessionStorage.setItem('nextgen_current_agent', lowerCaseName);
      
      // Initialize conversation for this agent if needed
      setAgentConversations(prev => {
        if (!prev[lowerCaseName as AgentName] || prev[lowerCaseName as AgentName].length === 0) {
          const chatData = getAgentChatData(lowerCaseName);
          return {
            ...prev,
            [lowerCaseName]: [{
              text: chatData.welcomeMessage,
              isUser: false,
              agent: lowerCaseName,
              timestamp: new Date()
            }]
          };
        }
        return prev;
      });
    }
  }, []);

  // Initialize conversations for agents
  useEffect(() => {
    setAgentConversations(prev => {
      const updatedConversations = { ...prev };
      
      // For each agent, initialize with welcome message if empty
      ['miles', 'giselle', 'devon', 'alma'].forEach(agentName => {
        if (!updatedConversations[agentName as AgentName] || updatedConversations[agentName as AgentName].length === 0) {
          const chatData = getAgentChatData(agentName);
          updatedConversations[agentName as AgentName] = [{
            text: chatData.welcomeMessage,
            isUser: false,
            agent: agentName,
            timestamp: new Date()
          }];
        }
      });
      
      return updatedConversations;
    });
  }, []);

  // Save messages to session storage
  const saveMessagesToSession = useCallback((conversationId: string, agent: string, newMessages: AiMessage[]) => {
    try {
      sessionStorage.setItem(`${conversationId}-${agent}`, JSON.stringify(newMessages));
    } catch (err) {
      console.error(`Error saving messages for ${agent} to sessionStorage:`, err);
    }
  }, []);

  // Clear all agent conversations
  const clearAgentConversations = useCallback((conversationId: string) => {
    // Reset all agent conversations
    setAgentConversations({
      miles: [],
      giselle: [],
      devon: [],
      alma: []
    });
    
    // Clean up old conversation data from session storage
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith(conversationId)) {
        sessionStorage.removeItem(key);
      }
    });
    
    // Initialize new welcome messages
    setTimeout(() => {
      ['miles', 'giselle', 'devon', 'alma'].forEach(agentName => {
        const chatData = getAgentChatData(agentName);
        setAgentConversations(prev => ({
          ...prev,
          [agentName]: [{
            text: chatData.welcomeMessage,
            isUser: false,
            agent: agentName,
            timestamp: new Date()
          }]
        }));
      });
    }, 100);
  }, []);

  // Reset the current agent
  const resetCurrentAgent = useCallback(() => {
    setCurrentAgent("miles");
    sessionStorage.removeItem('nextgen_current_agent');
  }, []);

  return {
    agentConversations,
    setAgentConversations,
    currentAgent,
    setCurrentAgent,
    messages,
    changeAgent,
    saveMessagesToSession,
    clearAgentConversations,
    resetCurrentAgent
  };
}
