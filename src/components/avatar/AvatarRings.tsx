
import React from 'react';
import { getAvatarGradient } from './getAvatarGradient';

interface AvatarRingsProps {
  color: string;
  isAnimating: boolean;
}

const AvatarRings = ({ color, isAnimating }: AvatarRingsProps) => {
  const gradientClass = getAvatarGradient(color);
  
  // Map colors to the CSS variables
  const getAgentColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'var(--miles-color-rgb)';
      case 'green': return 'var(--giselle-color-rgb)';
      case 'blue': return 'var(--miles-color-rgb)';
      case 'purple': return 'var(--devon-color-rgb)';
      case 'gold': return 'var(--alma-color-rgb)';
      default: return '155, 135, 245';
    }
  };
  
  const agentColorRGB = getAgentColorClass(color);
  
  return (
    <>
      {/* Outer glow ring */}
      <div 
        className={`absolute inset-[-4px] rounded-full ${
          isAnimating ? 'animate-pulse' : 'animate-hero-glow'
        } opacity-60 bg-gradient-to-r ${gradientClass} blur-md bg-transparent`}
        style={{ 
          '--agent-color-rgb': agentColorRGB,
          animationDuration: isAnimating ? '2.5s' : '4s'
        } as React.CSSProperties}
      />
      
      {/* Inner pulse ring */}
      <div 
        className={`absolute inset-0 rounded-full ${
          isAnimating ? 'animate-pulse' : 'animate-pulse-slow'
        } scale-110 opacity-40 bg-gradient-to-r ${gradientClass} bg-transparent`}
        style={{ 
          animationDuration: isAnimating ? '2s' : '3s',
          '--agent-color-rgb': agentColorRGB 
        } as React.CSSProperties}
      />
      
      {/* Additional outer pulse ring for enhanced glow */}
      <div 
        className={`absolute inset-[-8px] rounded-full opacity-20 bg-gradient-to-r ${gradientClass} animate-pulse-glow bg-transparent`}
        style={{ 
          animationDuration: '4s',
          '--agent-color-rgb': agentColorRGB 
        } as React.CSSProperties}
      />
    </>
  );
};

export default AvatarRings;
