
import React from 'react';
import Layout from '../components/Layout';
import CertificationsHero from '../components/certifications/CertificationsHero';
import CertificationCards from '../components/certifications/CertificationCards';
import CertificationBenefits from '../components/certifications/CertificationBenefits';
import CertificationCTA from '../components/certifications/CertificationCTA';

const Certifications = () => {
  return (
    <Layout>
      <CertificationsHero />
      <CertificationCards />
      <CertificationBenefits />
      <CertificationCTA />
    </Layout>
  );
};

export default Certifications;
