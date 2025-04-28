
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface CTABridgeProps {
  targetSectionId: string;
}

const CTABridge = ({ targetSectionId }: CTABridgeProps) => {
  const scrollToSection = () => {
    const section = document.getElementById(targetSectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="text-center py-16 space-y-6 animate-fade-in">
      <p className="text-xl sm:text-2xl text-white/90 px-4 max-w-3xl mx-auto">
        See how your AI team works together to grow, automate, and scale your practice.
      </p>
      
      <button 
        onClick={scrollToSection}
        className="group inline-flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
        aria-label="Scroll to next section"
      >
        <ChevronDown 
          className="w-8 h-8 text-white/60 animate-bounce"
          strokeWidth={1.5}
        />
      </button>
    </div>
  );
};

export default CTABridge;
