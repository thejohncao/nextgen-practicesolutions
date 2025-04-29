
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import AgentAvatar from '../AgentAvatar';

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
  mode = 'initial',
  size = 'md',
  animated = true 
}: LabeledAvatarProps) => {
  const avatarComponent = (
    <AgentAvatar 
      name={agent.name} 
      role={agent.role}
      color={agent.color || 'purple'}
      size={size}
      animated={animated}
      displayMode={mode} 
      showLabel={true} 
    />
  );

  if (tooltip) {
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
