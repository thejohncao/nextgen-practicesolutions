
import React from 'react';
import { getAgentChatData } from '@/data/agentChatData';
import AgentSuggestionChip from './AgentSuggestionChip';
import { agents } from '@/data/agents';

interface AgentChatPreviewProps {
  agentName: string;
  onSelectSuggestion: (suggestion: string) => void;
}

const AgentChatPreview = ({ agentName, onSelectSuggestion }: AgentChatPreviewProps) => {
  const chatData = getAgentChatData(agentName);
  const agent = agents.find(a => a.name.toLowerCase() === agentName.toLowerCase());
  
  return (
    <div className="space-y-4">
      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
        <p className="text-white">{chatData.welcomeMessage}</p>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm text-white/70">Choose a topic to get started:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {chatData.suggestions.map((suggestion, index) => (
            <AgentSuggestionChip
              key={index}
              suggestion={suggestion}
              color={agent?.color || 'blue'}
              onClick={() => onSelectSuggestion(suggestion)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentChatPreview;
