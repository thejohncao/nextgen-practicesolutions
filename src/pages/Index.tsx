
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
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
import TestimonialsSection from '../components/TestimonialsSection';
import AnimatedGrainOverlay from '../components/effects/AnimatedGrainOverlay';

const Index = () => {
  return (
    <Layout>
      <div className="relative">
        {/* Global grain overlay with minimal opacity */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <AnimatedGrainOverlay opacity={0.03} />
        </div>
        
        <HeroSection />
        
        {/* Meet the AI Team section with improved folder-style UI */}
        <div className="relative">
          <GooeyFilterTabs />
        </div>
        
        {/* Visual separator between dark sections */}
        <div className="h-8 bg-gradient-to-b from-black/80 to-[#121212] relative"></div>
        
        {/* Enhanced Demo + Results section with dark mode */}
        <div className="relative">
          <DemoResultsSection />
        </div>
        
        {/* Visual separator between dark sections */}
        <div className="h-8 bg-gradient-to-b from-[#121212] to-nextgen-dark relative"></div>
        
        {/* New Results section with vertical sliders */}
        <div className="relative">
          <AgentResultsSection />
        </div>
        
        {/* Testimonials section with Bento grid layout */}
        <TestimonialsSection />
        
        {/* Moved ROI section after Connected AI Team section */}
        <div className="relative">
          <ROISection />
        </div>
        
        {/* Combined Security & Integrations Section - now with enhanced design */}
        <div className="relative">
          <CombinedSecurityIntegrationsSection />
        </div>
        
        {/* Footer CTA moved above Pricing section */}
        <div className="relative">
          <FooterCTA />
        </div>
        
        {/* Resources Section */}
        <div className="relative">
          <ResourcesSection />
        </div>
        
        {/* Moved Academy section below Resources */}
        <div className="relative">
          <AcademyOverviewSection />
        </div>
        
        {/* Success Guarantee moved above FAQ */}
        <div className="relative">
          <SuccessGuarantee />
        </div>
        
        {/* FAQ Section */}
        <div className="relative">
          <FAQSection />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
