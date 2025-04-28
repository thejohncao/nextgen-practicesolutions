
import React from 'react';

interface OrbInnerEffectsProps {
  color: string;
  isActive: boolean;
}

const OrbInnerEffects = ({ color, isActive }: OrbInnerEffectsProps) => {
  // Map color names to gradient values
  const getGradientColors = (baseColor: string) => {
    switch (baseColor) {
      case 'blue':
        return {
          center: 'rgba(29, 178, 245, 0.15)',
          edge: 'rgba(15, 160, 206, 0.05)'
        };
      case 'green':
        return {
          center: 'rgba(34, 197, 94, 0.15)',
          edge: 'rgba(21, 128, 61, 0.05)'
        };
      case 'purple':
        return {
          center: 'rgba(168, 85, 247, 0.15)',
          edge: 'rgba(126, 34, 206, 0.05)'
        };
      case 'gold':
        return {
          center: 'rgba(245, 158, 11, 0.15)',
          edge: 'rgba(217, 119, 6, 0.05)'
        };
      default:
        return {
          center: 'rgba(155, 135, 245, 0.15)',
          edge: 'rgba(124, 108, 196, 0.05)'
        };
    }
  };

  const { center, edge } = getGradientColors(color);

  return (
    <div className="absolute inset-0 rounded-full overflow-hidden">
      {/* Radial gradient core */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-60'
        }`}
        style={{
          background: `radial-gradient(circle at center, ${center} 0%, ${edge} 70%, transparent 100%)`
        }}
      />
      
      {/* Subtle pulse effect */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          isActive ? 'opacity-40' : 'opacity-20'
        }`}
        style={{
          background: `radial-gradient(circle at center, ${center} 0%, transparent 70%)`,
          animation: 'pulse 3s ease-in-out infinite'
        }}
      />
    </div>
  );
};

export default OrbInnerEffects;
