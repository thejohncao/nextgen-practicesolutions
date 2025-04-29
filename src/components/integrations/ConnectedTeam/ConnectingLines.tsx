
import React from 'react';
import { motion } from 'framer-motion';

interface ConnectingLinesProps {
  isVisible: boolean;
}

const ConnectingLines: React.FC<ConnectingLinesProps> = ({ isVisible }) => {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: isVisible ? 0.3 : 0 }}>
      <motion.line 
        x1="35%" y1="15%" x2="65%" y2="15%" 
        stroke="white" strokeWidth="1" strokeDasharray="5,5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? 0.5 : 0 }}
        transition={{ delay: 0.2, duration: 1.5 }}
      />
      <motion.line 
        x1="75%" y1="25%" x2="75%" y2="65%" 
        stroke="white" strokeWidth="1" strokeDasharray="5,5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? 0.5 : 0 }}
        transition={{ delay: 0.4, duration: 1.5 }}
      />
      <motion.line 
        x1="65%" y1="75%" x2="35%" y2="75%" 
        stroke="white" strokeWidth="1" strokeDasharray="5,5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? 0.5 : 0 }}
        transition={{ delay: 0.6, duration: 1.5 }}
      />
      <motion.line 
        x1="25%" y1="65%" x2="25%" y2="25%" 
        stroke="white" strokeWidth="1" strokeDasharray="5,5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? 0.5 : 0 }}
        transition={{ delay: 0.8, duration: 1.5 }}
      />
      
      {/* Diagonal lines connecting the diamond */}
      <motion.line 
        x1="35%" y1="15%" x2="75%" y2="65%" 
        stroke="white" strokeWidth="1" strokeDasharray="5,5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? 0.5 : 0 }}
        transition={{ delay: 1.0, duration: 1.5 }}
      />
      <motion.line 
        x1="65%" y1="15%" x2="25%" y2="65%" 
        stroke="white" strokeWidth="1" strokeDasharray="5,5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? 0.5 : 0 }}
        transition={{ delay: 1.2, duration: 1.5 }}
      />
    </svg>
  );
};

export default ConnectingLines;
