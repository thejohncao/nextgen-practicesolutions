
import React from 'react';
import { ArrowRight, Sparkles, CheckCircle, Brain, Users, Lightning, Clock, BadgeDollarSign, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import RainbowButton from '@/components/ui/rainbow-button';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { cn } from '@/lib/utils';
import GlowingCard from '@/components/effects/GlowingCard';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';

// Import components we'll create
import HeroSection from '@/components/new-homepage/HeroSection';
import ProblemSection from '@/components/new-homepage/ProblemSection';
import SolutionSection from '@/components/new-homepage/SolutionSection';
import PillarsSection from '@/components/new-homepage/PillarsSection';
import BenefitsSection from '@/components/new-homepage/BenefitsSection';
import SocialProofSection from '@/components/new-homepage/SocialProofSection';
import DifferentiatorsSection from '@/components/new-homepage/DifferentiatorsSection';
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
      
      {/* The 3 Pillars Section */}
      <PillarsSection />
      
      {/* Benefits & Outcomes Section */}
      <BenefitsSection />
      
      {/* Social Proof & Credibility Section */}
      <SocialProofSection />
      
      {/* Differentiators Section */}
      <DifferentiatorsSection />
      
      {/* Primary CTA Section */}
      <PrimaryCTASection />
      
      {/* Explore More Section */}
      <ExploreMoreSection />
    </Layout>
  );
};

export default NewHomepage;
