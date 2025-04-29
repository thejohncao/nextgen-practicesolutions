
import React from 'react';
import { motion } from 'framer-motion';

interface OrbGlowEffectProps {
  color: string;
  intensity?: 'low' | 'medium' | 'high';
}

const getColorValues = (color: string) => {
  switch (color) {
    case 'purple':
      return 'rgba(139, 92, 246, 0.6)';
    case 'blue':
      return 'rgba(14, 165, 233, 0.6)';
    case 'green':
      return 'rgba(34, 197, 94, 0.6)';
    case 'gold':
      return 'rgba(234, 179, 8, 0.6)';
    default:
      return 'rgba(155, 135, 245, 0.6)';
  }
};

const OrbGlowEffect: React.FC<OrbGlowEffectProps> = ({ color, intensity = 'medium' }) => {
  const glowColor = getColorValues(color);
  
  // Scale based on intensity
  const getScale = () => {
    switch (intensity) {
      case 'low': return [1, 1.2, 1];
      case 'high': return [1, 1.5, 1];
      default: return [1, 1.3, 1];
    }
  };
  
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Inner glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: glowColor, opacity: 0 }}
        animate={{ 
          opacity: [0, 0.6, 0],
          scale: getScale()
        }}
        transition={{ 
          duration: 1.5,
          ease: [0.25, 1, 0.5, 1],
          repeat: 0
        }}
      />
      
      {/* Orbiting particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{ 
            top: '50%', 
            left: '50%',
            opacity: 0
          }}
          animate={{ 
            opacity: [0, 0.8, 0],
            x: [0, Math.cos(i * Math.PI / 4) * 30],
            y: [0, Math.sin(i * Math.PI / 4) * 30]
          }}
          transition={{ 
            duration: 1 + (i % 3) * 0.2,
            delay: i * 0.05,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default OrbGlowEffect;
