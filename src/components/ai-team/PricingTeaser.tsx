
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import AgentSectionGrid from '@/components/nextgen-home-v2/AgentSectionGrid';

const PricingTeaser = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-black/40">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gradient">
            Start Small or Scale Big
          </h2>
          <p className="text-lg text-white/70 text-center max-w-2xl mx-auto mb-12">
            Choose the AI team configuration that fits your practice size and growth goals
          </p>
        </FadeInSection>
        
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 mb-12">
            <AgentSectionGrid />
          </div>
        </div>
        
        <FadeInSection delay={0.3}>
          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
            >
              <Link to="/pricing">
                Compare Plans
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default PricingTeaser;
