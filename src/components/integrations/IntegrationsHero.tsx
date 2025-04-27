
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const IntegrationsHero = () => {
  return (
    <section className="py-20 lg:py-24 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-10"
        >
          <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
        </video>
        
        {/* Grid overlay effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white text-gradient">
          Seamless Integrations With the Platforms Modern Practices Trust
        </h1>
        
        <h2 className="text-xl md:text-2xl font-medium mb-6 text-white/80">
          Expand your capabilities instantly.
        </h2>
        
        <div className="mb-10 max-w-4xl mx-auto">
          <p className="text-lg text-white/70 mb-4">
            NextGen Practice Solutions connects with the leading healthcare, marketing, and operational platforms to streamline every part of your practice — from patient acquisition to lifetime retention.
          </p>
          
          <p className="text-lg text-white/70 mb-6">
            Whether you're managing patient financing, CRM workflows, marketing campaigns, or daily operations, NextGen integrates seamlessly with the tools you already trust.
          </p>
          
          <p className="text-lg text-white/70">
            Boost efficiency, accelerate growth, and future-proof your practice with our built-in compatibility across the industry's most powerful platforms.
          </p>
        </div>
        
        <Button 
          className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 h-auto text-lg"
          onClick={() => {
            const gridSection = document.getElementById('integrations-grid');
            if (gridSection) {
              gridSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Explore All Integrations <ArrowDown className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default IntegrationsHero;
