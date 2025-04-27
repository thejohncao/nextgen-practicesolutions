
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import AITeamSection from '../components/AiTeamSection';
import PatientJourneySection from '../components/PatientJourneySection';
import HealthcareSecuritySection from '../components/HealthcareSecuritySection';
import AcademyOverviewSection from '../components/AcademyOverviewSection';
import FounderSection from '../components/FounderSection';
import PrePricingCTA from '../components/PrePricingCTA';
import PricingSection from '../components/PricingSection';
import SupportAndBenefits from '../components/SupportAndBenefits';
import SuccessGuarantee from '../components/SuccessGuarantee';
import FAQSection from '../components/FAQSection';
import FinalCTA from '../components/FinalCTA';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AITeamSection />
      <PatientJourneySection />
      <HealthcareSecuritySection />
      <AcademyOverviewSection />
      <FounderSection />
      <PrePricingCTA />
      <PricingSection />
      <SupportAndBenefits />
      <SuccessGuarantee />
      <FAQSection />
      <FinalCTA />
    </Layout>
  );
};

export default Index;
