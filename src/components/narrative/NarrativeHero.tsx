import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Calendar } from 'lucide-react';
import { FadeInSection } from '@/components/ui/fade-in-section';

const NarrativeHero = () => {
  const scrollToDemo = () => {
    const el = document.getElementById('demo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0F1A24 0%, #1A2B3C 40%, #0F1A24 100%)' }} />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: 'rgba(45,90,123,0.15)' }} />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: 'rgba(78,173,197,0.10)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px]" style={{ background: 'rgba(45,90,123,0.08)' }} />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <FadeInSection delay={0.1}>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-8 tracking-wide"
            style={{ background: 'rgba(45,90,123,0.15)', border: '1px solid rgba(45,90,123,0.3)', color: '#4EADC5' }}
          >
            Introducing Narrative
          </span>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight mb-6">
            Your treatment plans weren't designed to get a{' '}
            <span style={{ color: '#4EADC5' }}>yes.</span>
          </h1>
        </FadeInSection>

        <FadeInSection delay={0.4}>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            The average practice loses 40–60% of diagnosed production because patients leave confused,
            overwhelmed, or unconvinced. Narrative changes the conversation.
          </p>
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToDemo}
              className="text-base px-8 py-6 rounded-xl font-medium text-white"
              style={{ background: '#2D5A7B' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#3A7299'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#2D5A7B'; }}
            >
              See It In Action
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="text-base px-8 py-6 rounded-xl font-medium border-white/10 text-white/80 hover:bg-white/5 hover:text-white"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book a Demo
            </Button>
          </div>
        </FadeInSection>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <FadeInSection delay={1}>
          <button onClick={scrollToDemo} className="text-white/30 hover:text-white/60 transition-colors">
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </button>
        </FadeInSection>
      </div>
    </section>
  );
};

export default NarrativeHero;
