
import React from 'react';
import { Phase } from './PhaseData';
import { useIsMobile } from '@/hooks/use-mobile';

interface TimelinePhasesProps {
  phases: Phase[];
  activeIndex: number;
  onPhaseClick: (index: number) => void;
}

const TimelinePhases = ({ phases, activeIndex, onPhaseClick }: TimelinePhasesProps) => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
      <div className="relative hidden sm:flex items-center justify-between">
        {/* Horizontal Connector Line */}
        <div className="absolute h-1 bg-gradient-to-r from-white/10 via-white/30 to-white/10 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0" />
        
        {phases.map((phase, index) => (
          <div 
            key={phase.agent}
            className="relative flex flex-col items-center z-10 cursor-pointer"
            onClick={() => onPhaseClick(index)}
          >
            <div 
              className={`
                w-12 h-12 rounded-full border
                transition-all duration-300 ease-in-out
                flex items-center justify-center mb-2
                hover:scale-105
                ${activeIndex === index ? phase.color : 'bg-white/5'}
                ${activeIndex === index ? phase.borderColor : 'border-white/10'}
                ${activeIndex === index ? 'shadow-[0_0_15px_rgba(255,255,255,0.2)]' : ''}
              `}
            >
              <span 
                className={`
                  text-xl font-bold transition-colors duration-300
                  ${activeIndex === index ? phase.textColor : 'text-white/70'}
                `}
              >
                {index + 1}
              </span>
            </div>
            <div className="text-center w-28">
              <span className={`
                text-sm font-medium transition-colors duration-300
                ${activeIndex === index ? 'text-white' : 'text-white/70'}
              `}>
                {phase.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelinePhases;
