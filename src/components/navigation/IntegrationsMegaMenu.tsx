
import React from 'react';
import { integrations } from '@/data/integrations';
import { cn } from '@/lib/utils';

const IntegrationsMegaMenu = () => {
  // Take first 16 integrations for the mega menu
  const menuIntegrations = integrations.slice(0, 16);

  return (
    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 animate-mega-menu">
      <div className="w-[800px] max-w-[90vw] rounded-xl bg-nextgen-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl p-6">
        <div className="mb-4">
          <p className="text-white/60 text-sm text-center">
            Seamlessly connect to the platforms your practice already uses.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuIntegrations.map((integration, idx) => (
            <div
              key={idx}
              className={cn(
                "group relative rounded-lg p-4 transition-all duration-200 hover:-translate-y-1",
                "bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15",
                "border border-white/10 hover:border-white/20"
              )}
            >
              <div className="aspect-square flex items-center justify-center p-4">
                <img
                  src={integration.logoUrl}
                  alt={`${integration.name} logo`}
                  className="max-w-[80px] max-h-[80px] object-contain filter brightness-100 transition-all group-hover:brightness-110"
                />
              </div>
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 flex items-center justify-center">
                <span className="text-white text-sm font-medium">{integration.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsMegaMenu;
