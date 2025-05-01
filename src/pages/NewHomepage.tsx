
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
import DifferentiatorsSection from '@/components/new-homepage/DifferentiatorsSection';
import AITeamOrbital from '@/components/orbital/AITeamOrbital';

const NewHomepage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Problem Section */}
      <ProblemSection />
      
      {/* Solution Section */}
      <SolutionSection />
      
      {/* AI Team Orbital Section */}
      <section className="py-24 bg-gradient-to-b from-black/90 to-nextgen-dark/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Meet Your AI Executive Team
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Four AI specialists, each focused on a different area of your practice growth.
              Click an agent to start chatting with your new executive team.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <AITeamOrbital />
          </div>
        </div>
      </section>
      
      {/* The Pillars Section */}
      <PillarsSection />
      
      {/* Benefits & Outcomes Section */}
      <BenefitsSection />
      
      {/* Differentiators Section */}
      <DifferentiatorsSection />
      
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
