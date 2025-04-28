
import React from 'react';
import { Agent } from '@/types/agent';
import { Phase } from '../PhaseData';
import AgentOrb from '../agent/AgentOrb';
import TimelineNode from './TimelineNode';
import { getTooltipText } from '../utils/getTooltipText';

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
  const handleOrbClick = () => {
    onSelect?.(index);
  };

  return (
    <div 
      className="relative carousel-agent-item" 
      data-index={index}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        animation: `fadeInUp 0.6s ease-out forwards ${index * 0.15}s`
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
          onClick={handleOrbClick}
        />
        
        <div className={`
          text-center space-y-3 px-6 py-4 rounded-xl
          transition-all duration-300
          ${isActive ? 'bg-white/5' : 'bg-transparent'}
        `}>
          <h3 className="text-xl font-bold text-white">
            {agent.name}
          </h3>
          <p className="text-sm text-white/70">
            {agent.title}
          </p>
          {isActive && (
            <p className="text-sm text-white/90 mt-3 animate-fade-in">
              {phase.story}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineAgentItem;
