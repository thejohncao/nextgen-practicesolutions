
import React from 'react';

interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title = "Lead Your Practice Like a CEO",
  subtitle = "Stop managing tasks. Start commanding your AI executive team — and run your practice like a Fortune 500 company."
}) => {
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
