
import React from 'react';
import Layout from '../components/Layout';
import PricingSection from '../components/pricing/PricingSection';
import BackgroundCircles from '../components/effects/BackgroundCircles';

const Pricing = () => {
  return (
    <Layout>
      <div className="relative pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <BackgroundCircles 
            primaryColor="rgba(155, 135, 245, 0.15)" 
            secondaryColor="rgba(30, 174, 219, 0.12)"
            density="high"
            variant="intense"
            animate={true}
          />
        </div>
        
        <PricingSection />
      </div>
    </Layout>
  );
};

export default Pricing;
