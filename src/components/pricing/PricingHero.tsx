
import React from 'react';
import EmailCollectionDialog from '../EmailCollectionDialog';

const PricingHero = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-gradient">
          Simple, Transparent Pricing
        </h2>
        
        <p className="text-lg md:text-xl text-white/70 mb-10">
          One complete AI operating system for your practice. No hidden fees. Cancel anytime.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <EmailCollectionDialog 
            triggerText="Schedule a Demo" 
            buttonVariant="default"
            buttonClassName="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white font-semibold py-2.5 px-6 rounded-lg"
          />
          
          <button className="btn border border-white/20 bg-black/30 hover:bg-white/10 text-white font-semibold py-2.5 px-6 rounded-lg backdrop-blur transition-colors">
            Learn About Payment Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingHero;
