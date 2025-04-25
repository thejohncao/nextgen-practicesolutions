import React, { useState } from 'react';
import { Users } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { agents } from '@/data/agents';
import { Agent } from '@/types/agent';
import AgentCard from './AgentCard';

const AITeamSection = () => {
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const isMobile = useIsMobile();

  return (
    <section id="ai-team" className="section-padding py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Users className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">AI Team</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Meet Your AI Team
          </h2>
          
          <p className="text-base sm:text-lg text-white/70 px-4">
            Each agent leads a department in your practice—working 24/7 to automate your operations, convert more cases, and retain loyal patients.
          </p>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-white/60 text-sm animate-pulse">
            {isMobile ? "Tap" : "Hover"} on each team member to learn more about their role
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {agents.map((agent, index) => (
            <AgentCard
              key={agent.name}
              agent={agent}
              isActive={activeAgent?.name === agent.name}
              onMouseEnter={() => !isMobile && setActiveAgent(agent)}
              onMouseLeave={() => !isMobile && setActiveAgent(null)}
              onClick={() => isMobile && setActiveAgent(activeAgent?.name === agent.name ? null : agent)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AITeamSection;
