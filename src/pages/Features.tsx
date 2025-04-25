
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCarousel from '../components/features/FeatureCarousel';

const Features = () => {
  return (
    <div className="min-h-screen bg-nextgen-dark text-white">
      <Navbar />
      <main className="pt-20 pb-16">
        <FeatureCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default Features;
