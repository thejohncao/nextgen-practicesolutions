
import React, { useState, useRef, useEffect } from 'react';
import { agents } from '@/data/agents';
import { teamPhases } from '../team/data/TeamPhases';
import PracticeOwnerMessage from './PracticeOwnerMessage';
import BoardroomAgentCard from './BoardroomAgentCard';
import SectionHeader from './SectionHeader';
import { Button } from "@/components/ui/button";
import RainbowButton from '../ui/rainbow-button';
import { Link } from 'react-router-dom';

// Reorder agents to match patient journey
const orderedAgents = agents.sort((a, b) => {
  const order = { 'Giselle': 1, 'Miles': 2, 'Devon': 3, 'Alma': 4 };
  return order[a.name] - order[b.name];
});

const AIBoardroomTimeline = () => {
  const [activePhase, setActivePhase] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Set up intersection observer to update active phase on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = phaseRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActivePhase(index);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "-50px 0px" }
    );
    
    phaseRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="ai-boardroom" className="relative py-12 md:py-24 overflow-hidden bg-nextgen-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader 
          title="Lead Your Practice Like a CEO" 
          subtitle="Stop managing tasks. Start commanding your AI executive team — and run your practice like a Fortune 500 company."
        />
        
        {/* Timeline with vertical connector line */}
        <div 
          className="relative max-w-4xl mx-auto mt-16"
          ref={timelineRef}
        >
          {/* Vertical timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
          
          {/* Initial practice owner message */}
          <div className="mb-12 ml-12 relative opacity-0 animate-fade-in">
            <div className="absolute left-[-56px] top-4 w-6 h-6 rounded-full bg-nextgen-purple border-4 border-nextgen-dark z-10" />
            <div className="glass-card max-w-lg ml-2">
              <PracticeOwnerMessage />
            </div>
          </div>
          
          {/* Agent Timeline Cards */}
          {orderedAgents.map((agent, index) => (
            <div
              key={agent.name}
              ref={(el) => (phaseRefs.current[index] = el)}
              className="relative mb-16 ml-12"
            >
              {/* Timeline node */}
              <div className={`absolute left-[-56px] top-8 w-8 h-8 rounded-full border-4 border-nextgen-dark z-10 transition-all duration-300 ${
                activePhase === index 
                  ? `bg-${agent.color === 'gold' ? 'amber' : agent.color}-500` 
                  : 'bg-white/20'
              }`} />
              
              <BoardroomAgentCard 
                agent={agent}
                phase={teamPhases[index].title}
                isActive={activePhase === index}
                animationDelay={0.2 + index * 0.1}
              />
            </div>
          ))}
          
          {/* Final CTA */}
          <div className="text-center mt-16 pt-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Meet the AI Team That Grows With You
            </h3>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              One decision. Four agents. An entire practice powered by intelligence, empathy, and execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RainbowButton asChild>
                <Button asChild>
                  <Link to="/join">Talk to Miles</Link>
                </Button>
              </RainbowButton>
              <Button asChild variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                <Link to="/solutions">See the Patient Journey</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIBoardroomTimeline;
