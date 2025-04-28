
import React, { ReactNode } from 'react';

interface ScrollSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  fullScreen?: boolean;
}

const ScrollSection = ({ 
  children, 
  id, 
  className = "", 
  fullScreen = false 
}: ScrollSectionProps) => {
  return (
    <section 
      id={id}
      className={`relative ${fullScreen ? 'min-h-screen' : ''} scroll-mt-20 ${className}`}
      data-scroll-section
    >
      {children}
      
      {/* Visual indicator for scrolling */}
      <div className="scroll-indicator absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity pointer-events-none">
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1 mb-1">
          <div className="w-1 h-2 bg-current rounded-full animate-bounce-slow"></div>
        </div>
      </div>
    </section>
  );
};

export default ScrollSection;
