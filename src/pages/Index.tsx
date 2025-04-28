
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import AITeamSection from '../components/AiTeamSection';
import AIBoardroomSection from '../components/AIBoardroomSection';
import HealthcareSecuritySection from '../components/HealthcareSecuritySection';
import AcademyOverviewSection from '../components/AcademyOverviewSection';
import ROISection from '../components/ROISection';
import FooterCTA from '../components/FooterCTA';
import PricingSection from '../components/PricingSection';
import IntegrationsSection from '../components/IntegrationsSection';
import SuccessGuarantee from '../components/SuccessGuarantee';
import FounderSection from '../components/FounderSection';
import ResourcesSection from '../components/ResourcesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import WhyWeBuiltSection from '../components/story/WhyWeBuiltSection';
import TeamResultsSection from '../components/TeamResultsSection';
import TabbedAgentSection from '../components/journey/TabbedAgentSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WhyWeBuiltSection />
      <TabbedAgentSection />
      <AITeamSection />
      <AIBoardroomSection />
      <TeamResultsSection />
      <HealthcareSecuritySection />
      <AcademyOverviewSection />
      <ROISection />
      <FooterCTA />
      <PricingSection />
      <IntegrationsSection />
      <SuccessGuarantee />
      <FounderSection />
      <ResourcesSection />
      <TestimonialsSection />
      <FAQSection />
    </Layout>
  );
};

export default Index;
