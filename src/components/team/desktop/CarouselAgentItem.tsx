
import React from 'react';
import { Agent } from '@/types/agent';
import AgentOrb from '../agent/AgentOrb';
import CarouselAgentCard from '../CarouselAgentCard';

interface CarouselAgentItemProps {
  agent: Agent;
  index: number;
  isActive: boolean;
  phaseDescription: string;
  phaseColor: string;
  onSelect: () => void;
}

const CarouselAgentItem = ({
  agent,
  index,
  isActive,
  phaseDescription,
  phaseColor,
  onSelect,
}: CarouselAgentItemProps) => {
  return (
    <div 
      className="p-2 relative carousel-agent-item" 
      data-index={index}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        animation: `fadeInUp 0.7s ease-out forwards ${index * 0.1}s`
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <AgentOrb
          name={agent.name}
          role={agent.title}
          color={agent.color}
          isActive={isActive}
          onClick={onSelect}
          animate={isActive}
        />
        <CarouselAgentCard 
          agent={agent} 
          isActive={isActive}
          phaseDescription={phaseDescription}
          phaseColor={phaseColor}
        />
      </div>
    </div>
  );
};

export default CarouselAgentItem;
