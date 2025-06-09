
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

const NextGenOS = () => {
  return (
    <Layout>
      <div className="relative bg-nextgen-dark">
        {/* Hero Section */}
        <NextGenHero />
        
        {/* What Is NextGen OS */}
        <ScrollRevealWrapper animation="fade-up">
          <WhatIsNextGenOS />
        </ScrollRevealWrapper>
        
        {/* What's Inside the OS */}
        <ScrollRevealWrapper animation="fade-up">
          <WhatsInsideOS />
        </ScrollRevealWrapper>
        
        {/* Meet Your AI Team */}
        <ScrollRevealWrapper animation="fade-up">
          <MeetYourAITeam />
        </ScrollRevealWrapper>
        
        {/* Compare NextGen OS */}
        <ScrollRevealWrapper animation="fade-up">
          <CompareNextGenOS />
        </ScrollRevealWrapper>
        
        {/* How It Scales */}
        <ScrollRevealWrapper animation="fade-up">
          <HowItScales />
        </ScrollRevealWrapper>
        
        {/* Partnership Models */}
        <ScrollRevealWrapper animation="fade-up">
          <PartnershipModels />
        </ScrollRevealWrapper>
        
        {/* Final CTA */}
        <ScrollRevealWrapper animation="fade-up">
          <FinalCTA />
        </ScrollRevealWrapper>
      </div>
    </Layout>
  );
};

export default NextGenOS;
