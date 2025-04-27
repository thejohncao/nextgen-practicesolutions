
import React from 'react';
import { Button } from "@/components/ui/button";

const CustomIntegrationCTA = () => {
  return (
    <section className="py-16 md:py-20 px-6 md:px-8 lg:px-12 bg-nextgen-dark">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
          Ready to connect your entire practice ecosystem?
        </h2>
        <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
          Talk to Miles today and discover how our integrations can streamline your practice operations.
        </p>
        <Button 
          className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 h-auto text-lg"
        >
          Talk to Miles
        </Button>
      </div>
    </section>
  );
};

export default CustomIntegrationCTA;
