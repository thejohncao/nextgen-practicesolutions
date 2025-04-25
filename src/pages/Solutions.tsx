
import React from 'react';
import Navbar from '../components/Navbar';
import SolutionsHero from '../components/solutions/SolutionsHero';
import SolutionsPillars from '../components/solutions/SolutionsPillars';
import SolutionsPackages from '../components/solutions/SolutionsPackages';
import FooterCTA from '../components/FooterCTA';
import Footer from '../components/Footer';

const Solutions = () => {
  return (
    <div className="min-h-screen bg-nextgen-dark text-white">
      <Navbar />
      <SolutionsHero />
      <SolutionsPillars />
      <SolutionsPackages />
      <FooterCTA />
      <Footer />
    </div>
  );
};

export default Solutions;
