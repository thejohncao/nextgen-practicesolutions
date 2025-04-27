
import React from 'react';
import { integrations } from '@/data/integrations';
import { cn } from '@/lib/utils';

// Function to determine badge background color based on category
const getBadgeColor = (categories: string[]) => {
  if (categories.includes('CRM & Patient Management')) {
    return 'bg-blue-500/90';
  } else if (categories.includes('AI & Automations')) {
    return 'bg-purple-500/90';
  } else if (categories.includes('Billing & Payments')) {
    return 'bg-green-500/90';
  } else if (categories.includes('Communications')) {
    return 'bg-yellow-500/90';
  } else if (categories.includes('Scheduling')) {
    return 'bg-cyan-500/90';
  } else if (categories.includes('Team Collaboration')) {
    return 'bg-orange-500/90';
  } else if (categories.includes('Marketing')) {
    return 'bg-pink-500/90';
  } else if (categories.includes('Dental Specific')) {
    return 'bg-indigo-500/90';
  }
  return 'bg-gray-500/90';
};

const IntegrationsMegaMenu = () => {
  // Take first 12 integrations for the mega menu
  const menuIntegrations = integrations.slice(0, 12);

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
                "group relative rounded-xl h-[90px] w-full transition-all duration-300",
                "hover:scale-[1.02] hover:shadow-lg",
                getBadgeColor(integration.categories),
                "flex items-center justify-center cursor-pointer",
                "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              )}
            >
              <span className="text-white font-medium text-base lg:text-lg text-center px-3">
                {integration.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsMegaMenu;
