
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import RainbowButton from '@/components/ui/rainbow-button';
import { ArrowRight, Play } from 'lucide-react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import AiDemoHero from '@/components/ai-demo/AiDemoHero';
import AgentGrid from '@/components/ai-demo/AgentGrid';
import AgentDemos from '@/components/ai-demo/AgentDemos';
import JourneyComparison from '@/components/ai-team/JourneyComparison';
import FinalCTA from '@/components/ai-demo/FinalCTA';
import FooterCTA from '@/components/FooterCTA';

const AiDemo = () => {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-nextgen-dark">
        {/* Hero Section */}
        <AiDemoHero />
        
        {/* Agent Grid */}
        <AgentGrid />
        
        {/* Agent Demos */}
        <AgentDemos />
        
        {/* Side-by-Side Patient Journey */}
        <section className="py-24 bg-black/30">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gradient">
                Patient Journey: <span className="text-red-400">Before</span> vs <span className="text-nextgen-purple">After</span>
              </h2>
              <p className="text-lg text-white/70 text-center max-w-2xl mx-auto mb-16">
                See the difference AI makes in your practice workflow
              </p>
            </FadeInSection>
            
            <div className="max-w-6xl mx-auto">
              <JourneyComparison />
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <FinalCTA />
        
        {/* Standard Footer CTA */}
        <FooterCTA />
      </div>
    </Layout>
  );
};

export default AiDemo;
