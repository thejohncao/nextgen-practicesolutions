
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { integrations, categories } from '@/data/integrations';
import IntegrationCard from './IntegrationCard';

interface IntegrationsGridProps {
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
}

const IntegrationsGrid = ({ activeFilter, setActiveFilter }: IntegrationsGridProps) => {
  const filteredIntegrations = activeFilter 
    ? integrations.filter(integration => integration.categories.includes(activeFilter))
    : integrations;

  return (
    <section id="integrations-grid" className="py-16 px-6 md:px-8 lg:px-12 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-nextgen-dark">
            All Integrations
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Connect your practice with these powerful tools and services to 
            enhance productivity and automate workflows.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              onClick={() => setActiveFilter(null)}
              className="rounded-full"
            >
              All
            </Button>
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIntegrations.map((integration, index) => (
            <IntegrationCard key={index} integration={integration} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsGrid;
