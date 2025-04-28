
import React from 'react';
import { Agent } from '@/types/agent';
import { Phase } from '../PhaseData';
import CarouselAgentItem from './CarouselAgentItem';
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
  onAgentSelect: (index: number) => void;
  carouselRef: React.RefObject<HTMLDivElement>;
}

const DesktopAgentCarousel = ({
  agents,
  phases,
  activeIndex,
  onSlideChange,
  onAgentSelect,
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
              <CarouselAgentItem
                agent={agent}
                index={index}
                isActive={activeIndex === index}
                phaseDescription={phases[index].story}
                phaseColor={phases[index].color}
                onSelect={() => onAgentSelect(index)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default DesktopAgentCarousel;
