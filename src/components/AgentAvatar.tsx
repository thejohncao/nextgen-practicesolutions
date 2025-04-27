
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getAvatarGradient } from './avatar/getAvatarGradient';
import AvatarRings from './avatar/AvatarRings';
import AvatarOverlay from './avatar/AvatarOverlay';
import StatusIndicator from './avatar/StatusIndicator';

interface AgentAvatarProps {
  name: string;
  role: string;
  color?: string;
}

const AgentAvatar = ({ name, role, color = 'purple' }: AgentAvatarProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, Math.random() * 5000 + 3000);
    
    return () => clearInterval(animationInterval);
  }, []);
  
  const getAnimationDelay = () => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `${(hash % 5) * 100}ms`;
  };
  
  const getInitials = (name: string) => name.charAt(0).toUpperCase();
  
  return (
    <div 
      className="flex items-center animate-fade-in relative" 
      style={{ animationDelay: getAnimationDelay() }}
    >
      <div className="relative">
        <AvatarRings color={color} isAnimating={isAnimating} />
        <AvatarOverlay isAnimating={isAnimating} />
        
        <Avatar className={`w-12 h-12 border-2 border-white/10 relative z-10 transition-all duration-300 ${isAnimating ? 'scale-105' : ''}`}>
          <AvatarFallback 
            className={`bg-gradient-to-br ${getAvatarGradient(color)} ${
              isAnimating ? 'animate-pulse' : 'animate-pulse-slow duration-[3000ms]'
            }`}
          >
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        <StatusIndicator isAnimating={isAnimating} />
      </div>
    </div>
  );
};

export default AgentAvatar;
