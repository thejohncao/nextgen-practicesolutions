
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AgentAvatarProps {
  name: string;
  role: string;
  color?: string;
}

const AgentAvatar = ({ name, role, color = 'purple' }: AgentAvatarProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Create a random interval to trigger animations
    const animationInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, Math.random() * 5000 + 3000); // Between 3-8 seconds
    
    return () => clearInterval(animationInterval);
  }, []);
  
  const getGradientClass = () => {
    switch(color) {
      case 'red': return 'from-red-500 to-red-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      case 'gold': return 'from-amber-500 to-amber-600';
      default: return 'from-purple-500 to-purple-600';
    }
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
        <div className={`absolute inset-0 rounded-full ${isAnimating ? 'animate-pulse' : 'animate-pulse-slow'} opacity-50 bg-gradient-to-r ${getGradientClass()} blur-md`} />
        
        {/* Animated rings */}
        <div className={`absolute inset-0 rounded-full ${isAnimating ? 'animate-pulse' : 'animate-pulse-slow'} scale-125 opacity-20 bg-gradient-to-r ${getGradientClass()}`} />
        <div className={`absolute inset-0 rounded-full ${isAnimating ? 'animate-pulse-glow' : ''}`} />
        
        {/* Fluid motion overlay */}
        <div className={`absolute inset-0 rounded-full overflow-hidden ${isAnimating ? 'opacity-70' : 'opacity-30'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-flow" style={{ animationDuration: isAnimating ? '1.5s' : '3s' }}></div>
        </div>
        
        <Avatar className={`w-12 h-12 border-2 border-white/10 relative z-10 transition-all duration-300 ${isAnimating ? 'scale-105' : ''}`}>
          <AvatarFallback className={`bg-gradient-to-br ${getGradientClass()} ${isAnimating ? 'animate-pulse' : 'animate-pulse-slow duration-[3000ms]'}`}>
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        {/* Status indicator with pulse */}
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-nextgen-dark transition-all duration-300 ${isAnimating ? 'scale-125' : ''}`}>
          <div className={`absolute inset-0 rounded-full ${isAnimating ? 'animate-ping' : ''} bg-green-500 opacity-75`} />
        </div>
      </div>
    </div>
  );
};

export default AgentAvatar;
