
import React from 'react';
import { motion } from 'framer-motion';

interface CentralGlowProps {
  isVisible: boolean;
  pulseIntensity?: "low" | "medium" | "high";
}

const CentralGlow: React.FC<CentralGlowProps> = ({ isVisible, pulseIntensity = "medium" }) => {
  // Scale based on intensity
  const getScale = () => {
    switch (pulseIntensity) {
      case 'low': return [1, 1.2, 1];
      case 'high': return [1, 1.5, 1];
      default: return [1, 1.3, 1];
    }
  };
  
  // Duration based on intensity
  const getDuration = () => {
    switch (pulseIntensity) {
      case 'low': return 4;
      case 'high': return 2;
      default: return 3;
    }
  };
  
  // Opacity based on intensity
  const getOpacity = () => {
    switch (pulseIntensity) {
      case 'low': return 0.4;
      case 'high': return 0.8;
      default: return 0.6;
    }
  };
  
  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-nextgen-purple/20 blur-xl"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? getOpacity() : 0,
        scale: isVisible ? getScale()[1] : 0.5
      }}
      transition={{ 
        delay: 1.4, 
        duration: getDuration(),
        repeat: Infinity,
        repeatType: "reverse",
        ease: [0.25, 1, 0.5, 1]
      }}
    />
  );
};

export default CentralGlow;
