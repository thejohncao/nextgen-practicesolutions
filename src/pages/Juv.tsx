
import React from 'react';
import Layout from '../components/Layout';
import JuvHero from '../components/juv/JuvHero';
import JuvAboutBuilder from '../components/juv/JuvAboutBuilder';
import JuvSystemPowers from '../components/juv/JuvSystemPowers';
import JuvAiExecutiveTeam from '../components/juv/JuvAiExecutiveTeam';
import JuvBeforeAfter from '../components/juv/JuvBeforeAfter';
import JuvRoadmap from '../components/juv/JuvRoadmap';
import JuvModel from '../components/juv/JuvModel';
import JuvFounderAlignment from '../components/juv/JuvFounderAlignment';
import JuvOwnershipModels from '../components/juv/JuvOwnershipModels';
import JuvClosingCTA from '../components/juv/JuvClosingCTA';
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
        
        {/* Before & After Comparison */}
        <ParallaxSection>
          <ScrollRevealWrapper animation="fade-up">
            <JuvBeforeAfter />
          </ScrollRevealWrapper>
        </ParallaxSection>
        
        {/* Roadmap to $10M Exit */}
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
        
        {/* Ownership Models */}
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
