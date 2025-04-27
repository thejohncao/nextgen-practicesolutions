
import React from 'react';
import Layout from '../components/Layout';
import SecurityHero from '../components/security/SecurityHero';
import SecurityFeatures from '../components/security/SecurityFeatures';
import SecurityCTA from '../components/security/SecurityCTA';

const Security = () => {
  return (
    <Layout>
      <SecurityHero />
      <SecurityFeatures />
      <SecurityCTA />
    </Layout>
  );
};

export default Security;
