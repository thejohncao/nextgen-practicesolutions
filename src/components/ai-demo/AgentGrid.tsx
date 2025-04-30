
import React from 'react';
import { agents } from '@/data/agents';
import { FadeInSection } from '@/components/ui/fade-in-section';
import AgentCard from './AgentCard';

const AgentGrid = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-black/40">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gradient">
            AI Executives for Every Phase
          </h2>
          <p className="text-lg text-white/70 text-center max-w-2xl mx-auto mb-12">
            Each agent specializes in a critical area of your practice growth, working together seamlessly
          </p>
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {agents.map((agent, index) => (
            <FadeInSection key={agent.name} delay={0.15 * index} direction="up">
              <AgentCard agent={agent} />
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentGrid;
