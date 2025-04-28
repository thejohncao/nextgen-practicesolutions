
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
        className={`absolute inset-[-4px] rounded-full ${
          isAnimating ? 'animate-pulse' : 'animate-pulse-slow'
        } opacity-60 bg-gradient-to-r ${gradientClass} blur-md`} 
      />
      
      {/* Inner pulse ring */}
      <div 
        className={`absolute inset-0 rounded-full ${
          isAnimating ? 'animate-pulse' : 'animate-pulse-slow'
        } scale-110 opacity-40 bg-gradient-to-r ${gradientClass}`}
        style={{ animationDuration: isAnimating ? '2s' : '3s' }}
      />
      
      {/* Additional outer pulse ring for enhanced glow */}
      <div 
        className={`absolute inset-[-8px] rounded-full opacity-20 bg-gradient-to-r ${gradientClass} animate-pulse-glow`}
        style={{ animationDuration: '4s' }}
      />
    </>
  );
};

export default AvatarRings;
