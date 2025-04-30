import React from 'react';
import OrbInnerEffects from './OrbInnerEffects';
import AgentOrbInnerIcon from './AgentOrbInnerIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface AgentOrbProps {
  name: string;
  role: string;
  color: "blue" | "green" | "purple" | "red" | "gold";
  size?: 'sm' | 'md' | 'lg';
  tooltipText?: string;
  animated?: boolean;
  animationIntensity?: "none" | "low" | "medium" | "high";
  isActive?: boolean;
  onClick?: () => void;
  displayMode?: 'initial' | 'fullName';
  showLabel?: boolean;
  poweredUp?: boolean;
}

const AgentOrb: React.FC<AgentOrbProps> = ({
  name,
  role,
  color = 'purple',
  size = 'md',
  tooltipText,
  animated = false,
  animationIntensity = "medium",
  isActive = false,
  onClick,
  displayMode = 'initial',
  showLabel = false,
  poweredUp = false,
}) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  }[size];
  
  const baseClasses = `
    bg-black/20 hover:bg-black/40
    border-white/10 hover:border-white/20
  `;
  
  const activeClasses = `
    border-2 border-white/80
  `;
  
  const gradientClass = {
    blue: "from-blue-500/40 to-blue-800/80",
    green: "from-green-500/40 to-green-800/80",
    purple: "from-purple-500/40 to-purple-800/80",
    red: "from-red-500/40 to-red-800/80",
    gold: "from-amber-500/40 to-amber-800/80",
  }[color];

  return (
    <TooltipProvider>
      <div className="relative inline-flex flex-col items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={onClick}
              className={cn(
                "relative rounded-full border transition-all duration-300",
                sizeClasses,
                isActive ? `${activeClasses} shadow-glow` : baseClasses,
                onClick ? "cursor-pointer" : "cursor-default"
              )}
              aria-label={`Select ${name}`}
            >
              {/* Orb inner elements */}
              <div className={`absolute inset-0 rounded-full overflow-hidden bg-gradient-to-b ${gradientClass}`}>
                {animated && (
                  <OrbInnerEffects 
                    color={color}
                    intensity={animationIntensity}
                    poweredUp={poweredUp}
                  />
                )}
                {/* Agent initial or icon */}
                <AgentOrbInnerIcon 
                  name={name}
                  agent={name}
                  displayMode={displayMode}
                  isActive={isActive}
                />
              </div>
            </button>
          </TooltipTrigger>
          {tooltipText && (
            <TooltipContent side="top" className="bg-nextgen-dark/95 border-nextgen-purple/20">
              <p className="text-sm">{tooltipText}</p>
            </TooltipContent>
          )}
        </Tooltip>
        
        {showLabel && (
          <div className="mt-2 text-center">
            <div className="text-sm font-medium text-white">{name}</div>
            <div className="text-xs text-white/60">{role}</div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default AgentOrb;
