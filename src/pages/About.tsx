
import React from 'react';
import Layout from '@/components/Layout';
import AboutHero from '@/components/about/AboutHero';
import WhoWeHelp from '@/components/about/WhoWeHelp';
import WhatWeOffer from '@/components/about/WhatWeOffer';
import AcademyPreview from '@/components/about/AcademyPreview';
import PartnerPractices from '@/components/about/PartnerPractices';
import FounderSection from '@/components/about/FounderSection';
import AboutCTA from '@/components/about/AboutCTA';

const About = () => {
  return (
    <Layout>
      <AboutHero />
      <WhoWeHelp />
      <WhatWeOffer />
      <AcademyPreview />
      <PartnerPractices />
      <FounderSection />
      <AboutCTA />
    </Layout>
  );
};

export default About;
