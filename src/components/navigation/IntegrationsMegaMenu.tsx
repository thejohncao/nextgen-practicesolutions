
import React from 'react';
import { integrations } from '@/data/integrations';
import { cn } from '@/lib/utils';

// Take first 12 integrations for the mega menu
const menuIntegrations = integrations.slice(0, 12);

const IntegrationsMegaMenu = () => {
  return (
    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 animate-mega-menu">
      <div className="w-[800px] max-w-[90vw] mx-auto rounded-xl bg-nextgen-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
        <div className="mb-6">
          <p className="text-white/60 text-sm text-center">
            Seamlessly connect to the platforms your practice already trusts.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuIntegrations.map((integration, idx) => (
            <div
              key={idx}
              className={cn(
                "px-4 py-3 glass-card rounded-lg text-center",
                "text-white/70 hover:text-white/90 transition-all duration-300",
                "transform hover:scale-105"
              )}
            >
              <span className="text-sm font-medium">{integration.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsMegaMenu;
