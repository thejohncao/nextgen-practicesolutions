
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
  poweredUp = false,
}: AgentOrbProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  
  // Handle clicks on the orb
  const handleClick = () => {
    if (onClick) onClick();
  };

  // Size for the orb
  const orbSize = "w-16 h-16 sm:w-20 sm:h-20";
  
  // Base classes for the orb container
  const containerClasses = `
    relative 
    rounded-full 
    overflow-visible 
    cursor-pointer 
    transition-all 
    duration-300
    ${isActive ? 'z-10' : 'z-0'}
  `;

  // Get the name to display based on displayMode
  const displayName = displayMode === 'initial' ? name.charAt(0) : name;

  return (
    <div className="relative">
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={containerClasses}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* The outer orb container with hover effects */}
            <div
              className={`
                ${orbSize}
                relative 
                rounded-full 
                flex 
                items-center 
                justify-center
                transition-all
                duration-300
                ${isActive || isHovered ? 'transform scale-110' : ''}
                orb ${isActive ? 'orb-primary' : 'orb-secondary'}
              `}
            >
              {/* Enhanced inner glow/energy effect */}
              {animated && (
                <OrbInnerEffects 
                  color={color} 
                  isActive={isActive || isHovered}
                  intensity={animationIntensity}
                />
              )}
              
              {/* Illustrated agent avatar or letter */}
              <div className="relative z-10">
                {isActive || poweredUp ? (
                  <IllustratedAgentAvatar
                    name={name}
                    role={role}
                    color={color}
                    size="sm"
                    animated={animated}
                    displayMode={displayMode}
                    showLabel={false}
                  />
                ) : (
                  <AgentOrbInnerIcon 
                    agent={name} 
                    color={color} 
                  />
                )}
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="bottom" 
          className="bg-black/80 border-white/10 text-white text-xs"
        >
          <div className="flex flex-col">
            <span className="font-bold">{name}</span>
            <span className="text-white/70">{role}</span>
            {tooltipText && <span className="mt-1 max-w-60">{tooltipText}</span>}
          </div>
        </TooltipContent>
      </Tooltip>
      
      {/* Agent label that appears when powered up */}
      {showLabel && (
        <div 
          className={`
            absolute 
            -bottom-6
            left-1/2 
            transform 
            -translate-x-1/2
            whitespace-nowrap
            text-center
            animate-name-reveal
          `}
        >
          <div className="font-medium text-white text-sm">{name}</div>
          <div className="text-white/70 text-xs">{role}</div>
        </div>
      )}
    </div>
  );
};

export default AgentOrb;
