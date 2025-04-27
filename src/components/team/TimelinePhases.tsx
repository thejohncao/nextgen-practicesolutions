
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
        <div className="absolute h-1 bg-gradient-to-r from-white/10 via-white/30 to-white/10 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"></div>
        
        {/* Timeline phases */}
        {phases.map((phase, index) => (
          <div 
            key={phase.agent} 
            className="relative flex flex-col items-center z-10"
            onClick={() => onPhaseClick(index)}
          >
            <div 
              className={`w-12 h-12 rounded-full ${activeIndex === index ? phase.color : 'bg-white/5'} 
                border transition-all duration-300 ${activeIndex === index ? phase.borderColor : 'border-white/10'} 
                flex items-center justify-center mb-2 cursor-pointer
                ${activeIndex === index ? 'animate-pulse-slow shadow-glow' : ''}`}
            >
              <span className={`text-xl font-bold ${activeIndex === index ? phase.textColor : 'text-white/70'}`}>{index + 1}</span>
            </div>
            <div className="text-center w-28">
              <span className={`text-sm font-medium ${activeIndex === index ? 'text-white' : 'text-white/70'}`}>
                {phase.title.split(':')[1]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelinePhases;

