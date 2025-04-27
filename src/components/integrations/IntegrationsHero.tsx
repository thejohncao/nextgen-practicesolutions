
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const IntegrationsHero = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-8 lg:px-12 bg-white">
      <div className="container mx-auto max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-nextgen-dark">
          Connect Your Practice Ecosystem
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          NextGen Practice Solutions integrates seamlessly with the platforms modern practices trust most.
        </p>
        <p className="text-md text-gray-600 mb-8">
          From scheduling and marketing to patient financing and CRM automation.
        </p>
        <Button 
          className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 h-auto text-lg"
          onClick={() => {
            const gridSection = document.getElementById('integrations-grid');
            gridSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore Integrations <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default IntegrationsHero;
