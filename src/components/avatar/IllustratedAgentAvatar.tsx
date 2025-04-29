import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarRings from './AvatarRings';
import AvatarOverlay from './AvatarOverlay';
import StatusIndicator from './StatusIndicator';
import { getAvatarGradient } from './getAvatarGradient';

interface IllustratedAgentAvatarProps {
  name: string;
  role: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  imagePath?: string;
  animated?: boolean;
  isTyping?: boolean;
}

const IllustratedAgentAvatar = ({ 
  name, 
  role, 
  color = 'purple', 
  size = 'md', 
  imagePath,
  animated = true,
  isTyping = false
}: IllustratedAgentAvatarProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isTyping) {
      setIsAnimating(true);
      return;
    }
    
    if (!animated) return;
    
    const animationInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 3000);
    }, Math.random() * 3000 + 2000);
    
    return () => clearInterval(animationInterval);
  }, [animated, isTyping]);
  
  const getAnimationDelay = () => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `${(hash % 5) * 100}ms`;
  };
  
  const getInitials = (name: string) => name.charAt(0).toUpperCase();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
  
  return (
    <div 
      className={`flex items-center ${isTyping ? 'animate-pulse-slow' : 'animate-fade-in'} relative`}
      style={{ animationDelay: getAnimationDelay() }}
    >
      <div className="relative">
        <AvatarRings color={color} isAnimating={isAnimating || isTyping} />
        <AvatarOverlay isAnimating={isAnimating || isTyping} />
        
        <Avatar className={`${sizeClasses[size]} border-2 border-white/10 relative z-10 transition-all duration-300 ${(isAnimating || isTyping) ? 'scale-105' : ''}`}>
          {imagePath ? (
            <AvatarImage src={imagePath} alt={`${name} avatar`} className="object-cover" />
          ) : (
            <AvatarFallback 
              className={`bg-gradient-to-br ${getAvatarGradient(color)} ${
                (isAnimating || isTyping) ? 'animate-pulse' : 'animate-pulse-slow'
              }`}
            >
              {getInitials(name)}
            </AvatarFallback>
          )}
        </Avatar>
      </div>
    </div>
  );
};

export default IllustratedAgentAvatar;
