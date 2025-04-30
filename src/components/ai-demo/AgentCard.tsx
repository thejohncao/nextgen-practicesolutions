
import React from 'react';
import { Agent } from '@/types/agent';
import AgentAvatar from '@/components/AgentAvatar';
import { getAgentCardColor, getAgentBorderColor } from '@/utils/colorUtils';
import { cn } from '@/lib/utils';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  const cardColorClass = getAgentCardColor(agent.color);
  const borderColorClass = getAgentBorderColor(agent.color);
  
  return (
    <div 
      className={cn(
        "p-6 rounded-xl backdrop-blur-md transition-all duration-300 h-full",
        "border hover:shadow-lg hover:scale-[1.02] cursor-pointer",
        cardColorClass,
        borderColorClass
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-4">
          <AgentAvatar
            name={agent.name}
            role={agent.title}
            color={agent.color}
            size="md"
            animated={true}
            showLabel={false}
          />
          <div>
            <h3 className="text-xl font-bold text-white">{agent.name}</h3>
            <p className="text-sm text-white/70">{agent.title}</p>
          </div>
        </div>
        
        <p className="text-white/80 mb-4">{agent.tagline}</p>
        
        {agent.activities && (
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {agent.activities.map((activity, index) => (
                <span 
                  key={index} 
                  className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    `bg-${agent.color}-500/10`,
                    `text-${agent.color}-500`,
                    `border border-${agent.color}-500/20`
                  )}
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentCard;
