
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { agents } from '@/data/agents';
import { Link } from 'react-router-dom';
import { phases } from './PhaseData';
import TimelinePhases from './TimelinePhases';
import AgentCarousel from './AgentCarousel';

// Reorder agents to match patient journey
const orderedAgents = agents.sort((a, b) => {
  const order = { 'Giselle': 1, 'Miles': 2, 'Devon': 3, 'Alma': 4 };
  return order[a.name] - order[b.name];
});

const AITeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Effect to handle carousel navigation and timeline highlighting
  useEffect(() => {
    const highlightTimeline = (index: number) => {
      setActiveIndex(index);
    };

    const observer = new IntersectionObstation(
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

        <TimelinePhases
          phases={phases}
          activeIndex={activeIndex}
          onPhaseClick={setActiveIndex}
        />

        <AgentCarousel
          agents={orderedAgents}
          phases={phases}
          activeIndex={activeIndex}
          onSlideChange={setActiveIndex}
          carouselRef={carouselRef}
        />

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

