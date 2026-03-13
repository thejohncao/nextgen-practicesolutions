import React from 'react';
import Layout from '@/components/Layout';
import NarrativeHero from '@/components/narrative/NarrativeHero';
import NarrativeProblem from '@/components/narrative/NarrativeProblem';
import NarrativeFiveYes from '@/components/narrative/NarrativeFiveYes';
import NarrativeCapabilities from '@/components/narrative/NarrativeCapabilities';
import NarrativeImpact from '@/components/narrative/NarrativeImpact';
import NarrativeDemoPlaceholder from '@/components/narrative/NarrativeDemoPlaceholder';
import NarrativeCTA from '@/components/narrative/NarrativeCTA';

const Narrative = () => (
  <Layout>
    <div className="min-h-screen bg-nextgen-dark text-white">
      <NarrativeHero />
      <NarrativeProblem />
      <NarrativeFiveYes />
      <NarrativeCapabilities />
      <NarrativeImpact />
      <NarrativeDemoPlaceholder />
      <NarrativeCTA />
    </div>
  </Layout>
);

export default Narrative;
