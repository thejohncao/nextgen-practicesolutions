
import React from 'react';
import { Agent } from '@/types/agent';
import { Phase } from '../PhaseData';
import TimelineAgentItem from './TimelineAgentItem';

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
        <TimelineAgentItem
          key={agent.name}
          agent={agent}
          phase={phases[index]}
          index={index}
          isActive={activeIndex === index}
        />
      ))}
    </div>
  );
};

export default MobileAgentTimeline;
