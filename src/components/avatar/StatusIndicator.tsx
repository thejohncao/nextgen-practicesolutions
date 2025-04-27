
import React from 'react';

interface StatusIndicatorProps {
  isAnimating: boolean;
}

const StatusIndicator = ({ isAnimating }: StatusIndicatorProps) => {
  return (
    <div className={`absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-nextgen-dark transition-all duration-300 ${isAnimating ? 'scale-125' : ''}`}>
      <div className={`absolute inset-0 rounded-full ${isAnimating ? 'animate-ping' : ''} bg-green-500 opacity-75`} />
    </div>
  );
};

export default StatusIndicator;
