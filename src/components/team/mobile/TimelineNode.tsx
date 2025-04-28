
import React from 'react';
import { Phase } from '../PhaseData';

interface TimelineNodeProps {
  phase: Phase;
  index: number;
  isActive: boolean;
}

const TimelineNode = ({ phase, index, isActive }: TimelineNodeProps) => {
  return (
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
      <div className={`
        w-6 h-6 rounded-full flex items-center justify-center
        transition-all duration-300 ease-in-out
        ${isActive ? phase.color : 'bg-white/5'} 
        ${isActive ? phase.borderColor : 'border-white/10'} border
        ${isActive ? 'shadow-[0_0_10px_rgba(255,255,255,0.1)]' : ''}
      `}>
        <span className={`text-xs font-medium ${isActive ? phase.textColor : 'text-white/60'}`}>
          {index + 1}
        </span>
      </div>
    </div>
  );
};

export default TimelineNode;
