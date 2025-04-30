
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { agents } from '@/data/agents';
import SectionHeader from './SectionHeader';
import PracticeOwnerMessage from './PracticeOwnerMessage';
import AgentMessage from './AgentMessage';
import BoardroomAgentCard from './BoardroomAgentCard';
import { teamPhases } from '@/components/team/data/TeamPhases';
import RainbowButton from '../ui/rainbow-button';

const AIBoardroomTimeline = () => {
  return (
    <section className="py-16 md:py-24 relative bg-nextgen-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Meet Your AI Executive Team" 
          subtitle="Four specialized AI agents powering every aspect of practice growth" 
        />
        
        <div className="max-w-4xl mx-auto">
          {/* Initial practice owner message */}
          <div className="mb-8">
            <PracticeOwnerMessage />
          </div>
          
          {/* Timeline of agents */}
          <div className="relative flex flex-col gap-12">
            {/* Center timeline line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/10 z-0"></div>
            
            {/* Agent cards */}
            {agents.map((agent, index) => {
              const phase = teamPhases[index];
              
              return (
                <div 
                  key={agent.name} 
                  className="relative z-10 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.3 + 0.3}s`, animationFillMode: 'forwards' }}
                >
                  {/* Timeline dot */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-white/60 to-white/20 shadow-glow"></div>
                  
                  {/* Phase label */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-12 bg-nextgen-dark px-4 py-1 rounded-full">
                    <span className={`text-sm font-medium ${phase?.textColor || 'text-white/60'}`}>
                      {phase?.title || `Phase ${index + 1}`}
                    </span>
                  </div>
                  
                  {/* Agent card with offset for alternating layout */}
                  <div className={`relative ${index % 2 === 0 ? 'ml-auto mr-8 md:mr-0 md:ml-[calc(50%+1.5rem)]' : 'mr-auto ml-8 md:ml-0 md:mr-[calc(50%+1.5rem)]'} max-w-md`}>
                    <BoardroomAgentCard 
                      agent={agent} 
                      quote={agent.quote || ""}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Closing CTA */}
          <div className="mt-16 text-center opacity-0 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-gradient mb-4">
              Meet the AI Team That Grows With You
            </h3>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              One decision. Four agents. An entire practice powered by intelligence, empathy, and execution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <RainbowButton 
                onClick={() => {
                  try {
                    const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
                    if (chatButton) chatButton.click();
                  } catch (error) {
                    console.error('Error opening chat:', error);
                  }
                }}
                size="lg"
              >
                Talk to Miles
              </RainbowButton>
              
              <Button
                variant="outline" 
                className="border-white/10 hover:bg-white/5"
                asChild
              >
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
