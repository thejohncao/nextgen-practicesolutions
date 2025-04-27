
import React from 'react';
import { Agent } from '@/types/agent';
import { Phase } from './PhaseData';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselAgentCard from './CarouselAgentCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface AgentCarouselProps {
  agents: Agent[];
  phases: Phase[];
  activeIndex: number;
  onSlideChange: (index: number) => void;
  carouselRef: React.RefObject<HTMLDivElement>;
}

const AgentCarousel = ({ agents, phases, activeIndex, onSlideChange, carouselRef }: AgentCarouselProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="mb-12" ref={carouselRef}>
      <Carousel 
        className="w-full max-w-5xl mx-auto"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {agents.map((agent, index) => (
            <CarouselItem key={agent.name} className={isMobile ? "basis-full" : "basis-1/2"}>
              <div className="p-2 relative carousel-agent-item" data-index={index}>
                {/* Mobile Timeline Connector */}
                {isMobile && index < agents.length - 1 && (
                  <div className="absolute left-1/2 top-full w-1 h-12 bg-gradient-to-b from-white/30 to-transparent z-0"></div>
                )}
                
                {/* Phase badge for mobile */}
                {isMobile && (
                  <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 
                    ${phases[index].color} ${phases[index].borderColor} border 
                    px-2 py-1 rounded-full text-xs font-bold ${phases[index].textColor}`}
                  >
                    Phase {index + 1}
                  </div>
                )}
                
                <CarouselAgentCard 
                  agent={agent} 
                  isActive={activeIndex === index}
                  phaseDescription={phases[index].story}
                  phaseColor={phases[index].color}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-4 mt-8">
          <CarouselPrevious className="relative static left-0 right-0 translate-y-0 mx-2" />
          <div className="flex gap-2">
            {agents.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex === index 
                    ? `w-4 ${phases[index].textColor.replace('text-', 'bg-')}` 
                    : "bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => onSlideChange(index)}
              />
            ))}
          </div>
          <CarouselNext className="relative static left-0 right-0 translate-y-0 mx-2" />
        </div>
      </Carousel>
    </div>
  );
};

export default AgentCarousel;

