
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarRings from './AvatarRings';
import AvatarOverlay from './AvatarOverlay';
import StatusIndicator from './StatusIndicator';
import { getAvatarGradient } from './getAvatarGradient';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';

interface IllustratedAgentAvatarProps {
  name: string;
  role: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  imagePath?: string;
  animated?: boolean;
  isTyping?: boolean;
  isPrimary?: boolean;
  displayMode?: 'initial' | 'fullName';
  showLabel?: boolean;
  isCompactView?: boolean;
}

const IllustratedAgentAvatar = ({ 
  name, 
  role, 
  color = 'purple', 
  size = 'md', 
  imagePath,
  animated = true,
  isTyping = false,
  isPrimary = false,
  displayMode = 'initial', // Default to initial now
  showLabel = false,
  isCompactView = false
}: IllustratedAgentAvatarProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();
  
  // Always use initial display mode by default, override only when explicitly hovering or directed
  const effectiveDisplayMode = isHovering ? 'fullName' : 'initial';
  
  // If showLabel is false, name should not show regardless of hover
  const shouldShowName = showLabel && (isHovering || displayMode === 'fullName');
  
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
  const getFullName = (name: string) => name;
  
  const displayText = effectiveDisplayMode === 'initial' ? getInitials(name) : getFullName(name);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
  
  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  const orbClass = `orb ${isPrimary ? 'orb-primary' : 'orb-secondary'} ${isInView ? 'in-view' : ''} bg-transparent`;
  
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovering(false);
    }
  };
  
  const handleTap = () => {
    if (isMobile) {
      setIsHovering(prev => !prev);
    }
  };
  
  const avatarContent = (
    <div 
      className={`flex items-center ${isTyping ? 'animate-pulse-slow' : 'animate-fade-in'} relative avatar-${name.toLowerCase()} bg-transparent`}
      style={{ animationDelay: getAnimationDelay() }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
    >
      <div className={`relative ${orbClass} rounded-full bg-transparent overflow-visible`}>
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
      
      {/* Display label with animation when hovering or when explicitly set to show label */}
      {shouldShowName && (
        <div className="flex flex-col items-center mt-2">
          <span 
            className={`text-white font-semibold ${labelSizeClasses[size]} transition-all duration-150 ease-in-out animate-fade-in`}
          >
            {getFullName(name)}
          </span>
        </div>
      )}
    </div>
  );
  
  // Wrap with tooltip if not showing label and not on mobile
  if (!shouldShowName && !isMobile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {avatarContent}
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-black/80 text-white text-sm py-2 px-3">
          {name} – {role}
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return avatarContent;
};

export default IllustratedAgentAvatar;
