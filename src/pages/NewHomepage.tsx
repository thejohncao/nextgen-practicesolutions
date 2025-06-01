
import React from 'react';
import Layout from '@/components/Layout';

// Import components
import HeroSection from '@/components/new-homepage/HeroSection';
import WhoWeHelpSection from '@/components/new-homepage/WhoWeHelpSection';
import WhatWeOfferSection from '@/components/new-homepage/WhatWeOfferSection';
import InsideAcademySection from '@/components/new-homepage/InsideAcademySection';
import PartnerPracticesSection from '@/components/new-homepage/PartnerPracticesSection';
import PatientJourneySection from '@/components/new-homepage/PatientJourneySection';
import SuccessMetricsSection from '@/components/new-homepage/SuccessMetricsSection';
import JobBoardSection from '@/components/new-homepage/JobBoardSection';
import SocialProofSection from '@/components/new-homepage/SocialProofSection';
import PrimaryCTASection from '@/components/new-homepage/PrimaryCTASection';
import ExploreMoreSection from '@/components/new-homepage/ExploreMoreSection';

const NewHomepage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Who We Help Section */}
      <WhoWeHelpSection />
      
      {/* What We Offer Section */}
      <WhatWeOfferSection />
      
      {/* Inside the Academy Section */}
      <InsideAcademySection />
      
      {/* Patient Journey Timeline */}
      <PatientJourneySection />
      
      {/* Success Metrics / ROI Snapshot */}
      <SuccessMetricsSection />
      
      {/* Partner Practices Section */}
      <PartnerPracticesSection />
      
      {/* Job Board Section */}
      <JobBoardSection />
      
      {/* Social Proof & Credibility Section */}
      <SocialProofSection />
      
      {/* Primary CTA Section */}
      <PrimaryCTASection />
      
      {/* Footer */}
      <ExploreMoreSection />
    </Layout>
  );
};

export default NewHomepage;
