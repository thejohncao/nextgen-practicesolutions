
import React from 'react';
import { getAvatarGradient } from './getAvatarGradient';

interface AvatarRingsProps {
  color: string;
  isAnimating: boolean;
}

const AvatarRings = ({ color, isAnimating }: AvatarRingsProps) => {
  const gradientClass = getAvatarGradient(color);
  
  return (
    <>
      {/* Outer glow ring */}
      <div 
        className={`absolute inset-0 rounded-full ${
          isAnimating ? 'animate-pulse' : 'animate-pulse-slow'
        } opacity-50 bg-gradient-to-r ${gradientClass} blur-md`} 
      />
      
      {/* Animated rings */}
      <div 
        className={`absolute inset-0 rounded-full ${
          isAnimating ? 'animate-pulse' : 'animate-pulse-slow'
        } scale-125 opacity-20 bg-gradient-to-r ${gradientClass}`} 
      />
      <div 
        className={`absolute inset-0 rounded-full ${
          isAnimating ? 'animate-pulse-glow' : ''
        }`} 
      />
    </>
  );
};

export default AvatarRings;
