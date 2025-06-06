
import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AgentAvatar from '@/components/AgentAvatar';
import { getAgentTools } from '@/data/agentTools';
import { cn } from '@/lib/utils';

interface AgentCardWithTooltipProps {
  name: string;
  role: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  displayMode?: 'initial' | 'fullName';
  className?: string;
}

const AgentCardWithTooltip = ({
  name,
  role,
  color,
  size = 'md',
  animated = true,
  displayMode = 'initial',
  className
}: AgentCardWithTooltipProps) => {
  const tools = getAgentTools(name);

  const getAgentTextColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-400';
      case 'green': return 'text-green-400';
      case 'purple': return 'text-purple-400';
      case 'gold': return 'text-amber-400';
      default: return 'text-white';
    }
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="transition-transform duration-200 group-hover:scale-110 group-hover:rotate-2">
        <AgentAvatar 
          name={name} 
          role={role}
          color={color}
          size={size}
          animated={animated}
          displayMode={displayMode}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`font-bold text-lg ${getAgentTextColor(color)}`}>
          {name}
        </span>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="opacity-60 hover:opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-white/10">
              <Info className="h-4 w-4 text-white/70" />
            </button>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            className="bg-black/90 border border-white/10 backdrop-blur-md p-4 max-w-xs"
            sideOffset={10}
          >
            <div className="space-y-3">
              <div className="text-white/90 text-sm font-medium">
                Powered by:
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {tools.map((tool, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <div className="w-5 h-5 flex-shrink-0">
                      <img 
                        src={tool.iconUrl} 
                        alt={tool.name}
                        className="w-full h-full object-contain opacity-90 filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-200"
                        onError={(e) => {
                          // Fallback to a simple colored circle if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = `w-5 h-5 rounded-full bg-${color}-500/30 border border-${color}-500/50`;
                          target.parentNode?.appendChild(fallback);
                        }}
                      />
                    </div>
                    <span className="text-white/80 text-xs font-medium truncate">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="text-white/60 text-xs italic mt-2 pt-2 border-t border-white/10">
                Tools that power {name}'s capabilities
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default AgentCardWithTooltip;
