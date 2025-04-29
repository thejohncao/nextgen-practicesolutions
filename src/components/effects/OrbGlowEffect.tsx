
import React from 'react';
import { motion } from 'framer-motion';

interface OrbGlowEffectProps {
  color: string;
  intensity?: "none" | "low" | "medium" | "high";
}

const OrbGlowEffect = ({ color, intensity = "medium" }: OrbGlowEffectProps) => {
  // Get color based on agent color
  const getGlowColor = (baseColor: string): string => {
    switch (baseColor) {
      case 'blue':
        return 'rgba(29, 178, 245, 0.6)';
      case 'green':
        return 'rgba(34, 197, 94, 0.6)';
      case 'purple':
        return 'rgba(168, 85, 247, 0.6)';
      case 'gold':
        return 'rgba(245, 158, 11, 0.6)';
      default:
        return 'rgba(155, 135, 245, 0.6)';
    }
  };

  const glowColor = getGlowColor(color);
  
  // Adjust animation speed and intensity based on intensity prop
  const getIntensityConfig = () => {
    switch (intensity) {
      case 'none':
        return { particles: 0, duration: 0, size: 0 };
      case 'low':
        return { particles: 4, duration: 3, size: 2 };
      case 'medium':
        return { particles: 8, duration: 2, size: 3 };
      case 'high':
        return { particles: 12, duration: 1.5, size: 4 };
      default:
        return { particles: 8, duration: 2, size: 3 };
    }
  };
  
  const { particles, duration, size } = getIntensityConfig();
  
  // No rendering if intensity is none
  if (intensity === "none") return null;
  
  return (
    <div className="absolute inset-[-20px] pointer-events-none">
      {/* Create particles in a circle around the orb */}
      {[...Array(particles)].map((_, i) => {
        // Calculate particle position in a circle
        const angle = (i / particles) * Math.PI * 2;
        const x = Math.cos(angle) * 100;
        const y = Math.sin(angle) * 100;
        
        // Randomize some properties for organic feel
        const particleSize = Math.max(1, size + Math.random() * 2);
        const particleDuration = duration + Math.random() * 2;
        const particleDelay = Math.random() * 2;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ 
              backgroundColor: glowColor,
              width: `${particleSize}px`,
              height: `${particleSize}px`,
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              filter: 'blur(1px)'
            }}
            animate={{
              x: [0, x * 0.2, 0],
              y: [0, y * 0.2, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: particleDuration,
              repeat: Infinity,
              delay: particleDelay,
              ease: "easeInOut"
            }}
          />
        );
      })}
      
      {/* Central glow pulse */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ 
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [0.8, 1.1, 0.8]
        }}
        transition={{
          duration: duration * 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default OrbGlowEffect;
