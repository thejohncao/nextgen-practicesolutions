
import React from 'react';
import { featuredIntegrations } from '@/data/integrations';

const FeaturedIntegrations = () => {
  return (
    <section className="py-10 px-6 md:px-8 lg:px-12 bg-white border-b border-gray-100">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {featuredIntegrations.map((integration, index) => (
            <div 
              key={index} 
              className="group flex items-center justify-center w-24 h-20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-white shadow-sm group-hover:shadow-md p-3 transition-all duration-300">
                <img 
                  src={integration.logoUrl} 
                  alt={`${integration.name} logo`} 
                  className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100" 
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
