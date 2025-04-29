
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import AgentAvatar from '../AgentAvatar';
import { useIsMobile } from '@/hooks/use-mobile';

interface LabeledAvatarProps {
  agent: {
    name: string;
    role: string;
    color?: string;
  };
  tooltip?: boolean;
  mode?: 'initial' | 'fullName';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const LabeledAvatar = ({ 
  agent, 
  tooltip = false, 
  mode = 'initial', // Default changed to initial
  size = 'md',
  animated = true 
}: LabeledAvatarProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();
  
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
  };
  
  // Show the label if we're hovering or if explicitly set to full name mode
  const showLabel = isHovering || mode === 'fullName';
  
  const avatarComponent = (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
    >
      <AgentAvatar 
        name={agent.name} 
        role={agent.role}
        color={agent.color || 'purple'}
        size={size}
        animated={animated}
        displayMode="initial" // Always use initial, the hover state is handled in this component
        showLabel={showLabel} 
      />
    </div>
  );

  if (tooltip && !showLabel) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {avatarComponent}
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-black/80 text-white text-sm py-2 px-3">
          {agent.name} – {agent.role}
        </TooltipContent>
      </Tooltip>
    );
  }

  return avatarComponent;
};

export default LabeledAvatar;
