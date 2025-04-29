import React from 'react';
import { agents } from '@/data/agents';
import TabNavigation from './gooey-tabs/TabNavigation';
import AgentContentPanel from './gooey-tabs/AgentContentPanel';
import { useState } from 'react';
import { Sparkles } from "lucide-react";
import TeamSectionHeader from './TeamSectionHeader';
import TeamCTA from './TeamCTA';
import CircleBackground from '../effects/CircleBackground';

// This is the enhanced version of AITeamSection that replaced the original component
const GooeyFilterTabs = () => {
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);

  return (
    <section className="section-padding py-24 relative overflow-hidden bg-nextgen-dark/95">
      <CircleBackground count={10} opacity={0.06} colorScheme="blue" speed={0.6}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-nextgen-purple" />
              <span className="text-sm font-medium text-white/80">Meet Your AI Team</span>
            </div>
            
            <TeamSectionHeader />
          </div>
          
          {/* Gooey filter tabs navigation */}
          <div className="mb-8">
            <TabNavigation 
              agents={agents} 
              activeIndex={activeAgentIndex}
              onChange={setActiveAgentIndex}
            />
          </div>
          
          {/* Agent content panel */}
          <AgentContentPanel 
            agents={agents}
            activeIndex={activeAgentIndex}
          />
          
          {/* Team CTA */}
          <TeamCTA />
        </div>
      </CircleBackground>
    </section>
  );
};

export default GooeyFilterTabs;
