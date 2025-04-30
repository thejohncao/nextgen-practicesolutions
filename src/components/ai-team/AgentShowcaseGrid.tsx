
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { agents } from '@/data/agents';
import AgentShowcaseCard from './AgentShowcaseCard';

const AgentShowcaseGrid = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-black/40">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gradient">
            Meet Your AI Agents
          </h2>
          <p className="text-lg text-white/70 text-center max-w-2xl mx-auto mb-12">
            Your AI team works 24/7, never calls in sick, and consistently delivers results that grow your practice.
          </p>
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {agents.map((agent, index) => (
            <FadeInSection key={agent.name} delay={0.15 * index} direction="up">
              <AgentShowcaseCard agent={agent} />
            </FadeInSection>
          ))}
        </div>
        
        <FadeInSection delay={0.6}>
          <div className="flex justify-center mt-8">
            <Button
              asChild
              size="lg"
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
            >
              <Link to="/watch">
                <Play className="mr-2 h-4 w-4" />
                Watch Agent Demo
              </Link>
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default AgentShowcaseGrid;
