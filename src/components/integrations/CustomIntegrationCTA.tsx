
import React from 'react';
import { Button } from "@/components/ui/button";

const CustomIntegrationCTA = () => {
  return (
    <section className="py-16 md:py-20 px-6 md:px-8 lg:px-12 bg-gray-50">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-nextgen-dark">
          Need a Custom Integration?
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Looking to connect a tool that's not listed?<br />
          Our AI agents can integrate with almost any platform — just ask!
        </p>
        <Button 
          className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 h-auto text-lg"
        >
          Request Custom Integration
        </Button>
      </div>
    </section>
  );
};

export default CustomIntegrationCTA;
