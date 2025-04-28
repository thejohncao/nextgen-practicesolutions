
import React from 'react';
import { Agent } from '@/types/agent';
import { Phase } from './PhaseData';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselAgentItem from './desktop/CarouselAgentItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
      <Carousel 
        className="w-full max-w-4xl mx-auto"
        opts={{
          align: "center",
          loop: true,
        }}
        onSelect={(api) => {
          const selectedIndex = api.selectedScrollSnap();
          onSlideChange(selectedIndex);
        }}
      >
        <CarouselContent>
          {agents.map((agent, index) => (
            <CarouselItem key={agent.name} className="basis-full md:basis-full pl-4">
              <CarouselAgentItem
                agent={agent}
                index={index}
                isActive={activeIndex === index}
                phaseDescription={phases[index].story}
                phaseColor={phases[index].color}
                onSelect={() => onSlideChange(index)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="border-white/20 hover:bg-white/10" />
          <CarouselNext className="border-white/20 hover:bg-white/10" />
        </div>
      </Carousel>
    </div>
  );
};

export default AgentCarousel;
