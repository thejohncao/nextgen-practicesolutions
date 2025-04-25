
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AITeamSection from '../components/AiTeamSection';
import PatientJourneySection from '../components/PatientJourneySection';
import ROISection from '../components/ROISection';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import IntegrationsSection from '../components/IntegrationsSection';
import FounderSection from '../components/FounderSection';
import ResourcesSection from '../components/ResourcesSection';
import FAQSection from '../components/FAQSection';
import FooterCTA from '../components/FooterCTA';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-nextgen-dark text-white">
      <Navbar />
      <HeroSection />
      <AITeamSection />
      <PatientJourneySection />
      <ROISection />
      <TestimonialsSection />
      <PricingSection />
      <IntegrationsSection />
      <FounderSection />
      <ResourcesSection />
      <FAQSection />
      <FooterCTA />
      <Footer />
    </div>
  );
};

export default Index;
