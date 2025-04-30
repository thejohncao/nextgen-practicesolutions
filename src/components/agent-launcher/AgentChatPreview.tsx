
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
  const [suggestions, setSuggestions] = React.useState(chatData.suggestions.slice(0, 4));
  
  // Handle suggestion click with immediate feedback
  const handleSuggestionClick = (suggestion: string) => {
    // Immediately clear suggestions to prevent double-clicks
    setSuggestions([]);
    // Pass suggestion to parent for processing
    onSelectSuggestion(suggestion);
  };
  
  return (
    <div className="space-y-6">
      {/* Welcome message is already shown in the message bubble, no need to repeat it here */}
      
      {suggestions.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm text-white/70">Choose a topic to get started:</h4>
          <div className="grid grid-cols-1 gap-2">
            {suggestions.map((suggestion, index) => (
              <AgentSuggestionChip
                key={index}
                suggestion={suggestion}
                color={agent?.color || 'blue'}
                onClick={() => handleSuggestionClick(suggestion)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentChatPreview;
