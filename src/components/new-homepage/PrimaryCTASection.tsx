
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import RainbowButton from '@/components/ui/rainbow-button';
import { cn } from '@/lib/utils';

const PrimaryCTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black/30 to-black/50 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1),transparent_60%)] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollRevealWrapper animation="fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
              Ready to See How NextGen Can Transform Your Practice?
            </h2>
          </ScrollRevealWrapper>
          
          <ScrollRevealWrapper animation="fade-up" delay={0.1}>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Stop letting operational drag limit your potential. Schedule a personalized demo today and discover how the NextGen AI Operating System can unlock new levels of efficiency, profitability, and team satisfaction for your dental practice.
            </p>
          </ScrollRevealWrapper>
          
          <ScrollRevealWrapper animation="fade-up" delay={0.2} className="flex justify-center">
            <RainbowButton 
              size="lg"
              className="h-auto text-lg px-8 py-6"
              asChild
            >
              <Link to="/join" className="flex items-center">
                Schedule My Personalized Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </RainbowButton>
          </ScrollRevealWrapper>
          
          <ScrollRevealWrapper animation="fade-up" delay={0.3}>
            <p className="text-white/60 mt-4">
              Get a tailored walkthrough. No obligation. See the ROI potential.
            </p>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>
  );
};

export default PrimaryCTASection;
