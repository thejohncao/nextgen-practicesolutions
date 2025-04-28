
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import GooeyFilterTabs from '../components/team/GooeyFilterTabs';
import DemoResultsSection from '../components/DemoResultsSection';
import ROISection from '../components/ROISection';
import HealthcareSecuritySection from '../components/HealthcareSecuritySection';
import AcademyOverviewSection from '../components/AcademyOverviewSection';
import FooterCTA from '../components/FooterCTA';
import PricingSection from '../components/PricingSection';
import IntegrationsSection from '../components/IntegrationsSection';
import SuccessGuarantee from '../components/SuccessGuarantee';
import ResourcesSection from '../components/ResourcesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import MarqueeResultsSection from '../components/results/MarqueeResultsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      
      {/* Meet the AI Team section with improved folder-style UI */}
      <GooeyFilterTabs />
      
      {/* Visual separator between dark and light sections */}
      <div className="h-8 bg-gradient-to-b from-black/60 to-white"></div>
      
      {/* Demo + Results section with white background */}
      <DemoResultsSection />

      {/* New Marquee Results section */}
      <MarqueeResultsSection />
      
      {/* Visual separator between light and dark sections */}
      <div className="h-8 bg-gradient-to-b from-white to-nextgen-dark"></div>
      
      {/* ROI section that consolidates the emotional benefits */}
      <ROISection />
      <HealthcareSecuritySection />
      <AcademyOverviewSection />
      <FooterCTA />
      <PricingSection />
      <IntegrationsSection />
      <SuccessGuarantee />
      <ResourcesSection />
      <TestimonialsSection />
      <FAQSection />
    </Layout>
  );
};

export default Index;
