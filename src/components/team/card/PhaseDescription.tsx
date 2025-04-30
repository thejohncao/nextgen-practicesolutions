
import React from 'react';

interface PhaseDescriptionProps {
  description?: string;
}

const PhaseDescription = ({ description }: PhaseDescriptionProps) => {
  if (!description) return null;
  
  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      <p className="text-sm text-white/80 italic leading-relaxed">{description}</p>
    </div>
  );
};

export default PhaseDescription;
