
import React from 'react';
import { Agent } from '@/types/agent';
import { Phase } from './PhaseData';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselAgentItem from './desktop/CarouselAgentItem';

interface AgentCarouselProps {
  agents: Agent[];
  phases: Phase[];
  activeIndex: number;
  onSlideChange: (index: number) => void;
  carouselRef: React.RefObject<HTMLDivElement>;
}

const AgentCarousel = ({
  agents,
  phases,
  activeIndex,
  onSlideChange,
  carouselRef,
}: AgentCarouselProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-12" ref={carouselRef}>
      <div className={`w-full max-w-5xl mx-auto ${isMobile ? 'space-y-6' : ''}`}>
        <div className={isMobile ? 'space-y-6' : 'grid grid-cols-4 gap-4'}>
          {agents.map((agent, index) => (
            <div 
              key={agent.name}
              className={`
                opacity-0 animate-fade-in
                ${!isMobile && 'transition-all duration-300'}
              `}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              <CarouselAgentItem
                agent={agent}
                index={index}
                isActive={isMobile || activeIndex === index}
                phaseDescription={phases[index].story}
                phaseColor={phases[index].color}
                onSelect={() => onSlideChange(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentCarousel;
