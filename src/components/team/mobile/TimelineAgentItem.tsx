
import React from 'react';
import { Agent } from '@/types/agent';
import { Phase } from '../PhaseData';
import AgentOrb from '../agent/AgentOrb';
import CarouselAgentCard from '../CarouselAgentCard';
import TimelineNode from './TimelineNode';

interface TimelineAgentItemProps {
  agent: Agent;
  phase: Phase;
  index: number;
  isActive: boolean;
  onSelect?: (index: number) => void;
}

const TimelineAgentItem = ({
  agent,
  phase,
  index,
  isActive,
  onSelect,
}: TimelineAgentItemProps) => {
  return (
    <div 
      className="relative carousel-agent-item"
      data-index={index}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        animation: `fadeInUp 0.7s ease-out forwards ${index * 0.1}s`
      }}
    >
      <TimelineNode phase={phase} index={index} isActive={isActive} />
      
      <div className="flex flex-col items-center gap-6">
        <AgentOrb
          name={agent.name}
          role={getDepartmentTitle(agent.name)}
          color={agent.color}
          isActive={isActive}
          onClick={() => onSelect?.(index)}
          animate={isActive}
        />
        <CarouselAgentCard 
          agent={agent} 
          isActive={isActive}
          phaseDescription={phase.story}
          phaseColor={phase.color}
        />
      </div>
    </div>
  );
};

// Updated department titles
const getDepartmentTitle = (name: string): string => {
  switch (name.toLowerCase()) {
    case 'miles':
      return 'Practice Management';
    case 'giselle':
      return 'Practice Growth';
    case 'devon':
      return 'Practice Development';
    case 'alma':
      return 'Practice Mastery';
    default:
      return 'Practice Management';
  }
};

export default TimelineAgentItem;
