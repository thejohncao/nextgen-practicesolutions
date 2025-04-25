
import React from 'react';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Agent } from '@/types/agent';
import AgentAvatar from './AgentAvatar';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AgentCardProps {
  agent: Agent;
  isActive: boolean;
}

const AgentCard = ({ agent, isActive }: AgentCardProps) => {
  const getGradientClass = (color: string) => {
    switch (color) {
      case 'red': return 'from-red-500 to-red-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      default: return 'from-purple-500 to-purple-600';
    }
  };

  return (
    <div 
      className={`glass-card rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-glow bg-gradient-to-br ${getGradientClass(agent.color)}/10 animate-fade-in h-full`}
    >
      <div className="flex flex-col gap-4 h-full">
        {/* Avatar and header */}
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <AgentAvatar 
              name={agent.name}
              role={agent.title}
              color={agent.color}
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white">
              {agent.name}
            </h3>
            <p className="text-sm text-white/80">{agent.title}</p>
          </div>
        </div>
        
        {/* Tagline */}
        <p className="text-lg text-white/90 font-medium">{agent.tagline}</p>
        
        {/* Features */}
        <div className="space-y-3 flex-1">
          <ul className="space-y-2">
            {agent.features.slice(0, 5).map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-white/80 text-sm">
                <Check className={`h-4 w-4 mt-1 flex-shrink-0 text-${agent.color}-500`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* See Full Features button */}
        <Button
          variant="outline"
          className={`w-full mt-auto border-${agent.color}-500/20 hover:bg-${agent.color}-500/20`}
          asChild
        >
          <Link to="/features">See Full Features</Link>
        </Button>
      </div>
    </div>
  );
};

export default AgentCard;
