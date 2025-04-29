
import React from 'react';
import { cn } from "@/lib/utils";
import BackgroundEffect from '../roi/BackgroundEffect';

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-20 overflow-hidden bg-nextgen-dark text-white">
      <BackgroundEffect />
      
      <div className="container mx-auto px-4 text-center mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-gradient">
          Choose Your Growth Stage
        </h1>
        <p className="text-xl md:text-2xl font-medium text-white/80 mb-8 max-w-3xl mx-auto">
          NextGen grows with you — unlocking powerful AI teammates at every stage of your practice's journey. Start where you are. Scale into who you're meant to become.
        </p>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PricingPackages />
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center mt-20">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
          Still deciding? Let Miles recommend your plan.
        </h2>
        <p className="text-xl md:text-2xl font-medium text-white/80 mb-8 max-w-3xl mx-auto">
          Not sure where to start? Miles can help you figure it out in 60 seconds or less.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
