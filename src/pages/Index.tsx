
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import AITeamSection from '../components/AiTeamSection';
import PatientJourneySection from '../components/PatientJourneySection';
import HealthcareSecuritySection from '../components/HealthcareSecuritySection';
import IntegrationsSection from '../components/IntegrationsSection';
import AcademyOverviewSection from '../components/AcademyOverviewSection';
import ROISection from '../components/ROISection';
import FooterCTA from '../components/FooterCTA';
import PricingSection from '../components/PricingSection';
import SupportAndBenefits from '../components/SupportAndBenefits';
import SuccessGuarantee from '../components/SuccessGuarantee';
import FounderSection from '../components/FounderSection';
import ResourcesSection from '../components/ResourcesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AITeamSection />
      <PatientJourneySection />
      <HealthcareSecuritySection />
      <IntegrationsSection />
      <AcademyOverviewSection />
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
