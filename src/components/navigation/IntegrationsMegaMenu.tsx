
import React from 'react';
import { integrations, categories } from '@/data/integrations';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronRight } from 'lucide-react';

// Group integrations by category
const getIntegrationsByCategory = () => {
  const grouped: { [key: string]: typeof integrations } = {};
  categories.forEach(category => {
    grouped[category] = integrations.filter(integration => 
      integration.categories.includes(category)
    ).slice(0, 4); // Show max 4 integrations per category
  });
  return grouped;
};

const IntegrationCard = ({ integration }: { integration: (typeof integrations)[0] }) => (
  <TooltipProvider delayDuration={200}>
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "group relative rounded-lg w-[120px] h-[80px] transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-lg",
            "bg-white/5 hover:bg-white/10",
            "border border-white/10 hover:border-white/20",
            "flex items-center justify-center p-3"
          )}
        >
          <img
            src={integration.logoUrl}
            alt={`${integration.name} logo`}
            className="max-w-[60px] max-h-[40px] w-auto h-auto object-contain filter brightness-100 transition-all group-hover:brightness-110"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="bg-white/95 text-gray-900">
        <p className="font-medium">{integration.name}</p>
        <p className="text-xs text-gray-600">{integration.description}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const IntegrationsMegaMenu = () => {
  const groupedIntegrations = getIntegrationsByCategory();
  
  // Only show categories that have integrations
  const categoriesWithIntegrations = categories.filter(
    category => groupedIntegrations[category]?.length > 0
  );

  return (
    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 animate-mega-menu">
      <div className="w-[900px] max-w-[95vw] mx-auto rounded-xl bg-nextgen-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="p-6">
          <p className="text-white/60 text-sm text-center mb-6">
            Seamlessly connect to the platforms your practice already uses
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {categoriesWithIntegrations.map((category, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white/80 text-sm font-medium">{category}</h3>
                  <Link 
                    to={`/integrations?category=${encodeURIComponent(category)}`}
                    className="text-xs text-white/60 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    View all
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {groupedIntegrations[category]?.map((integration, idx) => (
                    <IntegrationCard key={idx} integration={integration} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsMegaMenu;
