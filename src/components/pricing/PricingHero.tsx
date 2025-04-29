
import React from 'react';
import EmailCollectionDialog from '../EmailCollectionDialog';

const PricingHero = () => {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
          Transparent Pricing, Exceptional Value
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8">
          Choose the right plan for your practice. All plans include core AI capabilities with Miles, your personal practice concierge.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <EmailCollectionDialog 
            buttonText="Get Started" 
            buttonVariant="default"
            className="bg-gradient-to-r from-nextgen-purple to-nextgen-blue hover:opacity-90 text-white font-medium"
          />
          <button className="px-6 py-2.5 border border-white/20 bg-white/5 hover:bg-white/10 rounded-md transition-colors">
            Talk to Miles
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingHero;
