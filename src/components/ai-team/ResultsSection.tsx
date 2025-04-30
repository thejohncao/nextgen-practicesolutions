
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import ResultsCards from '@/components/nextgen-home-v2/ResultsCards';
import { QuoteIcon } from 'lucide-react';

const ResultsSection = () => {
  return (
    <section className="py-24 bg-black/30">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gradient">
            Practices using the AI Team report:
          </h2>
        </FadeInSection>
        
        <div className="mb-16">
          <ResultsCards />
        </div>
        
        <FadeInSection delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <div className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 relative">
              <QuoteIcon className="absolute top-4 left-4 h-8 w-8 text-nextgen-purple opacity-40" />
              <blockquote className="text-xl md:text-2xl text-white/90 text-center italic">
                "We closed more treatment in 1 month with Devon than we had in 3. And we didn't have to chase a single patient."
              </blockquote>
              <div className="text-center mt-6">
                <p className="text-white font-medium">Dr. Sarah Thompson</p>
                <p className="text-sm text-white/60">Clear Smile Dental, Seattle</p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ResultsSection;
