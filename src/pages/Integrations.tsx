
import React, { useState } from 'react';
import Layout from '../components/Layout';
import IntegrationsHero from '../components/integrations/IntegrationsHero';
import IntegrationsGrid from '../components/integrations/IntegrationsGrid';
import CustomIntegrationCTA from '../components/integrations/CustomIntegrationCTA';

const Integrations = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  return (
    <Layout>
      <div className="min-h-screen bg-nextgen-dark">
        <IntegrationsHero />
        <IntegrationsGrid activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <CustomIntegrationCTA />
      </div>
    </Layout>
  );
};

export default Integrations;
