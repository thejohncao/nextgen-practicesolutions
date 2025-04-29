
import React, { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';
import IllustratedAgentAvatar from '@/components/avatar/IllustratedAgentAvatar';
import OrbInnerEffects from './OrbInnerEffects';
import AgentOrbInnerIcon from './AgentOrbInnerIcon';

interface AgentOrbProps {
  name: string;
  role: string;
  color: string;
  tooltipText: string;
  animated?: boolean;
  animationIntensity?: "none" | "low" | "medium" | "high";
  isActive?: boolean;
  onClick?: () => void;
  displayMode?: 'initial' | 'fullName';
  showLabel?: boolean;
  poweredUp?: boolean;
}

const getAgentColorClass = (color: string) => {
  switch (color) {
    case 'red': return 'red-color';
    case 'green': return 'giselle-color';
    case 'blue': return 'miles-color';
    case 'gold': return 'alma-color';
    case 'purple': return 'devon-color';
    default: return 'miles-color';
  }
};

const getGlowColor = (color: string) => {
  switch (color) {
    case 'red': return 'rgb(234, 56, 76)';
    case 'green': return 'rgb(63, 198, 160)'; 
    case 'blue': return 'rgb(74, 140, 255)';  
    case 'gold': return 'rgb(245, 158, 11)';  
    case 'purple': return 'rgb(139, 92, 246)'; 
    default: return 'rgb(155, 135, 245)';
  }
};

const AgentOrb = ({ 
  name, 
  role, 
  color, 
  tooltipText, 
  animated = true, 
  animationIntensity = "medium", 
  isActive = false, 
  onClick,
  displayMode = 'initial', 
  showLabel = false,
  poweredUp = false
}: AgentOrbProps) => {
  const isMobile = useIsMobile();
  const glowColor = getGlowColor(color);
  const colorClass = getAgentColorClass(color);
  const [isHovering, setIsHovering] = useState(false);
  
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovering(false);
    }
  };
  
  const handleTap = () => {
    if (isMobile) {
      setIsHovering(prev => !prev);
    }
    if (onClick) onClick();
  };
  
  // Determine if we should show the label based on hover state
  const effectiveShowLabel = showLabel || isHovering || isActive;
  
  // Get animation intensity factor
  const getAnimationIntensityFactor = () => {
    switch (animationIntensity) {
      case "none": return 0;
      case "low": return 0.5;
      case "high": return 1.5;
      default: return 1; // medium is default
    }
  };
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleTap}
          className={`
            relative group transition-all duration-300 animate-hover-pop
            focus:outline-none bg-transparent overflow-visible rounded-full
            ${isActive ? 'scale-105' : ''}
            ${colorClass}
          `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Active agent pulse animation */}
          {isActive && (
            <div
              className="absolute inset-0 rounded-full animate-pulse-slow opacity-40 bg-transparent overflow-visible"
              style={{ 
                backgroundColor: glowColor,
                animation: 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
          )}
          
          {/* Enhanced inner effects with proper z-index */}
          <div className="relative z-10 bg-transparent overflow-visible rounded-full">
            <OrbInnerEffects 
              color={color} 
              isActive={isActive} 
              intensity={animationIntensity !== "none" ? animationIntensity : undefined}
            />
          </div>
          
          {/* Agent-specific icon and tooltip */}
          <AgentOrbInnerIcon 
            agent={name}
            isActive={isActive || isHovering}
          />
          
          {/* Hover glow effect - enhanced with new animation */}
          <div 
            className={`
              absolute inset-0 rounded-full opacity-0
              transition-all duration-500 blur-xl
              group-hover:opacity-60 z-20 bg-transparent overflow-visible
              ${isActive ? 'opacity-60 animate-hero-glow' : ''}
              ${isHovering ? 'opacity-60' : ''}
            `}
            style={{ backgroundColor: glowColor }}
          />
          
          <IllustratedAgentAvatar
            name={name}
            role={role}
            color={color}
            size="lg"
            animated={animated}
            displayMode={displayMode}
            showLabel={effectiveShowLabel}
          />
        </button>
      </TooltipTrigger>
      {!isMobile && !effectiveShowLabel && (
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
