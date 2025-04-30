
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import RainbowButton from '@/components/ui/rainbow-button';
import { ArrowRight } from 'lucide-react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import AiTeamHero from '@/components/ai-team/AiTeamHero';
import ProblemSection from '@/components/ai-team/ProblemSection';
import AgentShowcaseGrid from '@/components/ai-team/AgentShowcaseGrid';
import PatientJourneyComparison from '@/components/ai-team/PatientJourneyComparison';
import AgentDemoSection from '@/components/ai-team/AgentDemoSection';
import ResultsSection from '@/components/ai-team/ResultsSection';
import PricingTeaser from '@/components/ai-team/PricingTeaser';
import FinalCTA from '@/components/ai-team/FinalCTA';
import FooterCTA from '@/components/FooterCTA';

const AiTeam = () => {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-nextgen-dark">
        {/* Hero Section */}
        <AiTeamHero />
        
        {/* Problem Section */}
        <ProblemSection />
        
        {/* Meet Your AI Agents Grid */}
        <AgentShowcaseGrid />
        
        {/* Patient Journey Comparison */}
        <PatientJourneyComparison />
        
        {/* Agent Demo Section */}
        <AgentDemoSection />
        
        {/* Results + Testimonials */}
        <ResultsSection />
        
        {/* Pricing Teaser */}
        <PricingTeaser />
        
        {/* Final CTA */}
        <FinalCTA />
        
        {/* Standard Footer CTA */}
        <FooterCTA />
      </div>
    </Layout>
  );
};

export default AiTeam;
