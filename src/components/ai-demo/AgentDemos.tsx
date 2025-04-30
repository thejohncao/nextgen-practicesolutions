
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import MilesDemo from './agent-demos/MilesDemo';
import GiselleDemo from './agent-demos/GiselleDemo';
import DevonDemo from './agent-demos/DevonDemo';
import AlmaDemo from './agent-demos/AlmaDemo';

const AgentDemos = () => {
  return (
    <section className="py-24 bg-black/20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gradient">
            See Your AI Team in Action
          </h2>
          <p className="text-lg text-white/70 text-center max-w-2xl mx-auto mb-16">
            Watch how each AI agent handles their specialized role in your practice
          </p>
        </FadeInSection>
        
        <div className="space-y-24">
          <MilesDemo />
          <GiselleDemo />
          <DevonDemo />
          <AlmaDemo />
        </div>
      </div>
    </section>
  );
};

export default AgentDemos;
