
import React from 'react';
import CinematicCardStack from './CinematicCardStack';

const WhyWeBuiltSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient animate-fade-in">
            Why We Built NextGen Practice Solutions
          </h2>
        </div>

        {/* Cinematic Card Stack */}
        <CinematicCardStack />
      </div>
    </section>
  );
};

export default WhyWeBuiltSection;
