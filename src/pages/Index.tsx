
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import GooeyFilterTabs from '../components/team/GooeyFilterTabs';
import DemoResultsSection from '../components/DemoResultsSection';
import ROISection from '../components/ROISection';
import AcademyOverviewSection from '../components/AcademyOverviewSection';
import FooterCTA from '../components/FooterCTA';
import PricingSection from '../components/pricing/PricingSection';
import CombinedSecurityIntegrationsSection from '../components/CombinedSecurityIntegrationsSection';
import ConnectedAITeamSection from '../components/integrations/ConnectedAITeamSection';
import SuccessGuarantee from '../components/SuccessGuarantee';
import ResourcesSection from '../components/ResourcesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import AgentResultsSection from '../components/results/AgentResultsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      
      {/* Meet the AI Team section with improved folder-style UI */}
      <GooeyFilterTabs />
      
      {/* Visual separator between dark sections */}
      <div className="h-8 bg-gradient-to-b from-black/80 to-[#121212]"></div>
      
      {/* Enhanced Demo + Results section with dark mode */}
      <DemoResultsSection />
      
      {/* Visual separator between dark sections */}
      <div className="h-8 bg-gradient-to-b from-[#121212] to-nextgen-dark"></div>
      
      {/* New Results section with vertical sliders */}
      <AgentResultsSection />
      
      {/* Connected AI Team Section - NEW */}
      <ConnectedAITeamSection />
      
      {/* Combined Security & Integrations Section - now with enhanced design */}
      <CombinedSecurityIntegrationsSection />
      
      {/* Footer CTA moved above Pricing section */}
      <FooterCTA />
      
      {/* Unified Pricing/Unlock Section */}
      <PricingSection />
      
      {/* Moved ROI section below Pricing section */}
      <ROISection />
      
      {/* Resources Section */}
      <ResourcesSection />
      
      {/* Moved Academy section below Resources */}
      <AcademyOverviewSection />
      
      {/* Success Guarantee moved above FAQ */}
      <SuccessGuarantee />
      
      {/* FAQ Section */}
      <FAQSection />
      
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
