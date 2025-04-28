
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

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      
      {/* Meet the AI Team section with improved folder-style UI */}
      <GooeyFilterTabs />
      
      {/* Visual separator between dark and light sections */}
      <div className="h-8 bg-gradient-to-b from-black/60 to-white"></div>
      
      {/* Enhanced Demo + Results section */}
      <DemoResultsSection />
      
      {/* Visual separator between light and dark sections */}
      <div className="h-8 bg-gradient-to-b from-white to-nextgen-dark"></div>
      
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
