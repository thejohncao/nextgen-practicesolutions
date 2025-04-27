
import React from 'react';
import EmailCollectionDialog from '../EmailCollectionDialog';

const PricingCTA = () => {
  return (
    <div className="container mx-auto px-4 text-center mt-20">
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
        Still have questions?
      </h2>
      <p className="text-xl md:text-2xl font-medium text-white/80 mb-8 max-w-3xl mx-auto">
        Let's design your custom NextGen Operating System together —<br />
        Book a free demo and meet your future AI Executive Team.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <EmailCollectionDialog
          triggerText="Book a Demo"
          buttonSize="lg"
          buttonClassName="bg-nextgen-purple hover:bg-nextgen-purple/90"
        />
        <EmailCollectionDialog
          triggerText="Start Now"
          buttonSize="lg"
          buttonClassName="bg-white text-nextgen-dark hover:bg-white/90"
        />
      </div>
    </div>
  );
};

export default PricingCTA;
