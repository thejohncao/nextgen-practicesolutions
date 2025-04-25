
import React from 'react';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import AgentAvatar from './AgentAvatar';
import { Agent } from '@/types/agent';

interface AgentCardProps {
  agent: Agent;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const AgentCard = ({ agent, isActive, onMouseEnter, onMouseLeave, onClick }: AgentCardProps) => {
  const getGradientClass = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500/10 to-blue-600/5';
      case 'teal': return 'from-teal-500/10 to-teal-600/5';
      case 'purple': return 'from-nextgen-purple/10 to-nextgen-purple/5';
      case 'gold': return 'from-amber-500/10 to-amber-600/5';
      default: return 'from-nextgen-purple/10 to-nextgen-purple/5';
    }
  };

  return (
    <div 
      className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 
        transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] 
        bg-gradient-to-br ${getGradientClass(agent.color)} animate-fade-in`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <AgentAvatar 
            name={agent.name}
            role={agent.title}
            color={agent.color}
          />
        </div>
        
        <div className="space-y-3 flex-1">
          <div>
            <p className="text-base sm:text-lg text-white/70 italic mb-2 text-center sm:text-left">{agent.quote}</p>
          </div>
          
          <div className={`overflow-hidden transition-all duration-300 ${
            isActive ? 'max-h-[500px] opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform translate-y-4'
          }`}>
            <div className="pt-4 space-y-4">
              <div>
                <h5 className="text-sm font-medium text-white/80 mb-2">Key Activities:</h5>
                <ul className="grid grid-cols-2 gap-2">
                  {agent.activities.map((activity, i) => (
                    <li key={i} className="flex items-center text-white/70 text-xs sm:text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${getGradientClass(agent.color)} mr-2`}></div>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-white/80 mb-2">Tools:</h5>
                <div className="flex flex-wrap gap-2">
                  {agent.tools.map((tool, i) => (
                    <TooltipProvider key={i}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1 px-2 py-1 backdrop-blur-md bg-white/5 rounded-md border border-white/5">
                            <tool.icon className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
                            <span className="text-xs text-white/60">{tool.name}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{tool.name} – {tool.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
