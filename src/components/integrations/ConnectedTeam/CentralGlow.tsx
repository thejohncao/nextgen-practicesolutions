
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
  
  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-nextgen-purple/20 blur-xl"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 0.6 : 0,
        scale: isVisible ? getScale()[1] : 0.5
      }}
      transition={{ 
        delay: 1.4, 
        duration: 1,
        repeat: pulseIntensity !== "low" ? Infinity : 0,
        repeatType: "reverse"
      }}
    />
  );
};

export default CentralGlow;
