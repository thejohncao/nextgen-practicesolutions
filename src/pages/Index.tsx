
import React, { useRef } from 'react';
import Layout from '../components/Layout';
import EnhancedHero from '../components/hero/EnhancedHero';
import GooeyFilterTabs from '../components/team/GooeyFilterTabs';
import DemoResultsSection from '../components/DemoResultsSection';
import ROISection from '../components/ROISection';
import AcademyOverviewSection from '../components/AcademyOverviewSection';
import FooterCTA from '../components/FooterCTA';
import CombinedSecurityIntegrationsSection from '../components/CombinedSecurityIntegrationsSection';
import SuccessGuarantee from '../components/SuccessGuarantee';
import ResourcesSection from '../components/ResourcesSection';
import FAQSection from '../components/FAQSection';
import AgentResultsSection from '../components/results/AgentResultsSection';
import TestimonialsSectionEnhanced from '../components/TestimonialsSectionEnhanced';
import AnimatedGrainOverlay from '../components/effects/AnimatedGrainOverlay';
import PricingSection from '../components/pricing/PricingSection';
import SectionTransition from '../components/effects/SectionTransition';
import ParallaxSection from '../components/effects/ParallaxSection';
import ScrollRevealWrapper from '../components/animation/ScrollRevealWrapper';
import BoardroomTimeline from '../components/boardroom/BoardroomTimeline';

// Import new homepage sections
import WhoWeHelpSection from '../components/new-homepage/WhoWeHelpSection';
import WhatWeOfferSection from '../components/new-homepage/WhatWeOfferSection';
import InsideAcademySection from '../components/new-homepage/InsideAcademySection';
import PartnerPracticesSection from '../components/new-homepage/PartnerPracticesSection';
import PatientJourneySection from '../components/new-homepage/PatientJourneySection';
import SuccessMetricsSection from '../components/new-homepage/SuccessMetricsSection';
import JobBoardSection from '../components/new-homepage/JobBoardSection';
import PrimaryCTASection from '../components/new-homepage/PrimaryCTASection';

const Index = () => {
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    team: useRef<HTMLDivElement>(null),
    results: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
    pricing: useRef<HTMLDivElement>(null)
  };

  return (
    <Layout>
      <div className="relative">
        {/* Global grain overlay with minimal opacity */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <AnimatedGrainOverlay opacity={0.03} />
        </div>
        
        {/* Enhanced Hero Section */}
        <div ref={sectionRefs.hero}>
          <EnhancedHero />
        </div>
        
        {/* Who We Help Section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <WhoWeHelpSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* What We Offer Section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <WhatWeOfferSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Inside the Academy Section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <InsideAcademySection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Patient Journey Timeline */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <PatientJourneySection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Success Metrics / ROI Snapshot */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <SuccessMetricsSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Partner Practices Section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <PartnerPracticesSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Job Board Section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <JobBoardSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* New Boardroom Timeline Section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <BoardroomTimeline />
          </ScrollRevealWrapper>
        </div>
        
        {/* Meet the AI Team section with improved folder-style UI */}
        <div ref={sectionRefs.team} className="relative">
          <ParallaxSection>
            <ScrollRevealWrapper animation="fade-up">
              <GooeyFilterTabs />
            </ScrollRevealWrapper>
          </ParallaxSection>
        </div>
        
        {/* Visual separator with enhanced transition */}
        <div className="h-8 relative">
          <SectionTransition type="gradient" position="both" height={24} color="nextgen-dark" />
        </div>
        
        {/* Enhanced Demo + Results section with dark mode */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <DemoResultsSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Visual separator between dark sections */}
        <div className="h-8 relative">
          <SectionTransition type="parallax" position="both" height={24} />
        </div>
        
        {/* New Results section with vertical sliders */}
        <div ref={sectionRefs.results} className="relative">
          <ParallaxSection>
            <ScrollRevealWrapper animation="fade-up">
              <AgentResultsSection />
            </ScrollRevealWrapper>
          </ParallaxSection>
        </div>
        
        {/* Testimonials section with Bento grid layout - Enhanced with scroll animations */}
        <div ref={sectionRefs.testimonials} className="relative">
          <ScrollRevealWrapper animation="fade-in">
            <TestimonialsSectionEnhanced />
          </ScrollRevealWrapper>
        </div>
        
        {/* Moved ROI section after Connected AI Team section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <ROISection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Combined Security & Integrations Section - now with enhanced design */}
        <div className="relative">
          <ParallaxSection>
            <ScrollRevealWrapper animation="fade-up">
              <CombinedSecurityIntegrationsSection />
            </ScrollRevealWrapper>
          </ParallaxSection>
        </div>
        
        {/* Pricing Section added back to the homepage */}
        <div ref={sectionRefs.pricing} className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <PricingSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Primary CTA Section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <PrimaryCTASection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Footer CTA moved above Pricing section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <FooterCTA />
          </ScrollRevealWrapper>
        </div>
        
        {/* Resources Section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <ResourcesSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Moved Academy section below Resources */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <AcademyOverviewSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Success Guarantee moved above FAQ */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <SuccessGuarantee />
          </ScrollRevealWrapper>
        </div>
        
        {/* FAQ Section */}
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
