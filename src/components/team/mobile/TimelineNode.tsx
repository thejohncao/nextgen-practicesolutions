
import React from 'react';
import { Phase } from '../PhaseData';

interface TimelineNodeProps {
  phase: Phase;
  index: number;
  isActive: boolean;
}

const TimelineNode = ({ phase, index, isActive }: TimelineNodeProps) => {
  return (
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center
        transition-all duration-300 ease-in-out
        ${phase.color} ${phase.borderColor} border-2
        ${isActive ? 'shadow-[0_0_15px_rgba(255,255,255,0.2)]' : ''}
      `}>
        <span className={`text-sm font-bold ${phase.textColor}`}>
          {index + 1}
        </span>
      </div>
      <div className={`
        absolute top-full left-1/2 transform -translate-x-1/2 mt-2
        whitespace-nowrap text-center text-sm font-medium
        transition-colors duration-300
        ${phase.textColor}
      `}>
        Phase {index + 1}
      </div>
    </div>
  );
};

export default TimelineNode;
