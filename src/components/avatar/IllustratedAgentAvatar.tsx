
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
  isPrimary?: boolean;
}

const IllustratedAgentAvatar = ({ 
  name, 
  role, 
  color = 'purple', 
  size = 'md', 
  imagePath,
  animated = true,
  isTyping = false,
  isPrimary = false
}: IllustratedAgentAvatarProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
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
  
  useEffect(() => {
    // Setup intersection observer for in-view detection
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );
    
    // Find the avatar container element
    const element = document.querySelector(`.avatar-${name.toLowerCase()}`);
    if (element) {
      observer.observe(element);
    }
    
    return () => observer.disconnect();
  }, [name]);
  
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
  
  const orbClass = `orb ${isPrimary ? 'orb-primary' : 'orb-secondary'} ${isInView ? 'in-view' : ''}`;
  
  return (
    <div 
      className={`flex items-center ${isTyping ? 'animate-pulse-slow' : 'animate-fade-in'} relative avatar-${name.toLowerCase()} bg-transparent`}
      style={{ animationDelay: getAnimationDelay() }}
    >
      <div className={`relative ${orbClass} bg-transparent`}>
        <AvatarRings color={color} isAnimating={isAnimating || isTyping || isPrimary} />
        <AvatarOverlay isAnimating={isAnimating || isTyping || isPrimary} />
        
        <Avatar className={`${sizeClasses[size]} border-2 border-white/10 relative z-10 transition-all duration-300 ${(isAnimating || isTyping || isPrimary) ? 'scale-105' : ''} bg-transparent`}>
          {imagePath ? (
            <AvatarImage src={imagePath} alt={`${name} avatar`} className="object-cover" />
          ) : (
            <AvatarFallback 
              className={`bg-gradient-to-br ${getAvatarGradient(color)} ${
                (isAnimating || isTyping || isPrimary) ? 'animate-pulse' : 'animate-pulse-slow'
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
