
import React from 'react';
import Layout from '../components/Layout';
import CertificationHero from '../components/academy/certification/CertificationHero';
import TrustedBySection from '../components/academy/certification/TrustedBySection';
import WhyCertExists from '../components/academy/certification/WhyCertExists';
import CertificationPathway from '../components/academy/certification/CertificationPathway';
import BadgeCredentials from '../components/academy/certification/BadgeCredentials';
import FinalCTA from '../components/academy/certification/FinalCTA';

const AcademyCertification = () => {
  return (
    <Layout>
      <CertificationHero />
      <TrustedBySection />
      <WhyCertExists />
      <CertificationPathway />
      <BadgeCredentials />
      <FinalCTA />
    </Layout>
  );
};

export default AcademyCertification;
