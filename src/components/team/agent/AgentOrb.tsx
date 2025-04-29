
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';
import IllustratedAgentAvatar from '@/components/avatar/IllustratedAgentAvatar';
import OrbInnerEffects from './OrbInnerEffects';

interface AgentOrbProps {
  name: string;
  role: string;
  color: string;
  tooltipText: string;
  animated?: boolean;
  isActive?: boolean;
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

const AgentOrb = ({ name, role, color, tooltipText, animated, isActive, onClick }: AgentOrbProps) => {
  const isMobile = useIsMobile();
  const glowColor = getGlowColor(color);
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={`
            relative group transition-transform duration-300
            hover:scale-105 focus:outline-none bg-transparent
            ${isActive ? 'scale-105' : ''}
          `}
        >
          {/* Background tint layer - removed to fix black box issue */}
          
          {/* Active agent pulse animation */}
          {isActive && (
            <div
              className="absolute inset-0 rounded-full animate-pulse-slow opacity-40 bg-transparent"
              style={{ 
                backgroundColor: glowColor,
                animation: 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
          )}
          
          {/* Enhanced inner effects with proper z-index */}
          <div className="relative z-10 bg-transparent">
            <OrbInnerEffects color={color} isActive={!!isActive} />
          </div>
          
          {/* Hover glow effect */}
          <div 
            className={`
              absolute inset-0 rounded-full opacity-0
              transition-opacity duration-500 blur-xl
              group-hover:opacity-40 z-20 bg-transparent
              ${isActive ? 'opacity-40' : ''}
            `}
            style={{ backgroundColor: glowColor }}
          />
          
          <IllustratedAgentAvatar
            name={name}
            role={role}
            color={color}
            size="lg"
            animated={animated}
          />
        </button>
      </TooltipTrigger>
      {!isMobile && (
        <TooltipContent 
          side="top"
          className="bg-black/80 text-white text-sm py-2 px-3 animate-in fade-in-0 zoom-in-95"
        >
          {tooltipText}
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default AgentOrb;
