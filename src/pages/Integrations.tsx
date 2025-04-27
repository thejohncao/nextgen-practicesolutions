
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import IntegrationsHero from '../components/integrations/IntegrationsHero';
import IntegrationsGrid from '../components/integrations/IntegrationsGrid';
import CustomIntegrationCTA from '../components/integrations/CustomIntegrationCTA';

const Integrations = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  return (
    <Layout>
      <div className="min-h-screen">
        <IntegrationsHero />
        <IntegrationsGrid activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <CustomIntegrationCTA />
      </div>
    </Layout>
  );
};

export default Integrations;
