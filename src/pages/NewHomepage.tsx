
import React from 'react';
import Layout from '@/components/Layout';

// Import components
import HeroSection from '@/components/new-homepage/HeroSection';
import ProblemSection from '@/components/new-homepage/ProblemSection';
import SolutionSection from '@/components/new-homepage/SolutionSection';
import PillarsSection from '@/components/new-homepage/PillarsSection';
import BenefitsSection from '@/components/new-homepage/BenefitsSection';
import InvestmentSection from '@/components/new-homepage/InvestmentSection';
import SocialProofSection from '@/components/new-homepage/SocialProofSection';
import PrimaryCTASection from '@/components/new-homepage/PrimaryCTASection';
import ExploreMoreSection from '@/components/new-homepage/ExploreMoreSection';

const NewHomepage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Problem Section */}
      <ProblemSection />
      
      {/* Solution Section */}
      <SolutionSection />
      
      {/* The Pillars Section */}
      <PillarsSection />
      
      {/* Benefits & Outcomes Section */}
      <BenefitsSection />
      
      {/* Investment Section */}
      <InvestmentSection />
      
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
