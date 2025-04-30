
import React from 'react';

interface TypingIndicatorProps {
  agent: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ agent }) => {
  const getAgentColor = (agentName: string): string => {
    switch (agentName.toLowerCase()) {
      case 'giselle': return 'bg-green-500/70';
      case 'devon': return 'bg-purple-500/70';
      case 'alma': return 'bg-amber-500/70';
      case 'miles': 
      default: return 'bg-blue-500/70';
    }
  };

  const dotColor = getAgentColor(agent);

  return (
    <div className="flex space-x-1 items-center my-2 ml-2">
      <div className={`w-2 h-2 rounded-full ${dotColor} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
      <div className={`w-2 h-2 rounded-full ${dotColor} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
      <div className={`w-2 h-2 rounded-full ${dotColor} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};

export default TypingIndicator;
