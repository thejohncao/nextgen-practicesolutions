
import React, { useState } from 'react';
import { Users, Magnet, Calendar, DollarSign, Book } from "lucide-react";
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

  // Agent icon mapping
  const getAgentIcon = (name) => {
    switch (name) {
      case 'Giselle': return Magnet;
      case 'Miles': return Calendar;
      case 'Devon': return DollarSign;
      case 'Alma': return Book;
      default: return Users;
    }
  };

  return (
    <section id="ai-team" className="section-padding py-12 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Users className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">AI Executive Team</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Meet Your AI Executive Team — Powering Every Stage of Your Patient Journey
          </h2>
          
          <p className="text-base sm:text-lg text-white/70 px-4">
            Success isn't random — it's engineered. NextGen Practice Solutions™ gives you a full team of AI executives, 
            each assigned to manage one critical phase of your practice growth. From patient acquisition to case acceptance 
            to team training — your AI Boardroom executes every step automatically.
          </p>
        </div>

        {/* Patient Journey Order Timeline */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative hidden sm:flex items-center justify-between mb-8">
            {/* Timeline bar */}
            <div className="absolute h-1 bg-white/10 left-0 right-0 top-1/2 transform -translate-y-1/2"></div>
            
            {/* Timeline nodes */}
            {agents.map((agent, index) => {
              const IconComponent = getAgentIcon(agent.name);
              return (
                <div key={agent.name} className="relative flex flex-col items-center z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    agent.name === 'Giselle' ? 'bg-green-500/20' :
                    agent.name === 'Miles' ? 'bg-blue-500/20' :
                    agent.name === 'Devon' ? 'bg-purple-500/20' :
                    'bg-amber-500/20'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      agent.name === 'Giselle' ? 'text-green-500' :
                      agent.name === 'Miles' ? 'text-blue-500' :
                      agent.name === 'Devon' ? 'text-purple-500' :
                      'text-amber-500'
                    }`} />
                  </div>
                  <span className="text-sm font-medium text-white">{agent.name}</span>
                  <span className="text-xs text-white/50">{agent.title}</span>
                </div>
              );
            })}
          </div>
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
