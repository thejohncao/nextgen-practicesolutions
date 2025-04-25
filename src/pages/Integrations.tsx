
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IntegrationsHero from '../components/integrations/IntegrationsHero';
import FeaturedIntegrations from '../components/integrations/FeaturedIntegrations';
import IntegrationsGrid from '../components/integrations/IntegrationsGrid';
import CustomIntegrationCTA from '../components/integrations/CustomIntegrationCTA';

const Integrations = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-nextgen-dark text-white">
      <Navbar />
      <div className="pt-20">
        <IntegrationsHero />
        <FeaturedIntegrations />
        <IntegrationsGrid activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <CustomIntegrationCTA />
      </div>
      <Footer />
    </div>
  );
};

export default Integrations;
