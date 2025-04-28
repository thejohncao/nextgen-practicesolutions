
import React from 'react';
import { Agent } from '@/types/agent';
import { Phase } from '../PhaseData';
import CarouselAgentCard from '../CarouselAgentCard';
import AgentOrb from '../agent/AgentOrb';
import { getTooltipText } from '../utils/getTooltipText';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface DesktopAgentCarouselProps {
  agents: Agent[];
  phases: Phase[];
  activeIndex: number;
  onSlideChange: (index: number) => void;
  carouselRef: React.RefObject<HTMLDivElement>;
}

const getTooltipText = (name: string) => {
  switch (name) {
    case 'Miles': return 'Front Office Automation';
    case 'Giselle': return 'Lead Growth Engine';
    case 'Devon': return 'Treatment Closer';
    case 'Alma': return 'Team Training AI';
    default: return '';
  }
};

const DesktopAgentCarousel = ({
  agents,
  phases,
  activeIndex,
  onSlideChange,
  carouselRef,
}: DesktopAgentCarouselProps) => {
  return (
    <div className="mb-12" ref={carouselRef}>
      <Carousel 
        className="w-full max-w-5xl mx-auto"
        opts={{
          align: "center",
          loop: true,
          startIndex: activeIndex,
        }}
      >
        <CarouselContent>
          {agents.map((agent, index) => (
            <CarouselItem key={agent.name} className="basis-1/2">
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
                    tooltipText={getTooltipText(agent.name)}
                    isActive={activeIndex === index}
                    onClick={() => onSlideChange(index)}
                  />
                  <CarouselAgentCard 
                    agent={agent} 
                    isActive={activeIndex === index}
                    phaseDescription={phases[index].story}
                    phaseColor={phases[index].color}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default DesktopAgentCarousel;
