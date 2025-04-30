import React from 'react';
import { motion } from 'framer-motion';

interface ConnectingLinesProps {
  isVisible: boolean;
  animated?: boolean; // Added animated prop
}

const ConnectingLines: React.FC<ConnectingLinesProps> = ({ isVisible, animated = false }) => {
  // Keep existing code and add support for animated prop
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.5, 
      transition: { 
        duration: animated ? 1.5 : 0.5, 
        ease: "easeInOut" 
      }
    }
  };

  return (
    <div className="absolute inset-0 z-0">
      <svg width="100%" height="100%" viewBox="0 0 400 400" style={{ position: 'absolute' }}>
        {/* Diamond shape connecting lines */}
        <motion.path
          d="M 200,100 L 300,200 L 200,300 L 100,200 Z"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={lineVariants}
        />
        
        {/* Connecting lines from center to each point */}
        <motion.path
          d="M 200,200 L 200,100"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={lineVariants}
        />
        <motion.path
          d="M 200,200 L 300,200"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={lineVariants}
        />
        <motion.path
          d="M 200,200 L 200,300"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={lineVariants}
        />
        <motion.path
          d="M 200,200 L 100,200"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={lineVariants}
        />
      </svg>
    </div>
  );
};

export default ConnectingLines;
