
import React from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient animate-fade-in mb-4">
        {title}
      </h2>
      <p className="text-xl text-white/70 max-w-3xl mx-auto animate-fade-in" 
         style={{ animationDelay: '200ms' }}>
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;
