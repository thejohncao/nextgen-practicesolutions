
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

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      {/* Move AI Team section right after hero */}
      <GooeyFilterTabs />
      {/* Combined Demo + Results section */}
      <DemoResultsSection />
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
