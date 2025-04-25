
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AcademyHero from '../components/academy/AcademyHero';
import WhyItMatters from '../components/academy/WhyItMatters';
import WhatYouGet from '../components/academy/WhatYouGet';
import HowItWorks from '../components/academy/HowItWorks';
import AccessDetails from '../components/academy/AccessDetails';

const Academy = () => {
  return (
    <div className="min-h-screen bg-nextgen-dark text-white">
      <Navbar />
      <AcademyHero />
      <WhyItMatters />
      <WhatYouGet />
      <HowItWorks />
      <AccessDetails />
      <Footer />
    </div>
  );
};

export default Academy;
