
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AgentAvatarProps {
  name: string;
  role: string;
  color?: string;
}

const AgentAvatar = ({ name, role, color = 'purple' }: AgentAvatarProps) => {
  const getGradientClass = () => {
    return `bg-gradient-to-br ${color}`;
  };
  
  const getAnimationDelay = () => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `${(hash % 5) * 100}ms`;
  };
  
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  
  return (
    <div className="flex items-center animate-fade-in" style={{ animationDelay: getAnimationDelay() }}>
      <div className="relative">
        <Avatar className="w-12 h-12 border-2 border-white/10 bg-gradient-to-br animate-pulse-glow">
          <AvatarFallback className={getGradientClass()}>
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-nextgen-dark"></div>
      </div>
    </div>
  );
};

export default AgentAvatar;
