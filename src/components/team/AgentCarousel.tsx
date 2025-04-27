
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

  if (isMobile) {
    return (
      <div className="space-y-24 relative py-12" ref={carouselRef}>
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 h-full w-px bg-gradient-to-b from-white/30 via-white/20 to-transparent" 
             style={{ top: '60px' }} />
        
        {agents.map((agent, index) => (
          <div key={agent.name} className="relative carousel-agent-item" data-index={index}>
            {/* Phase Node */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
              <div className={`${phases[index].color} ${phases[index].borderColor} border-2
                w-8 h-8 rounded-full flex items-center justify-center
                ${activeIndex === index ? 'animate-pulse-slow shadow-glow' : ''}`}
              >
                <span className={`text-sm font-bold ${phases[index].textColor}`}>{index + 1}</span>
              </div>
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                whitespace-nowrap text-center ${phases[index].textColor} text-sm font-medium`}
              >
                Phase {index + 1}
              </div>
            </div>
            
            <CarouselAgentCard 
              agent={agent} 
              isActive={activeIndex === index}
              phaseDescription={phases[index].story}
              phaseColor={phases[index].color}
            />
          </div>
        ))}
      </div>
    );
  }

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
            <CarouselItem key={agent.name} className="basis-1/2">
              <div className="p-2 relative carousel-agent-item" data-index={index}>
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
