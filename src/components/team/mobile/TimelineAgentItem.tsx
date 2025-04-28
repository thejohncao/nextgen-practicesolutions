
import React from 'react';
import { Agent } from '@/types/agent';
import { Phase } from '../PhaseData';
import AgentOrb from '../agent/AgentOrb';
import CarouselAgentCard from '../CarouselAgentCard';
import TimelineNode from './TimelineNode';
import { getTooltipText } from '../utils/getTooltipText';

interface TimelineAgentItemProps {
  agent: Agent;
  phase: Phase;
  index: number;
  isActive: boolean;
}

const TimelineAgentItem = ({
  agent,
  phase,
  index,
  isActive,
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
          role={agent.title}
          color={agent.color}
          tooltipText={getTooltipText(agent.name)}
          isActive={isActive}
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

export default TimelineAgentItem;
