
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { integrations, categories } from '@/data/integrations';
import IntegrationCard from './IntegrationCard';
import { useInView } from 'react-intersection-observer';

interface IntegrationsGridProps {
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
}

const IntegrationsGrid = ({ activeFilter, setActiveFilter }: IntegrationsGridProps) => {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredIntegrations = activeFilter 
    ? integrations.filter(integration => integration.categories.includes(activeFilter))
    : integrations;

  return (
    <section id="integrations-grid" className="py-16 px-6 md:px-8 lg:px-12 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-nextgen-dark">
            All Integrations
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect your practice with these powerful tools and services to 
            enhance productivity and automate workflows.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              onClick={() => setActiveFilter(null)}
              className={`rounded-full ${
                activeFilter === null 
                  ? 'bg-nextgen-purple text-white hover:bg-nextgen-purple/90' 
                  : 'bg-white text-nextgen-dark hover:bg-gray-100 border-gray-200'
              }`}
            >
              All
            </Button>
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className={`rounded-full ${
                  activeFilter === category 
                    ? 'bg-nextgen-purple text-white hover:bg-nextgen-purple/90' 
                    : 'bg-white text-nextgen-dark hover:bg-gray-100 border-gray-200'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div 
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredIntegrations.map((integration, index) => (
            <div 
              key={index}
              className={`transition-all duration-700 ${
                inView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${Math.min(index * 100, 800)}ms` 
              }}
            >
              <IntegrationCard integration={integration} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsGrid;
