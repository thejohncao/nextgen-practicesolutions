
import React from 'react';
import Navbar from '../components/Navbar';
import SolutionsHero from '../components/solutions/SolutionsHero';
import SolutionsPillars from '../components/solutions/SolutionsPillars';
import SolutionsPackages from '../components/solutions/SolutionsPackages';
import FlywheelSection from '../components/solutions/FlywheelSection';
import FooterCTA from '../components/FooterCTA';
import Footer from '../components/Footer';
import AiAssistant from '../components/AiAssistant';

const Solutions = () => {
  return (
    <div className="min-h-screen bg-nextgen-dark text-white">
      <Navbar />
      <SolutionsHero />
      <SolutionsPillars />
      <SolutionsPackages />
      <FlywheelSection />
      <FooterCTA />
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Solutions;
