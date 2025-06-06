
import React from 'react';
import Layout from '../components/Layout';
import JuvHero from '../components/juv/JuvHero';
import JuvAboutBuilder from '../components/juv/JuvAboutBuilder';
import JuvSystemPowers from '../components/juv/JuvSystemPowers';
import JuvAiExecutiveTeam from '../components/juv/JuvAiExecutiveTeam';
import JuvTeamReplacementROI from '../components/juv/JuvTeamReplacementROI';
import JuvRoadmap from '../components/juv/JuvRoadmap';
import JuvModel from '../components/juv/JuvModel';
import JuvFounderAlignment from '../components/juv/JuvFounderAlignment';
import JuvClosingStatement from '../components/juv/JuvClosingStatement';
import JuvSecurityIntegrations from '../components/juv/JuvSecurityIntegrations';
import JuvOwnershipModels from '../components/juv/JuvOwnershipModels';
import JuvClosingCTA from '../components/juv/JuvClosingCTA';
import CombinedSecurityIntegrationsSection from '../components/CombinedSecurityIntegrationsSection';
import ScrollRevealWrapper from '../components/animation/ScrollRevealWrapper';
import ParallaxSection from '../components/effects/ParallaxSection';
import AnimatedGrainOverlay from '../components/effects/AnimatedGrainOverlay';

const Juv = () => {
  return (
    <Layout>
      <div className="relative">
        {/* Global grain overlay with minimal opacity */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <AnimatedGrainOverlay opacity={0.03} />
        </div>
        
        {/* Hero Section */}
        <JuvHero />
        
        {/* About the Builder */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <JuvAboutBuilder />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* What NextGen Powers for JUV */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <JuvSystemPowers />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* AI Executive Team */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <JuvAiExecutiveTeam />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* Team Replacement ROI Chart */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <JuvTeamReplacementROI />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* Roadmap to $100M Exit */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <JuvRoadmap />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* The Model */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <JuvModel />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* Founder Alignment */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <JuvFounderAlignment />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* Closing Statement - Visual divider */}
        <ScrollRevealWrapper animation="fade-up">
          <JuvClosingStatement />
        </ScrollRevealWrapper>
        
        {/* Security & Integrations - Original section */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <JuvSecurityIntegrations />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* Combined Security & Integrations - Enhanced section */}
        <CombinedSecurityIntegrationsSection />
        
        {/* Ownership Models - moved to last position */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <JuvOwnershipModels />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* Closing CTA */}
        <ScrollRevealWrapper animation="fade-up">
          <JuvClosingCTA />
        </ScrollRevealWrapper>
      </div>
    </Layout>
  );
};

export default Juv;
