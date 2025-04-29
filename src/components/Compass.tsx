
import React from 'react';

interface CompassProps {
  className?: string;
  spinning?: boolean;
}

const Compass = ({ className = "w-8 h-8", spinning = true }: CompassProps) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={`${className} ${spinning ? 'animate-spin-slow' : ''}`}
      style={{ animationDuration: spinning ? '8s' : '0s' }}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
};

export default Compass;
