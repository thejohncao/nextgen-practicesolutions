
import React from 'react';
import Layout from '../components/Layout';
import IntegrationsHero from '../components/integrations/IntegrationsHero';
import IntegrationsGrid from '../components/integrations/IntegrationsGrid';
import CustomIntegrationCTA from '../components/integrations/CustomIntegrationCTA';
import FeaturedIntegrations from '../components/integrations/FeaturedIntegrations';

const Integrations = () => {
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
  
  return (
    <Layout>
      <div className="flex flex-col bg-nextgen-dark min-h-screen">
        <IntegrationsHero />
        <FeaturedIntegrations />
        <IntegrationsGrid activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <CustomIntegrationCTA />
      </div>
    </Layout>
  );
};

export default Integrations;
