
import React from 'react';
import { Agent } from '@/types/agent';
import { Phase } from './PhaseData';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselAgentItem from './desktop/CarouselAgentItem';
import MobileAgentTimeline from './mobile/MobileAgentTimeline';

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
    <div className="mb-12">
      {isMobile ? (
        <MobileAgentTimeline
          agents={agents}
          phases={phases}
          activeIndex={activeIndex}
          onAgentSelect={onSlideChange}
          carouselRef={carouselRef}
        />
      ) : (
        <div className="w-full max-w-5xl mx-auto" ref={carouselRef}>
          <div className="grid grid-cols-4 gap-6">
            {agents.map((agent, index) => (
              <div 
                key={agent.name}
                className="carousel-agent-item"
                data-index={index}
              >
                <CarouselAgentItem
                  agent={agent}
                  index={index}
                  isActive={activeIndex === index}
                  phaseDescription={phases[index].story}
                  phaseColor={phases[index].color}
                  onSelect={() => onSlideChange(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentCarousel;
