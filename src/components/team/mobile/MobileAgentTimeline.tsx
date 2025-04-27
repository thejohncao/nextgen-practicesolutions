
import React from 'react';
import { Agent } from '@/types/agent';
import { Phase } from '../PhaseData';
import CarouselAgentCard from '../CarouselAgentCard';

interface MobileAgentTimelineProps {
  agents: Agent[];
  phases: Phase[];
  activeIndex: number;
  carouselRef: React.RefObject<HTMLDivElement>;
}

const MobileAgentTimeline = ({ 
  agents, 
  phases, 
  activeIndex, 
  carouselRef 
}: MobileAgentTimelineProps) => {
  return (
    <div className="space-y-24 relative py-12" ref={carouselRef}>
      {/* Vertical Timeline Line */}
      <div 
        className="absolute left-1/2 h-full w-px bg-gradient-to-b from-white/30 via-white/20 to-transparent" 
        style={{ top: '60px' }} 
      />
      
      {agents.map((agent, index) => (
        <div key={agent.name} className="relative carousel-agent-item" data-index={index}>
          {/* Phase Node */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
            <div className={`${phases[index].color} ${phases[index].borderColor} border-2
              w-8 h-8 rounded-full flex items-center justify-center
              ${activeIndex === index ? 'animate-pulse-slow shadow-glow' : ''}`}
            >
              <span className={`text-sm font-bold ${phases[index].textColor}`}>{index + 1}</span>
            </div>
            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
              whitespace-nowrap text-center ${phases[index].textColor} text-sm font-medium`}
            >
              Phase {index + 1}
            </div>
          </div>
          
          <CarouselAgentCard 
            agent={agent} 
            isActive={activeIndex === index}
            phaseDescription={phases[index].story}
            phaseColor={phases[index].color}
          />
        </div>
      ))}
    </div>
  );
};

export default MobileAgentTimeline;
