
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';

const PullQuote = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark to-nextgen-dark/95">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="absolute -top-8 left-4 text-8xl text-nextgen-purple/30 font-serif">"</div>
            <blockquote className="text-2xl md:text-3xl font-light italic text-white mb-6 relative z-10">
              "Before the Academy, we had scripts in 3 different places and nobody used them. 
              Now everyone speaks the same language — and treatment gets accepted."
            </blockquote>
            <div className="absolute -bottom-16 right-4 text-8xl text-nextgen-purple/30 font-serif">"</div>
            
            <cite className="text-lg text-white/70 not-italic">
              — Office Manager, 4-op Private Practice
            </cite>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default PullQuote;
