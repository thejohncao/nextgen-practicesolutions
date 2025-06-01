
import React from 'react';
import { ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import RainbowButton from '@/components/ui/rainbow-button';
import { Button } from '@/components/ui/button';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';

const JoinHero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-nextgen-dark via-nextgen-dark to-nextgen-dark/80 pt-20 pb-12 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nextgen-purple/5 to-transparent"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-nextgen-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-nextgen-blue/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Certification Badge */}
          <ScrollRevealWrapper animation="fade-up">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-nextgen-purple/20 to-nextgen-blue/20 border border-nextgen-purple/30 rounded-full px-6 py-3 mb-8">
              <Award className="h-5 w-5 text-nextgen-purple" />
              <span className="text-sm font-medium text-white">NextGen CERTIFIED</span>
            </div>
          </ScrollRevealWrapper>

          {/* Headline */}
          <ScrollRevealWrapper animation="fade-up" delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-gradient leading-tight">
              The World's First AI Academy for Dental Practices
            </h1>
          </ScrollRevealWrapper>

          {/* Subheadline */}
          <ScrollRevealWrapper animation="fade-up" delay={0.2}>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Train your front office to operate like a high-performance growth team. Learn treatment coordination, patient financing, and AI tools—all in one platform.
            </p>
          </ScrollRevealWrapper>

          {/* CTAs */}
          <ScrollRevealWrapper animation="fade-up" delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <RainbowButton size="lg" asChild>
                <Link to="/academy/curriculum" className="inline-flex items-center">
                  View Curriculum
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </RainbowButton>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
                asChild
              >
                <Link to="#enrollment">
                  Join the Academy
                </Link>
              </Button>
            </div>
          </ScrollRevealWrapper>

          {/* Stats */}
          <ScrollRevealWrapper animation="fade-up" delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-white/60">Graduates Placed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">2x</div>
                <div className="text-white/60">Treatment Acceptance Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">$30K+</div>
                <div className="text-white/60">Monthly Revenue Growth</div>
              </div>
            </div>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>
  );
};

export default JoinHero;
