
import React from 'react';
import { cn } from '@/lib/utils';

interface AgentLoadingIndicatorProps {
  agent: string;
  className?: string;
}

const AgentLoadingIndicator: React.FC<AgentLoadingIndicatorProps> = ({ agent, className }) => {
  const getAgentColor = () => {
    switch (agent.toLowerCase()) {
      case 'miles': 
        return 'bg-blue-400';
      case 'giselle': 
        return 'bg-green-400';
      case 'devon': 
        return 'bg-purple-400';
      case 'alma': 
        return 'bg-amber-400';
      default: 
        return 'bg-blue-400';
    }
  };
  
  return (
    <div className={cn("flex justify-center py-2", className)}>
      <div 
        className={cn(
          "agent-loading-dot w-2 h-2 rounded-full", 
          getAgentColor(),
          "animate-pulse"
        )}
      />
    </div>
  );
};

export default AgentLoadingIndicator;
