
import React from 'react';
import { motion } from 'framer-motion';

interface CentralGlowProps {
  isVisible: boolean;
  pulseIntensity?: "low" | "medium" | "high";
}

const CentralGlow: React.FC<CentralGlowProps> = ({ isVisible, pulseIntensity = "medium" }) => {
  // Determine animation based on intensity
  const getPulseConfig = () => {
    switch (pulseIntensity) {
      case "low":
        return { scale: [1, 1.05, 1], duration: 4 };
      case "high":
        return { scale: [1, 1.2, 1], duration: 2 };
      case "medium":
      default:
        return { scale: [1, 1.1, 1], duration: 3 };
    }
  };

  const { scale, duration } = getPulseConfig();

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-radial from-white/20 to-transparent z-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { 
        opacity: 1, 
        scale: scale,
        transition: { 
          opacity: { duration: 1 },
          scale: { duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }
      } : { opacity: 0, scale: 0.8 }}
    />
  );
};

export default CentralGlow;
