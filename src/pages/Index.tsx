
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import AIBoardroomSection from '../components/AIBoardroomSection';
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
import WhyWeBuiltSection from '../components/story/WhyWeBuiltSection';
import AgentResultsSection from '../components/results/AgentResultsSection';
import GooeyFilterTabs from '../components/team/GooeyFilterTabs';
import StoryAndFounderSection from '../components/StoryAndFounderSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WhyWeBuiltSection />
      <GooeyFilterTabs />
      <AIBoardroomSection />
      <AgentResultsSection />
      <HealthcareSecuritySection />
      <AcademyOverviewSection />
      <ROISection />
      <FooterCTA />
      <PricingSection />
      <StoryAndFounderSection />
      <IntegrationsSection />
      <SuccessGuarantee />
      <ResourcesSection />
      <TestimonialsSection />
      <FAQSection />
    </Layout>
  );
};

export default Index;
