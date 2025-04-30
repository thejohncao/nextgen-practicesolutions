
import React from 'react';
import Layout from '../components/Layout';
import CertificationsHero from '../components/certifications/CertificationsHero';
import CertificationCards from '../components/certifications/CertificationCards';
import CertificationBenefits from '../components/certifications/CertificationBenefits';
import CertificationCTA from '../components/certifications/CertificationCTA';
import CertificationOverview from '../components/certifications/CertificationOverview';
import AvailableCertifications from '../components/certifications/AvailableCertifications';

const Certifications = () => {
  return (
    <Layout>
      <CertificationsHero />
      <CertificationOverview />
      <CertificationCards />
      <AvailableCertifications />
      <CertificationBenefits />
      <CertificationCTA />
    </Layout>
  );
};

export default Certifications;
