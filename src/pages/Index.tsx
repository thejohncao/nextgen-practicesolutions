
import React, { useRef } from 'react';
import Layout from '../components/Layout';
import EnhancedHero from '../components/hero/EnhancedHero';
import GooeyFilterTabs from '../components/team/GooeyFilterTabs';
import ROISection from '../components/ROISection';
import AcademyOverviewSection from '../components/AcademyOverviewSection';
import FooterCTA from '../components/FooterCTA';
import CombinedSecurityIntegrationsSection from '../components/CombinedSecurityIntegrationsSection';
import SuccessGuarantee from '../components/SuccessGuarantee';
import ResourcesSection from '../components/ResourcesSection';
import FAQSection from '../components/FAQSection';
import AnimatedGrainOverlay from '../components/effects/AnimatedGrainOverlay';
import SectionTransition from '../components/effects/SectionTransition';
import ParallaxSection from '../components/effects/ParallaxSection';
import ScrollRevealWrapper from '../components/animation/ScrollRevealWrapper';

// Import BoardroomTimeline
import BoardroomTimeline from '../components/boardroom/BoardroomTimeline';
// Import HowItWorksDemo
import HowItWorksDemo from '../components/demo/HowItWorksDemo';

// Import new homepage sections
import WhoWeHelpSection from '../components/new-homepage/WhoWeHelpSection';
import WhatWeOfferSection from '../components/new-homepage/WhatWeOfferSection';
import PatientJourneySection from '../components/new-homepage/PatientJourneySection';

const Index = () => {
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    team: useRef<HTMLDivElement>(null),
    journey: useRef<HTMLDivElement>(null),
    academy: useRef<HTMLDivElement>(null)
  };

  return (
    <Layout>
      <div className="relative">
        {/* Global grain overlay with minimal opacity */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <AnimatedGrainOverlay opacity={0.03} />
        </div>
        
        {/* 1. Hero Section */}
        <div ref={sectionRefs.hero}>
          <EnhancedHero />
        </div>
        
        {/* 2. Meet Your AI Team section */}
        <div ref={sectionRefs.team} className="relative">
          <ParallaxSection>
            <ScrollRevealWrapper animation="fade-up">
              <GooeyFilterTabs />
            </ScrollRevealWrapper>
          </ParallaxSection>
        </div>
        
        {/* Add BoardroomTimeline after Meet AI Team */}
        <div className="relative">
          <ParallaxSection>
            <ScrollRevealWrapper animation="fade-up">
              <BoardroomTimeline />
            </ScrollRevealWrapper>
          </ParallaxSection>
        </div>
        
        {/* Visual separator */}
        <div className="h-8 relative">
          <SectionTransition type="gradient" position="both" height={24} color="nextgen-dark" />
        </div>
        
        {/* 3. Built to Run the Full Patient Journey */}
        <div ref={sectionRefs.journey} className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <PatientJourneySection />
          </ScrollRevealWrapper>
        </div>
        
        {/* 4. The World's First AI Academy for Dental Practices */}
        <div ref={sectionRefs.academy} className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <AcademyOverviewSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Add How It Works: From Training to Transformation */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <HowItWorksDemo />
          </ScrollRevealWrapper>
        </div>
        
        {/* Visual separator */}
        <div className="h-8 relative">
          <SectionTransition type="parallax" position="both" height={24} />
        </div>
        
        {/* 5. Who We Help Section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <WhoWeHelpSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* 6. What We Offer Section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <WhatWeOfferSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* 7. ROI Snapshot */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <ROISection />
          </ScrollRevealWrapper>
        </div>
        
        {/* 8. Enterprise-Grade Security, Built for Healthcare */}
        <div className="relative">
          <ParallaxSection>
            <ScrollRevealWrapper animation="fade-up">
              <CombinedSecurityIntegrationsSection />
            </ScrollRevealWrapper>
          </ParallaxSection>
        </div>
        
        {/* 9. Our Success Guarantee */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <section className="py-20 bg-nextgen-dark">
              <div className="container mx-auto px-4">
                <SuccessGuarantee />
              </div>
            </section>
          </ScrollRevealWrapper>
        </div>
        
        {/* 10. Ready to Run Your Practice Like a Fortune 500? */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <FooterCTA />
          </ScrollRevealWrapper>
        </div>
        
        {/* 11. Free Resources */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <ResourcesSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* 12. Frequently Asked Questions */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <FAQSection />
          </ScrollRevealWrapper>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
