
import React from 'react';
import { cn } from "@/lib/utils";
import BackgroundEffect from '../roi/BackgroundEffect';
import PricingPackages from './PricingPackages';
import PricingHero from './PricingHero';
import BoardroomUnlockFlow from './BoardroomUnlockFlow';
import PricingCTA from './PricingCTA';
import ScrollRevealWrapper from '../animation/ScrollRevealWrapper';
import ParallaxSection from '../effects/ParallaxSection';
import { ParallaxLayer } from '../effects/ParallaxSection';

const PricingSection = () => {
  return (
    <ParallaxSection className="relative py-20 overflow-hidden bg-nextgen-dark">
      {/* Enhanced background elements with parallax */}
      <ParallaxLayer speed={-0.2} className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#E87C7C]/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </ParallaxLayer>
      
      <ParallaxLayer speed={-0.1} className="absolute inset-0 -z-20">
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-nextgen-blue/5 blur-[150px] rounded-full"></div>
      </ParallaxLayer>
      
      <ScrollRevealWrapper animation="fade-up">
        <PricingHero />
      </ScrollRevealWrapper>
      
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up" delay={0.2}>
          <PricingPackages />
        </ScrollRevealWrapper>
      </div>
      
      <ScrollRevealWrapper animation="fade-up" delay={0.3}>
        <BoardroomUnlockFlow />
      </ScrollRevealWrapper>
      
      <ScrollRevealWrapper animation="fade-up" delay={0.4}>
        <PricingCTA />
      </ScrollRevealWrapper>
    </ParallaxSection>
  );
};

export default PricingSection;
