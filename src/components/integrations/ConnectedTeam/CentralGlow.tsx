
import React from 'react';
import { motion } from 'framer-motion';

interface CentralGlowProps {
  isVisible: boolean;
}

const CentralGlow: React.FC<CentralGlowProps> = ({ isVisible }) => {
  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-nextgen-purple/20 blur-xl"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 0.6 : 0,
        scale: isVisible ? 1 : 0.5
      }}
      transition={{ delay: 1.4, duration: 1 }}
    />
  );
};

export default CentralGlow;
