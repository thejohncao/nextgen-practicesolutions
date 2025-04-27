
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const IntegrationsHero = () => {
  const scrollToGrid = () => {
    document.getElementById('integrations-grid')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 lg:px-12 bg-nextgen-dark overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-nextgen-purple/10 to-transparent opacity-50" />
      
      <div className="container relative mx-auto max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
          Seamless Integrations With the Platforms Modern Practices Trust
        </h1>
        
        <h2 className="text-xl md:text-2xl font-medium mb-6 text-white/80">
          Expand your capabilities instantly.
        </h2>
        
        <p className="text-lg text-white/70 mb-8 max-w-3xl mx-auto">
          NextGen Practice Solutions connects with the leading healthcare, marketing, and operational platforms 
          to streamline every part of your practice — from patient acquisition to lifetime retention.
        </p>
        
        <p className="text-md text-white/60 mb-12 max-w-2xl mx-auto">
          Whether you're managing patient financing, CRM workflows, marketing campaigns, or daily operations, 
          NextGen integrates seamlessly with the tools you already trust.
        </p>
        
        <Button 
          className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 h-auto text-lg"
          onClick={scrollToGrid}
        >
          Explore All Integrations <ArrowDown className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default IntegrationsHero;
