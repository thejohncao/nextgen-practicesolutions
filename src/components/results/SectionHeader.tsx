
import React from 'react';

const SectionHeader = () => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient animate-fade-in mb-4">
        Real Results from Your AI Team
      </h2>
      <p className="text-xl text-white/70 max-w-3xl mx-auto animate-fade-in" 
         style={{ animationDelay: '200ms' }}>
        While you focus on patient care, your team delivers measurable wins across your practice.
      </p>
    </div>
  );
};

export default SectionHeader;
