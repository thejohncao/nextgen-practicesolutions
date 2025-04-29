
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import GooeyFilterTabs from '../components/team/GooeyFilterTabs';
import DemoResultsSection from '../components/DemoResultsSection';
import ROISection from '../components/ROISection';
import HealthcareSecuritySection from '../components/HealthcareSecuritySection';
import AcademyOverviewSection from '../components/AcademyOverviewSection';
import FooterCTA from '../components/FooterCTA';
import PricingSection from '../components/pricing/PricingSection';
import PricingPackages from '../components/pricing/PricingPackages';
import IntegrationsSection from '../components/IntegrationsSection';
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
      
      {/* ROI section that consolidates the emotional benefits */}
      <ROISection />
      <HealthcareSecuritySection />
      <AcademyOverviewSection />
      <FooterCTA />
      
      {/* Unified Pricing/Unlock Section */}
      <PricingSection />
      <div className="bg-nextgen-dark">
        <div className="container mx-auto px-4">
          <PricingPackages />
        </div>
      </div>
      
      <IntegrationsSection />
      <SuccessGuarantee />
      <ResourcesSection />
      <TestimonialsSection />
      <FAQSection />
    </Layout>
  );
};

export default Index;
