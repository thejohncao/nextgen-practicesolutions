
import React, { useState } from 'react';
import { Users } from "lucide-react";
import { agents } from '@/data/agents';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import CarouselAgentCard from './team/CarouselAgentCard';

const AITeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  return (
    <section id="ai-team" className="section-padding py-12 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Users className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">AI Team</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Meet Your AI Team
          </h2>
          
          <p className="text-base sm:text-lg text-white/70 px-4">
            Your practice just hired four world-class experts — and they never take a day off. 
            Each AI agent is trained to run a core part of your operations.
          </p>
        </div>

        {/* Carousel */}
        <div className="mb-12">
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
                  <div className="p-2">
                    <CarouselAgentCard 
                      agent={agent} 
                      isActive={activeIndex === index}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="relative static left-0 right-0 translate-y-0 mx-2" />
              {/* Dots for slide position */}
              <div className="flex gap-2">
                {agents.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === index 
                        ? "bg-white w-4" 
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
              <CarouselNext className="relative static left-0 right-0 translate-y-0 mx-2" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default AITeamSection;
