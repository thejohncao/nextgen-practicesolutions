
import React from 'react';
import { motion } from 'framer-motion';

interface ConnectingLinesProps {
  isVisible: boolean;
  animated?: boolean;
  lineColor?: string;
}

const ConnectingLines: React.FC<ConnectingLinesProps> = ({ 
  isVisible, 
  animated = false,
  lineColor = "rgba(155, 135, 245, 0.3)" 
}) => {
  // Diamond-shaped connection points 
  const lines = [
    { x1: "25%", y1: "25%", x2: "75%", y2: "25%" }, // Top horizontal
    { x1: "75%", y1: "25%", x2: "75%", y2: "75%" }, // Right vertical
    { x1: "75%", y1: "75%", x2: "25%", y2: "75%" }, // Bottom horizontal
    { x1: "25%", y1: "75%", x2: "25%", y2: "25%" }, // Left vertical
    { x1: "25%", y1: "25%", x2: "75%", y2: "75%" }, // Diagonal top-left to bottom-right
    { x1: "75%", y1: "25%", x2: "25%", y2: "75%" }, // Diagonal top-right to bottom-left
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full">
        {lines.map((line, i) => {
          const delay = i * 0.2 + 0.5; // Staggered animation for line drawing
          
          return animated ? (
            <motion.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={lineColor}
              strokeWidth="1"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: isVisible ? 1 : 0, 
                opacity: isVisible ? 1 : 0 
              }}
              transition={{ 
                duration: 1.5, 
                ease: [0.25, 1, 0.5, 1],
                delay 
              }}
            />
          ) : (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={lineColor}
              strokeWidth="1"
              strokeDasharray="5,5"
              style={{ 
                opacity: isVisible ? 0.8 : 0,
                transition: 'opacity 0.5s ease'
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default ConnectingLines;
