
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import AITeamSection from '../components/AiTeamSection';
import PatientJourneySection from '../components/PatientJourneySection';
import ROISection from '../components/ROISection';
import PricingSection from '../components/PricingSection';
import SupportAndBenefits from '../components/SupportAndBenefits';
import SuccessGuarantee from '../components/SuccessGuarantee';
import IntegrationsSection from '../components/IntegrationsSection';
import FounderSection from '../components/FounderSection';
import ResourcesSection from '../components/ResourcesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import FooterCTA from '../components/FooterCTA';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AITeamSection />
      <PatientJourneySection />
      <IntegrationsSection />
      <ROISection />
      <FooterCTA />
      <PricingSection />
      <SupportAndBenefits />
      <SuccessGuarantee />
      <FounderSection />
      <ResourcesSection />
      <TestimonialsSection />
      <FAQSection />
    </Layout>
  );
};

export default Index;
