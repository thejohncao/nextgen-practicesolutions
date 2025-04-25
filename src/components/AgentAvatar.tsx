
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AgentAvatarProps {
  name: string;
  role: string;
  color?: string;
}

const AgentAvatar = ({ name, role, color = 'purple' }: AgentAvatarProps) => {
  const getGradientClass = () => {
    switch (color) {
      case 'blue': return 'from-blue-500/30 to-blue-600/10';
      case 'teal': return 'from-teal-500/30 to-teal-600/10';
      case 'gold': return 'from-amber-500/30 to-amber-600/10';
      default: return 'from-nextgen-purple/30 to-nextgen-purple/10';
    }
  };
  
  const getAnimationDelay = () => {
    // Create a simple hash of the name to generate a consistent but varied delay
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `${(hash % 5) * 100}ms`;
  };
  
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  
  return (
    <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: getAnimationDelay() }}>
      <div className="relative">
        <Avatar className="w-14 h-14 border-2 border-white/10 bg-gradient-to-br animate-pulse-glow">
          <AvatarFallback className={`bg-gradient-to-br ${getGradientClass()}`}>
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-nextgen-dark"></div>
      </div>
      <div className="mt-2 text-center">
        <p className="font-medium text-white">{name}</p>
        <p className="text-xs text-white/60">{role}</p>
      </div>
    </div>
  );
};

export default AgentAvatar;
