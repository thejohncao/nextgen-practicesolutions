import React from 'react';
import { Agent } from '@/types/agent';
import { Phase } from '../PhaseData';
import AgentOrb from '../agent/AgentOrb';
import CarouselAgentCard from '../CarouselAgentCard';
import { getTooltipText } from '../utils/getTooltipText';

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
      <div className="absolute left-1/2 h-full w-px bg-gradient-to-b from-white/30 via-white/20 to-transparent" 
        style={{ top: '60px' }} />
      
      {agents.map((agent, index) => (
        <div 
          key={agent.name} 
          className="relative carousel-agent-item" 
          data-index={index}
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            animation: `fadeInUp 0.7s ease-out forwards ${index * 0.1}s`
          }}
        >
          {/* Phase Node */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              transition-all duration-300 ease-in-out
              ${phases[index].color} ${phases[index].borderColor} border-2
              ${activeIndex === index ? 'shadow-[0_0_15px_rgba(255,255,255,0.2)]' : ''}
            `}>
              <span className={`text-sm font-bold ${phases[index].textColor}`}>
                {index + 1}
              </span>
            </div>
            <div className={`
              absolute top-full left-1/2 transform -translate-x-1/2 mt-2
              whitespace-nowrap text-center text-sm font-medium
              transition-colors duration-300
              ${phases[index].textColor}
            `}>
              Phase {index + 1}
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <AgentOrb
              name={agent.name}
              role={agent.title}
              color={agent.color}
              tooltipText={getTooltipText(agent.name)}
              isActive={activeIndex === index}
            />
            <CarouselAgentCard 
              agent={agent} 
              isActive={activeIndex === index}
              phaseDescription={phases[index].story}
              phaseColor={phases[index].color}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileAgentTimeline;
