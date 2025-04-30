
import React, { useRef, useEffect, useState } from 'react';
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
import EnhancedHeroSection from '../components/hero/EnhancedHeroSection';
import PatientJourney from '../components/patient-journey/PatientJourney';
import BoardroomDemo from '../components/boardroom/BoardroomDemo';
import { useSectionScrollProgress } from '../hooks/useIntersectionAnimation';

const Index = () => {
  const [showBoardroom, setShowBoardroom] = useState(false);
  const [sectionRef, progress] = useSectionScrollProgress<HTMLDivElement>();
  
  // Show boardroom when scrolled to a certain point
  useEffect(() => {
    setShowBoardroom(progress > 0.3);
  }, [progress]);
  
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
        
        {/* Enhanced Hero Section with scroll-triggered Boardroom experience */}
        <div ref={sectionRef} className="min-h-[150vh]">
          {/* Initial hero view */}
          <div className={`min-h-screen sticky top-0 transition-opacity duration-700 ${showBoardroom ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <EnhancedHeroSection />
          </div>
          
          {/* Boardroom experience - revealed on scroll */}
          <div 
            className={`min-h-screen sticky top-0 flex items-center transition-opacity duration-700 ${showBoardroom ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="container mx-auto px-4 pt-16 pb-4 relative z-10">
              <ScrollRevealWrapper animation="fade-up">
                <BoardroomDemo 
                  activated={showBoardroom} 
                  onTeamButtonClick={handleScrollToTeam}
                />
              </ScrollRevealWrapper>
            </div>
          </div>
        </div>
        
        {/* Visual separator with enhanced transition */}
        <div className="h-8 relative">
          <SectionTransition type="gradient" position="both" height={24} color="nextgen-dark" />
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
        <ScrollRevealWrapper animation="fade-up">
          <ResultsSection />
        </ScrollRevealWrapper>
        
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
