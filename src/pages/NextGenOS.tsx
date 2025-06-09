
import React from 'react';
import Layout from '../components/Layout';
import NextGenHero from '../components/nextgen-os/NextGenHero';
import WhatIsNextGenOS from '../components/nextgen-os/WhatIsNextGenOS';
import WhatsInsideOS from '../components/nextgen-os/WhatsInsideOS';
import MeetYourAITeam from '../components/nextgen-os/MeetYourAITeam';
import CompareNextGenOS from '../components/nextgen-os/CompareNextGenOS';
import HowItScales from '../components/nextgen-os/HowItScales';
import PartnershipModels from '../components/nextgen-os/PartnershipModels';
import FinalCTA from '../components/nextgen-os/FinalCTA';
import ScrollRevealWrapper from '../components/animation/ScrollRevealWrapper';
import ParallaxSection from '../components/effects/ParallaxSection';
import AnimatedGrainOverlay from '../components/effects/AnimatedGrainOverlay';

const NextGenOS = () => {
  return (
    <Layout>
      <div className="relative">
        {/* Global grain overlay with minimal opacity */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <AnimatedGrainOverlay opacity={0.03} />
        </div>
        
        {/* Hero Section */}
        <NextGenHero />
        
        {/* What Is NextGen OS */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <WhatIsNextGenOS />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* What's Inside the OS */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <WhatsInsideOS />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* Meet Your AI Team */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <MeetYourAITeam />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* Compare NextGen OS */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <CompareNextGenOS />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* How It Scales */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <HowItScales />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* Partnership Models */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <PartnershipModels />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* Final CTA */}
        <ScrollRevealWrapper animation="fade-up">
          <FinalCTA />
        </ScrollRevealWrapper>
      </div>
    </Layout>
  );
};

export default NextGenOS;
