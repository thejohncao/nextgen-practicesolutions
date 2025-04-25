
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
    <div className="flex items-center animate-fade-in relative" style={{ animationDelay: getAnimationDelay() }}>
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full animate-pulse-slow opacity-50 bg-gradient-to-r from-white/10 to-white/20 blur-md" />
        
        {/* Animated rings */}
        <div className="absolute inset-0 rounded-full animate-pulse-slow scale-125 opacity-20 bg-gradient-to-r from-white/20 via-transparent to-white/20" />
        <div className="absolute inset-0 rounded-full animate-pulse-glow scale-110" />
        
        <Avatar className="w-12 h-12 border-2 border-white/10 relative z-10">
          <AvatarFallback className={`${getGradientClass()} animate-pulse duration-[3000ms]`}>
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        {/* Status indicator with pulse */}
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-nextgen-dark">
          <div className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-75" />
        </div>
      </div>
    </div>
  );
};

export default AgentAvatar;
