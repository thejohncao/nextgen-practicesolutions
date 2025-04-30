
import React from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">{title}</h2>
      <p className="text-lg text-nextgen-dark/70 dark:text-white/70 max-w-3xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;
