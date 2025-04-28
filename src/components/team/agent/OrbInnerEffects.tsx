
import React from 'react';

interface OrbInnerEffectsProps {
  color: string;
  isActive: boolean;
}

const OrbInnerEffects = ({ color, isActive }: OrbInnerEffectsProps) => {
  // Map color names to gradient values with increased opacity and saturation
  const getGradientColors = (baseColor: string) => {
    switch (baseColor) {
      case 'blue':
        return {
          center: 'rgba(29, 178, 245, 0.35)',
          edge: 'rgba(15, 160, 206, 0.15)',
          glow: 'rgba(29, 178, 245, 0.25)'
        };
      case 'green':
        return {
          center: 'rgba(34, 197, 94, 0.35)',
          edge: 'rgba(21, 128, 61, 0.15)',
          glow: 'rgba(34, 197, 94, 0.25)'
        };
      case 'purple':
        return {
          center: 'rgba(168, 85, 247, 0.35)',
          edge: 'rgba(126, 34, 206, 0.15)',
          glow: 'rgba(168, 85, 247, 0.25)'
        };
      case 'gold':
        return {
          center: 'rgba(245, 158, 11, 0.35)',
          edge: 'rgba(217, 119, 6, 0.15)',
          glow: 'rgba(245, 158, 11, 0.25)'
        };
      default:
        return {
          center: 'rgba(155, 135, 245, 0.35)',
          edge: 'rgba(124, 108, 196, 0.15)',
          glow: 'rgba(155, 135, 245, 0.25)'
        };
    }
  };

  const { center, edge, glow } = getGradientColors(color);

  return (
    <div className="absolute inset-0 rounded-full overflow-hidden">
      {/* Enhanced radial gradient core with higher opacity */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-80'
        }`}
        style={{
          background: `radial-gradient(circle at center, ${center} 0%, ${edge} 60%, transparent 100%)`
        }}
      />
      
      {/* Improved pulse effect with rotation */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          isActive ? 'opacity-60' : 'opacity-40'
        }`}
        style={{
          background: `radial-gradient(circle at center, ${glow} 0%, transparent 70%)`,
          animation: isActive ? 
            'pulse 2.5s ease-in-out infinite, rotate 8s linear infinite' : 
            'pulse 4s ease-in-out infinite'
        }}
      />

      {/* Additional subtle glow layer */}
      <div 
        className={`absolute inset-[-2px] rounded-full transition-opacity duration-300 ${
          isActive ? 'opacity-40' : 'opacity-20'
        }`}
        style={{
          background: `radial-gradient(circle at center, ${glow} 0%, transparent 100%)`,
          filter: 'blur(2px)'
        }}
      />
    </div>
  );
};

export default OrbInnerEffects;
