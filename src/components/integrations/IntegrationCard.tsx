
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Integration } from '@/types/integrations';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface IntegrationCardProps {
  integration: Integration;
}

const getCardBackgroundColor = (categories: string[]) => {
  if (categories.includes('CRM & Patient Management')) {
    return 'bg-gradient-to-br from-blue-50/90 to-blue-100/80';
  } else if (categories.includes('AI & Automations')) {
    return 'bg-gradient-to-br from-purple-50/90 to-purple-100/80';
  } else if (categories.includes('Billing & Payments')) {
    return 'bg-gradient-to-br from-green-50/90 to-green-100/80';
  } else if (categories.includes('Communications')) {
    return 'bg-gradient-to-br from-yellow-50/90 to-yellow-100/80';
  } else if (categories.includes('Scheduling')) {
    return 'bg-gradient-to-br from-cyan-50/90 to-cyan-100/80';
  } else if (categories.includes('Team Collaboration')) {
    return 'bg-gradient-to-br from-orange-50/90 to-orange-100/80';
  } else if (categories.includes('Marketing')) {
    return 'bg-gradient-to-br from-pink-50/90 to-pink-100/80';
  } else if (categories.includes('Dental Specific')) {
    return 'bg-gradient-to-br from-indigo-50/90 to-indigo-100/80';
  }
  return 'bg-gradient-to-br from-gray-50/90 to-gray-100/80';
};

const IntegrationCard = ({ integration }: IntegrationCardProps) => {
  const bgClass = getCardBackgroundColor(integration.categories);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card 
          className={`overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${bgClass} border border-white/80 backdrop-blur-sm h-full`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-lg bg-white p-3 shadow-sm transition-transform group-hover:scale-105">
                <img 
                  src={integration.logoUrl} 
                  alt={`${integration.name} logo`} 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-center mb-2 text-nextgen-dark">
              {integration.name}
            </h3>
            
            <p className="text-gray-600 text-center mb-4 text-sm flex-grow">
              {integration.description}
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center mt-auto">
              {integration.categories.slice(0, 2).map((category, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="text-xs bg-white/70 text-gray-600 border-gray-200"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <h4 className="font-semibold mb-2">{integration.name}</h4>
        <p className="text-sm text-gray-500">{integration.description}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default IntegrationCard;
