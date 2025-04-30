import React, { useRef } from 'react';
import Layout from '../components/Layout';
import { agents } from '@/data/agents';
import PricingSection from '../components/pricing/PricingSection';
import ResultsSection from '../components/results/ResultsSection';
import FounderSection from '../components/FounderSection';
import FooterCTA from '../components/FooterCTA';
import SuccessGuarantee from '../components/SuccessGuarantee';
import ResourcesSection from '../components/ResourcesSection';
import FAQSection from '../components/FAQSection';
import AcademyOverviewSection from '../components/AcademyOverviewSection';
import TestimonialsSectionEnhanced from '../components/TestimonialsSectionEnhanced';
import AnimatedGrainOverlay from '../components/effects/AnimatedGrainOverlay';
import SectionTransition from '../components/effects/SectionTransition';
import ScrollRevealWrapper from '../components/animation/ScrollRevealWrapper';
import CombinedSecurityIntegrationsSection from '../components/CombinedSecurityIntegrationsSection';
import AITeamSection from '../components/team/AiTeamSection';
import HeroWithScrollReveal from '../components/hero/HeroWithScrollReveal';

const Index = () => {
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    team: useRef<HTMLDivElement>(null),
    results: useRef<HTMLDivElement>(null),
    pricing: useRef<HTMLDivElement>(null)
  };

  return (
    <Layout>
      <div className="relative">
        {/* Global grain overlay with minimal opacity */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <AnimatedGrainOverlay opacity={0.03} />
        </div>
        
        {/* Enhanced Hero Section with scroll-triggered Boardroom experience */}
        <div ref={sectionRefs.hero} className="min-h-screen">
          <HeroWithScrollReveal />
        </div>
        
        {/* Visual separator with enhanced transition */}
        <div className="h-8 relative">
          <SectionTransition type="gradient" position="both" height={24} color="nextgen-dark" />
        </div>
        
        {/* Team Section with AITeamSection */}
        <div ref={sectionRefs.team} id="team" className="pt-20">
          <ScrollRevealWrapper animation="fade-up">
            <AITeamSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Results section with DisplayCards */}
        <div ref={sectionRefs.results}>
          <ScrollRevealWrapper animation="fade-up">
            <ResultsSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Testimonials section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-in">
            <TestimonialsSectionEnhanced />
          </ScrollRevealWrapper>
        </div>
        
        {/* Founder Section */}
        <ScrollRevealWrapper animation="fade-up">
          <FounderSection />
        </ScrollRevealWrapper>
        
        {/* Combined Security & Integrations Section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <CombinedSecurityIntegrationsSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Pricing Section */}
        <div ref={sectionRefs.pricing} className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <PricingSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Footer CTA */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <FooterCTA />
          </ScrollRevealWrapper>
        </div>
        
        {/* Academy Section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <AcademyOverviewSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Resources Section */}
        <div className="relative">
          <ScrollRevealWrapper animation="fade-up">
            <ResourcesSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Success Guarantee */}
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
