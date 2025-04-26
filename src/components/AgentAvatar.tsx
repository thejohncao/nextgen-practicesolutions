
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { agentColors } from '@/types/agent';

interface AgentAvatarProps {
  name: string;
  role: string;
  isActive?: boolean;
}

const AgentAvatar = ({ name, role, isActive = false }: AgentAvatarProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  
  useEffect(() => {
    // Create a random interval to trigger breathing animations
    const animationInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, Math.random() * 5000 + 3000); // Between 3-8 seconds
    
    return () => clearInterval(animationInterval);
  }, []);
  
  useEffect(() => {
    // Trigger ping animation on active state change
    if (isActive) {
      setIsPinging(true);
      setTimeout(() => setIsPinging(false), 200);
    }
  }, [isActive]);
  
  const getAgentGradient = () => {
    const colors = agentColors[name] || agentColors['Miles']; // Default to Miles
    return `from-[${colors.start}] to-[${colors.end}]`;
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
        {/* Outer glow ring with color transition */}
        <div 
          className={`
            absolute inset-0 rounded-full 
            ${isAnimating ? 'animate-pulse' : 'animate-pulse-slow'} 
            ${isPinging ? 'scale-110 opacity-80' : 'opacity-50'} 
            transition-all duration-1000 ease-in-out
            bg-gradient-to-r ${getAgentGradient()} blur-md
          `}
        />
        
        {/* Animated rings */}
        <div 
          className={`
            absolute inset-0 rounded-full 
            ${isAnimating ? 'animate-pulse' : 'animate-pulse-slow'} 
            scale-125 opacity-20 
            transition-all duration-1000 ease-in-out
            bg-gradient-to-r ${getAgentGradient()}
          `} 
        />
        
        <div className={`absolute inset-0 rounded-full ${isAnimating ? 'animate-pulse-glow' : ''}`} />
        
        {/* Fluid motion overlay */}
        <div className={`
          absolute inset-0 rounded-full overflow-hidden 
          ${isAnimating ? 'opacity-70' : 'opacity-30'}
          transition-all duration-1000 ease-in-out
        `}>
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-flow" 
            style={{ animationDuration: isAnimating ? '1.5s' : '3s' }}
          />
        </div>
        
        <Avatar className={`
          w-12 h-12 border-2 border-white/10 relative z-10 
          transition-all duration-300 
          ${isAnimating ? 'scale-105' : ''}
        `}>
          <AvatarFallback 
            className={`
              bg-gradient-to-br ${getAgentGradient()} 
              ${isAnimating ? 'animate-pulse' : 'animate-pulse-slow duration-[3000ms]'}
              transition-all duration-1000 ease-in-out
            `}
          >
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        {/* Status indicator with pulse */}
        <div className={`
          absolute -bottom-1 -right-1 w-3 h-3 
          rounded-full border-2 border-nextgen-dark 
          transition-all duration-300 
          ${isAnimating ? 'scale-125' : ''}
          bg-gradient-to-r ${getAgentGradient()}
        `}>
          <div className={`
            absolute inset-0 rounded-full 
            ${isAnimating ? 'animate-ping' : ''} 
            bg-gradient-to-r ${getAgentGradient()} 
            opacity-75
          `} />
        </div>
      </div>
    </div>
  );
};

export default AgentAvatar;
