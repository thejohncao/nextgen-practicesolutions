
import React from 'react';
import { Agent } from '@/types/agent';
import { Phase } from './PhaseData';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileAgentTimeline from './mobile/MobileAgentTimeline';
import DesktopAgentCarousel from './desktop/DesktopAgentCarousel';

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
  carouselRef 
}: AgentCarouselProps) => {
  const isMobile = useIsMobile();

  const handleAgentSelect = (index: number) => {
    onSlideChange(index);
  };

  if (isMobile) {
    return (
      <MobileAgentTimeline
        agents={agents}
        phases={phases}
        activeIndex={activeIndex}
        onAgentSelect={handleAgentSelect}
        carouselRef={carouselRef}
      />
    );
  }

  return (
    <DesktopAgentCarousel
      agents={agents}
      phases={phases}
      activeIndex={activeIndex}
      onSlideChange={onSlideChange}
      onAgentSelect={handleAgentSelect}
      carouselRef={carouselRef}
    />
  );
};

export default AgentCarousel;
