import React, { useState, useEffect } from 'react';

export interface TypingIndicatorProps {
  agent?: string;
  text?: string;
  speed?: number;
  onComplete?: () => void;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
  agent,
  text,
  speed = 50,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Function to get agent-specific colors
  const getAgentColor = (name?: string) => {
    if (!name) return 'bg-white';
    
    switch (name.toLowerCase()) {
      case 'miles':
        return 'bg-blue-400';
      case 'giselle':
        return 'bg-green-400';
      case 'devon':
        return 'bg-purple-400';
      case 'alma':
        return 'bg-amber-400';
      default:
        return 'bg-white';
    }
  };
  
  const dotColor = getAgentColor(agent);
  
  // Text typing animation effect
  useEffect(() => {
    if (!text) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      // Animation is complete
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);
  
  // If text prop is provided, show the typing animation
  if (text) {
    return <span>{displayedText}</span>;
  }
  
  // Otherwise show the bouncing dots
  return (
    <div className="flex items-center">
      <div className="flex space-x-1">
        <div className={`${dotColor} h-1.5 w-1.5 rounded-full animate-typing-dot-1`}></div>
        <div className={`${dotColor} h-1.5 w-1.5 rounded-full animate-typing-dot-2`}></div>
        <div className={`${dotColor} h-1.5 w-1.5 rounded-full animate-typing-dot-3`}></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
