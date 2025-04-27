
import React from 'react';

interface PhaseDescriptionProps {
  description: string;
}

const PhaseDescription = ({ description }: PhaseDescriptionProps) => {
  if (!description) return null;
  
  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      <p className="text-sm italic text-white/80">
        "{description}"
      </p>
    </div>
  );
};

export default PhaseDescription;
