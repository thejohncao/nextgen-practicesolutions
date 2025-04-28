
import React from 'react';

interface CrownProps {
  className?: string;
}

const Crown = ({ className = "w-4 h-4" }: CrownProps) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      <path d="M3 16h18v4H3z" />
    </svg>
  );
};

export default Crown;
