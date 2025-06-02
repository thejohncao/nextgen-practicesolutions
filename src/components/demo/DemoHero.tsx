import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import RainbowButton from '@/components/ui/rainbow-button';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
const DemoHero = () => {
  return <section className="relative min-h-screen bg-gradient-to-br from-nextgen-dark via-nextgen-dark to-nextgen-dark/80 pt-20 pb-12 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nextgen-purple/5 to-transparent"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-nextgen-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-nextgen-blue/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <ScrollRevealWrapper animation="fade-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-gradient leading-tight">The AI-Powered Operating System for Modern Dental Practices</h1>
          </ScrollRevealWrapper>

          {/* Subheadline */}
          <ScrollRevealWrapper animation="fade-up" delay={0.1}>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              NextGen Practice Solutions is the first operating system that trains your front office, automates your back office, and grows your practice—all under one platform.
            </p>
          </ScrollRevealWrapper>

          {/* CTA */}
          <ScrollRevealWrapper animation="fade-up" delay={0.2}>
            <RainbowButton size="lg" asChild>
              <Link to="/pricing" className="inline-flex items-center">
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </RainbowButton>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>;
};
export default DemoHero;