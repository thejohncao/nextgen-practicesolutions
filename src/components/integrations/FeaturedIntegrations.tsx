
import React from 'react';
import { featuredIntegrations } from '@/data/integrations';

const FeaturedIntegrations = () => {
  return (
    <section className="py-12 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-nextgen-dark/90 to-nextgen-dark/95 border-t border-b border-white/10">
      <div className="container mx-auto max-w-6xl">
        <p className="text-center text-sm uppercase tracking-wider text-white/50 mb-8">Trusted by leading platforms</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {featuredIntegrations.map((integration, index) => (
            <div 
              key={index} 
              className="group flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-24 h-16 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm shadow-sm group-hover:bg-white/15 group-hover:shadow-md p-3 transition-all duration-300">
                <img 
                  src={integration.logoUrl} 
                  alt={`${integration.name} logo`} 
                  className="max-w-full max-h-full object-contain brightness-200 contrast-200 opacity-70 group-hover:opacity-90" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedIntegrations;
