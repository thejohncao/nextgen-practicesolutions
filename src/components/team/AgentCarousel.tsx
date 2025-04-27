
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

  if (isMobile) {
    return (
      <MobileAgentTimeline
        agents={agents}
        phases={phases}
        activeIndex={activeIndex}
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
      carouselRef={carouselRef}
    />
  );
};

export default AgentCarousel;
