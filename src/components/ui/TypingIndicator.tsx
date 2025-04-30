
import React from 'react';

export interface TypingIndicatorProps {
  agent: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ agent }) => {
  // Function to get agent-specific colors
  const getAgentColor = (name: string) => {
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
