
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollDownIndicatorProps {
  isVisible: boolean;
}

const ScrollDownIndicator: React.FC<ScrollDownIndicatorProps> = ({ isVisible }) => {
  return (
    <motion.div 
      className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -10 
      }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-sm text-gray-400 mb-2">Scroll to experience</span>
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="text-white h-6 w-6" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollDownIndicator;
