
import React from 'react';
import EmailCollectionDialog from '../EmailCollectionDialog';

const PricingHero = () => {
  return (
    <div className="container mx-auto px-4 text-center mb-20">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-gradient">
        Choose Your NextGen Package
      </h1>
      <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
        Your Practice. Your AI Team. Your Next Evolution.
      </p>
      <EmailCollectionDialog
        triggerText="Book a Demo"
        buttonSize="lg"
        buttonClassName="bg-nextgen-purple hover:bg-nextgen-purple/90"
      />
    </div>
  );
};

export default PricingHero;
