
import React from 'react';
import AgentAvatar from '../AgentAvatar';
import AgentQuote from './AgentQuote';
import { Agent } from '@/types/agent';
import { cn } from '@/lib/utils';
import ToolBadge from './ToolBadge';

interface BoardroomAgentCardProps {
  agent: Agent;
  phase: string;
  isActive?: boolean;
  animationDelay?: number;
}

const BoardroomAgentCard = ({ 
  agent, 
  phase, 
  isActive = false,
  animationDelay = 0
}: BoardroomAgentCardProps) => {
  // Get appropriate styling based on agent color
  const getBgColorClass = () => {
    switch (agent.color) {
      case 'blue': return 'bg-blue-500/5';
      case 'green': return 'bg-green-500/5';
      case 'purple': return 'bg-purple-500/5';
      case 'gold': return 'bg-amber-500/5';
      default: return 'bg-white/5';
    }
  };
  
  const getBorderColorClass = () => {
    switch (agent.color) {
      case 'blue': return 'border-blue-500/20';
      case 'green': return 'border-green-500/20';
      case 'purple': return 'border-purple-500/20';
      case 'gold': return 'border-amber-500/20';
      default: return 'border-white/10';
    }
  };
  
  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-6 transition-all duration-300",
        getBgColorClass(),
        getBorderColorClass(),
        isActive && "shadow-glow",
        "opacity-0 animate-fade-in"
      )}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <AgentAvatar 
          name={agent.name}
          role={agent.title}
          color={agent.color}
          size="md"
          animated={true}
        />
        <div>
          <h3 className="text-xl font-bold text-white">{agent.name}</h3>
          <p className="text-sm text-white/70">{agent.title}</p>
          <div className="text-xs text-white/50 mt-1">{phase}</div>
        </div>
      </div>
      
      <p className="text-sm text-white/80 mb-4">
        {agent.tagline}
      </p>
      
      <AgentQuote quote={agent.quote || ""} agentColor={agent.color} />
      
      <div className="mt-4">
        <h4 className="text-sm font-medium text-white/90 mb-2">How {agent.name} Helps:</h4>
        <ul className="space-y-2">
          {agent.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="text-sm text-white/70 flex items-start gap-2">
              <span className="inline-block w-4 text-white/50">•</span>
              <span>{feature.split(' - ')[0]}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {agent.tools && (
        <div className="mt-6">
          <h4 className="text-xs font-medium text-white/60 mb-2">Tools:</h4>
          <div className="flex flex-wrap gap-2">
            {agent.tools.map((tool, index) => (
              <ToolBadge 
                key={index}
                name={tool.name} 
                icon={tool.icon.name as keyof typeof import('lucide-react')} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardroomAgentCard;
