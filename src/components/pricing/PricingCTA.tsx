
import React from 'react';
import EmailCollectionDialog from '../EmailCollectionDialog';

const PricingCTA = () => {
  return (
    <div className="container mx-auto px-4 text-center mt-20">
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-gradient">
        Ready to Transform Your Practice with NextGen?
      </h2>
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
