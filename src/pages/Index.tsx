
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import GooeyFilterTabs from '../components/team/GooeyFilterTabs';
import AgentResultsSection from '../components/results/AgentResultsSection';
import HealthcareSecuritySection from '../components/HealthcareSecuritySection';
import AcademyOverviewSection from '../components/AcademyOverviewSection';
import ROISection from '../components/ROISection';
import FooterCTA from '../components/FooterCTA';
import PricingSection from '../components/PricingSection';
import IntegrationsSection from '../components/IntegrationsSection';
import SuccessGuarantee from '../components/SuccessGuarantee';
import ResourcesSection from '../components/ResourcesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import StoryAndFounderSection from '../components/StoryAndFounderSection';
import DemoResultsSection from '../components/DemoResultsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <GooeyFilterTabs />
      <DemoResultsSection />
      <ROISection />
      <HealthcareSecuritySection />
      <AcademyOverviewSection />
      <PricingSection />
      <StoryAndFounderSection />
      <IntegrationsSection />
      <SuccessGuarantee />
      <ResourcesSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterCTA />
    </Layout>
  );
};

export default Index;
