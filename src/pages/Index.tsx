
import React from 'react';
import Layout from '../components/Layout';
import PricingSection from '../components/pricing/PricingSection';
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
import EnhancedHeroSection from '../components/hero/EnhancedHeroSection';
import PatientJourney from '../components/patient-journey/PatientJourney';
import BoardroomDemo from '../components/boardroom/BoardroomDemo';
import ResultsSection from '../components/results/ResultsSection';
import { useIntersectionAnimation } from '../hooks/useIntersectionAnimation';

const Index = () => {
  const [boardroomRef, isBoardroomVisible] = useIntersectionAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });
  
  const handleScrollToTeam = () => {
    const teamSection = document.getElementById('team');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      <div className="relative">
        {/* Global grain overlay with minimal opacity */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <AnimatedGrainOverlay opacity={0.03} />
        </div>
        
        {/* Enhanced Hero Section */}
        <EnhancedHeroSection />
        
        {/* Inside the Boardroom Section */}
        <div ref={boardroomRef} className="bg-black relative">
          <SectionTransition type="wave" position="top" height={64} color="transparent" />
          <BoardroomDemo 
            activated={isBoardroomVisible} 
            onTeamButtonClick={handleScrollToTeam}
          />
          <SectionTransition type="gradient" position="bottom" height={24} color="nextgen-dark" />
        </div>
        
        {/* Team Section with AITeamSection */}
        <div id="team" className="pt-20">
          <ScrollRevealWrapper animation="fade-up">
            <AITeamSection />
          </ScrollRevealWrapper>
        </div>
        
        {/* Patient Journey - unified component */}
        <ScrollRevealWrapper animation="fade-up">
          <PatientJourney variant="timeline" />
        </ScrollRevealWrapper>
        
        {/* Results section with DisplayCards */}
        <ResultsSection />
        
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
        <div className="relative">
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
