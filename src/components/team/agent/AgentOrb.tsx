
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';
import IllustratedAgentAvatar from '@/components/avatar/IllustratedAgentAvatar';

interface AgentOrbProps {
  name: string;
  role: string;
  color: string;
  isActive?: boolean;
  animate?: boolean;
  onClick?: () => void;
}

const getGlowColor = (color: string) => {
  switch (color) {
    case 'red': return 'rgb(234, 56, 76)';
    case 'green': return 'rgb(34, 197, 94)';
    case 'blue': return 'rgb(15, 160, 206)';
    case 'gold': return 'rgb(245, 158, 11)';
    default: return 'rgb(155, 135, 245)';
  }
};

const AgentOrb = ({ name, role, color, isActive, animate, onClick }: AgentOrbProps) => {
  const isMobile = useIsMobile();
  const glowColor = getGlowColor(color);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={`
              relative group transition-transform duration-300
              hover:scale-105 focus:outline-none
              ${isActive ? 'scale-105' : ''}
            `}
          >
            {/* Active agent pulse animation */}
            {animate && (
              <div
                className="absolute inset-0 rounded-full animate-pulse-slow opacity-40"
                style={{ 
                  backgroundColor: glowColor,
                  animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              />
            )}
            
            {/* Hover glow effect */}
            <div 
              className={`
                absolute inset-0 rounded-full opacity-0
                transition-opacity duration-500 blur-xl
                group-hover:opacity-40
                ${isActive ? 'opacity-40' : ''}
              `}
              style={{ backgroundColor: glowColor }}
            />
            
            <div className="relative">
              <IllustratedAgentAvatar
                name={name}
                role={role}
                color={color}
                size="lg"
                animated={animate}
              />
            </div>
          </button>
        </TooltipTrigger>
        {!isMobile && (
          <TooltipContent 
            side="top"
            className="bg-gradient-to-br from-black/90 to-black/80 text-white text-sm py-2 px-3 shadow-xl animate-in fade-in-0 zoom-in-95"
          >
            {role}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default AgentOrb;
