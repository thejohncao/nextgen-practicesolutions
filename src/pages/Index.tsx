
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
import ScrollSection from '../components/providers/ScrollSection';

const Index = () => {
  return (
    <Layout>
      <ScrollSection fullScreen id="hero">
        <HeroSection />
      </ScrollSection>
      
      {/* Meet the AI Team section with improved folder-style UI */}
      <ScrollSection id="ai-team" className="bg-black/60 backdrop-blur-sm py-16">
        <GooeyFilterTabs />
      </ScrollSection>
      
      {/* Visual separator between dark and light sections */}
      <div className="h-8 bg-gradient-to-b from-black/60 to-white"></div>
      
      {/* Combined Demo + Results section with white background */}
      <ScrollSection id="demo-results" className="bg-white py-16">
        <DemoResultsSection />
      </ScrollSection>
      
      {/* Visual separator between light and dark sections */}
      <div className="h-8 bg-gradient-to-b from-white to-nextgen-dark"></div>
      
      {/* ROI section with emotional benefits */}
      <ScrollSection id="roi">
        <ROISection />
      </ScrollSection>
      
      <ScrollSection id="security">
        <HealthcareSecuritySection />
      </ScrollSection>
      
      <ScrollSection id="academy">
        <AcademyOverviewSection />
      </ScrollSection>
      
      <ScrollSection id="cta">
        <FooterCTA />
      </ScrollSection>
      
      <ScrollSection id="pricing">
        <PricingSection />
      </ScrollSection>
      
      <ScrollSection id="integrations">
        <IntegrationsSection />
      </ScrollSection>
      
      <ScrollSection id="guarantee">
        <SuccessGuarantee />
      </ScrollSection>
      
      <ScrollSection id="resources">
        <ResourcesSection />
      </ScrollSection>
      
      <ScrollSection id="testimonials">
        <TestimonialsSection />
      </ScrollSection>
      
      <ScrollSection id="faq">
        <FAQSection />
      </ScrollSection>
    </Layout>
  );
};

export default Index;
