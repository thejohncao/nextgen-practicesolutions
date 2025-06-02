
import React from 'react';
import Layout from '../components/Layout';
import DemoHero from '../components/demo/DemoHero';
import ProblemSection from '../components/demo/ProblemSection';
import GooeyFilterTabs from '../components/team/GooeyFilterTabs';
import BoardroomTimeline from '../components/boardroom/BoardroomTimeline';
import WhoWeHelpDemo from '../components/demo/WhoWeHelpDemo';
import AcademyOverview from '../components/demo/AcademyOverview';
import HowItWorksDemo from '../components/demo/HowItWorksDemo';
import FounderStory from '../components/demo/FounderStory';
import PricingPlans from '../components/demo/PricingPlans';
import DemoFinalCTA from '../components/demo/DemoFinalCTA';
import ScrollRevealWrapper from '../components/animation/ScrollRevealWrapper';
import ROISection from '../components/ROISection';
import BoardroomUnlockFlow from '../components/pricing/BoardroomUnlockFlow';
import CertificationPathway from '../components/demo/CertificationPathway';
import CertificationCards from '../components/certifications/CertificationCards';

// Import Academy sections
import CertificationSection from '../components/academy/CertificationSection';
import NextGenJourney from '../components/academy/NextGenJourney';
import HowItWorks from '../components/academy/HowItWorks';
import CurriculumOverview from '../components/academy/CurriculumOverview';

const Demo = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <DemoHero />
      
      {/* The Problem We Solve */}
      <ScrollRevealWrapper animation="fade-up">
        <ProblemSection />
      </ScrollRevealWrapper>
      
      {/* NextGen Academy - Moved here after Problem Section */}
      <ScrollRevealWrapper animation="fade-up">
        <AcademyOverview />
      </ScrollRevealWrapper>
      
      {/* Meet the AI Team - Interactive Tabs */}
      <ScrollRevealWrapper animation="fade-up">
        <GooeyFilterTabs />
      </ScrollRevealWrapper>
      
      {/* Boardroom Timeline */}
      <ScrollRevealWrapper animation="fade-up">
        <BoardroomTimeline />
      </ScrollRevealWrapper>
      
      {/* Who We Help */}
      <ScrollRevealWrapper animation="fade-up">
        <WhoWeHelpDemo />
      </ScrollRevealWrapper>
      
      {/* AI Boardroom Unlock Flow */}
      <ScrollRevealWrapper animation="fade-up">
        <BoardroomUnlockFlow />
      </ScrollRevealWrapper>
      
      {/* Earn Your Official NextGen Certification */}
      <ScrollRevealWrapper animation="fade-up">
        <CertificationSection />
      </ScrollRevealWrapper>
      
      {/* Your Journey, Simplified */}
      <ScrollRevealWrapper animation="fade-up">
        <NextGenJourney />
      </ScrollRevealWrapper>
      
      {/* How It Works */}
      <ScrollRevealWrapper animation="fade-up">
        <HowItWorks />
      </ScrollRevealWrapper>
      
      {/* What You'll Learn */}
      <ScrollRevealWrapper animation="fade-up">
        <CurriculumOverview />
      </ScrollRevealWrapper>
      
      {/* Certification Cards - What You Can Earn */}
      <ScrollRevealWrapper animation="fade-up">
        <CertificationCards />
      </ScrollRevealWrapper>
      
      {/* Certification Pathway */}
      <ScrollRevealWrapper animation="fade-up">
        <CertificationPathway />
      </ScrollRevealWrapper>
      
      {/* How It Works Demo - Original Section */}
      <ScrollRevealWrapper animation="fade-up">
        <HowItWorksDemo />
      </ScrollRevealWrapper>
      
      {/* ROI Section - Enhanced version from home page */}
      <ScrollRevealWrapper animation="fade-up">
        <ROISection />
      </ScrollRevealWrapper>
      
      {/* About the Founder */}
      <ScrollRevealWrapper animation="fade-up">
        <FounderStory />
      </ScrollRevealWrapper>
      
      {/* Pricing Plans */}
      <ScrollRevealWrapper animation="fade-up">
        <PricingPlans />
      </ScrollRevealWrapper>
      
      {/* Final CTA */}
      <ScrollRevealWrapper animation="fade-up">
        <DemoFinalCTA />
      </ScrollRevealWrapper>
    </Layout>
  );
};

export default Demo;
