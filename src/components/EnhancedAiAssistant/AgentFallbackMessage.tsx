
import React from 'react';
import { Button } from '@/components/ui/button';
import { getAgentFallbackMessage } from '@/utils/fallbackMessages';

interface AgentFallbackMessageProps {
  agent: string;
  onQuickReply: (action: string) => void;
}

const AgentFallbackMessage: React.FC<AgentFallbackMessageProps> = ({
  agent,
  onQuickReply
}) => {
  const fallback = getAgentFallbackMessage(agent);
  const IconComponent = fallback.icon;
  
  return (
    <div className="p-4 mb-4 animate-fade-in bg-black/50 border border-amber-700/30 rounded-lg">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full bg-opacity-20 ${getAgentColor(agent)}`}>
          <IconComponent className={`h-5 w-5 ${getAgentIconColor(agent)}`} />
        </div>
        <div>
          <p className="text-white/90 mb-3">{fallback.message}</p>
          <div className="flex gap-2 flex-wrap">
            {fallback.quickReplies.map((reply, index) => (
              <Button 
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className={`
                  flex items-center gap-1 
                  ${index === 0 
                    ? getAgentButtonClass(agent) 
                    : 'border-white/20 hover:bg-white/5'}
                `}
                onClick={() => onQuickReply(reply.action)}
              >
                {reply.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for styling based on agent
const getAgentColor = (agent: string): string => {
  switch(agent.toLowerCase()) {
    case 'giselle': return 'bg-green-500';
    case 'devon': return 'bg-purple-500';
    case 'alma': return 'bg-amber-500';
    default: return 'bg-blue-500';
  }
};

const getAgentIconColor = (agent: string): string => {
  switch(agent.toLowerCase()) {
    case 'giselle': return 'text-green-500';
    case 'devon': return 'text-purple-500';
    case 'alma': return 'text-amber-500';
    default: return 'text-blue-500';
  }
};

const getAgentButtonClass = (agent: string): string => {
  switch(agent.toLowerCase()) {
    case 'giselle': return 'bg-gradient-to-r from-green-500 to-green-600';
    case 'devon': return 'bg-gradient-to-r from-purple-500 to-purple-600';
    case 'alma': return 'bg-gradient-to-r from-amber-500 to-amber-600';
    default: return 'bg-gradient-to-r from-blue-500 to-indigo-500';
  }
};

export default AgentFallbackMessage;
