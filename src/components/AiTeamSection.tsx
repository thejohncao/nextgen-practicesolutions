
import React, { useState, useEffect, useRef } from 'react';
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
  { 
    title: 'Phase 1: Attract & Engage', 
    agent: 'Giselle',
    story: 'Your growth engine starts here — building your patient pipeline with precision.',
    color: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400'
  },
  { 
    title: 'Phase 2: Manage Scheduling', 
    agent: 'Miles',
    story: 'Streamline operations and create frictionless patient experiences.',
    color: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400'
  },
  { 
    title: 'Phase 3: Close Treatment', 
    agent: 'Devon',
    story: 'Convert prospects into lifelong patients with personalized care.',
    color: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400'
  },
  { 
    title: 'Phase 4: Train Your Team', 
    agent: 'Alma',
    story: 'Build a high-performing team that delivers exceptional care.',
    color: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400'
  }
];

const AITeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Effect to handle carousel navigation and timeline highlighting
  useEffect(() => {
    const highlightTimeline = (index: number) => {
      setActiveIndex(index);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              highlightTimeline(index);
            }
          }
        });
      },
      { threshold: 0.7 }
    );

    // Observe all carousel items
    const carouselItems = carouselRef.current?.querySelectorAll('.carousel-agent-item');
    carouselItems?.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      carouselItems?.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  // Get color for the active phase
  const getActivePhaseColor = (index: number, isActive: boolean) => {
    if (!isActive) return 'bg-white/5';
    return phases[index].color;
  };

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

        {/* Desktop Timeline */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="relative hidden sm:flex items-center justify-between">
            {/* Horizontal Connector Line */}
            <div className="absolute h-1 bg-gradient-to-r from-white/10 via-white/30 to-white/10 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"></div>
            
            {/* Timeline phases */}
            {phases.map((phase, index) => (
              <div 
                key={phase.agent} 
                className="relative flex flex-col items-center z-10"
                onClick={() => setActiveIndex(index)}
              >
                <div 
                  className={`w-12 h-12 rounded-full ${getActivePhaseColor(index, activeIndex === index)} 
                    border transition-all duration-300 ${activeIndex === index ? phase.borderColor : 'border-white/10'} 
                    flex items-center justify-center mb-2 cursor-pointer
                    ${activeIndex === index ? 'animate-pulse-slow shadow-glow' : ''}`}
                >
                  <span className={`text-xl font-bold ${activeIndex === index ? phase.textColor : 'text-white/70'}`}>{index + 1}</span>
                </div>
                <div className="text-center w-28">
                  <span className={`text-sm font-medium ${activeIndex === index ? 'text-white' : 'text-white/70'}`}>
                    {phase.title.split(':')[1]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel with Mobile Timeline */}
        <div className="mb-12" ref={carouselRef}>
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
                  <div className="p-2 relative carousel-agent-item" data-index={index}>
                    {/* Mobile Timeline Connector */}
                    {isMobile && index < orderedAgents.length - 1 && (
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
                {orderedAgents.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === index 
                        ? `w-4 ${phases[index].textColor.replace('text-', 'bg-')}` 
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

        {/* CTA Button */}
        <div className="text-center mt-8">
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
