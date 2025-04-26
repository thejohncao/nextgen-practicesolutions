
import React from 'react';
import Layout from '../components/Layout';
import SolutionsHero from '../components/solutions/SolutionsHero';
import AgentsSection from '../components/solutions/AgentsSection';
import FooterCTA from '../components/FooterCTA';

const Solutions = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-nextgen-dark text-white">
        <SolutionsHero />
        <AgentsSection />
        <FooterCTA />
      </div>
    </Layout>
  );
};

export default Solutions;
