
import React from 'react';
import { agents } from '@/data/agents';
import IllustratedAgentAvatar from './avatar/IllustratedAgentAvatar';

interface AgentAvatarProps {
  name: string;
  role: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  isTyping?: boolean;
  isPrimary?: boolean;
}

const AgentAvatar = ({ 
  name, 
  role, 
  color = 'purple', 
  size = 'md', 
  animated = true,
  isTyping = false,
  isPrimary = false
}: AgentAvatarProps) => {
  // Try to find agent's custom avatar if available
  const agent = agents.find(a => a.name.toLowerCase() === name.toLowerCase());
  const avatarImage = agent?.avatarImage;
  const isAnimatedAvatar = agent?.animatedAvatar ?? animated;
  
  return (
    <IllustratedAgentAvatar
      name={name}
      role={role}
      color={color}
      size={size}
      imagePath={avatarImage}
      animated={isAnimatedAvatar}
      isTyping={isTyping}
      isPrimary={isPrimary}
    />
  );
};

export default AgentAvatar;
