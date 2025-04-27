
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { agents } from '@/data/agents';
import { useIsMobile } from '@/hooks/use-mobile';
import CarouselAgentCard from './team/CarouselAgentCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Link } from 'react-router-dom';

// Reorder agents to match patient journey
const orderedAgents = agents.sort((a, b) => {
  const order = { 'Giselle': 1, 'Miles': 2, 'Devon': 3, 'Alma': 4 };
  return order[a.name] - order[b.name];
});

const phases = [
  { title: 'Phase 1: Attract & Engage', agent: 'Giselle' },
  { title: 'Phase 2: Manage Scheduling', agent: 'Miles' },
  { title: 'Phase 3: Close Treatment', agent: 'Devon' },
  { title: 'Phase 4: Train Your Team', agent: 'Alma' }
];

const AITeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  return (
    <section id="ai-team" className="section-padding py-12 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Meet Your AI Executive Team — Powering Every Stage of Your Patient Journey
          </h2>
          
          <p className="text-base sm:text-lg text-white/70 px-4">
            Success isn't random — it's engineered. The NextGen Operating System™ gives you a full team of AI executives, 
            each assigned to manage one critical phase of your practice growth. From patient acquisition to case acceptance 
            to team training — your AI Boardroom executes every step automatically.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative hidden sm:flex items-center justify-between mb-8">
            {/* Timeline bar */}
            <div className="absolute h-1 bg-white/10 left-0 right-0 top-1/2 transform -translate-y-1/2"></div>
            
            {/* Timeline phases */}
            {phases.map((phase, index) => (
              <div key={phase.agent} className="relative flex flex-col items-center z-10">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                  <span className="text-xl font-bold text-gradient">{index + 1}</span>
                </div>
                <span className="text-sm font-medium text-white text-center max-w-[120px]">{phase.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Connector */}
        <div className="hidden sm:block relative max-w-4xl mx-auto mb-12">
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 border-t-2 border-dashed border-white/20 z-0"></div>
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
              {orderedAgents.map((agent, index) => (
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
              <div className="flex gap-2">
                {orderedAgents.map((_, index) => (
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

        {/* New CTA Button */}
        <div className="text-center">
          <Button 
            asChild
            variant="default"
            className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-bold py-3 px-8 rounded-lg text-lg"
          >
            <Link to="/solutions">Meet Your Executive Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AITeamSection;

