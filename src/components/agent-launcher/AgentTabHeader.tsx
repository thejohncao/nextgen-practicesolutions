
import React from 'react';
import { cn } from '@/lib/utils';
import { agents } from '@/data/agents';
import AgentAvatar from '../AgentAvatar';

interface AgentTabHeaderProps {
  activeAgent: string;
  onAgentChange: (agentName: string) => void;
}

const AgentTabHeader = ({ activeAgent, onAgentChange }: AgentTabHeaderProps) => {
  return (
    <div className="flex overflow-x-auto scrollbar-none gap-2 p-2 bg-black/20 rounded-lg">
      {agents.map(agent => {
        const isActive = agent.name.toLowerCase() === activeAgent.toLowerCase();
        return (
          <button
            key={agent.name}
            onClick={() => onAgentChange(agent.name.toLowerCase())}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
              isActive 
                ? `bg-${agent.color}-500/20 border border-${agent.color}-500/30`
                : "hover:bg-white/5"
            )}
          >
            <AgentAvatar 
              name={agent.name} 
              role={agent.title} 
              color={agent.color} 
              size="sm"
              isCompactView
            />
            <span className={cn(
              "text-sm whitespace-nowrap",
              isActive ? "text-white" : "text-white/70"
            )}>
              {agent.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default AgentTabHeader;
