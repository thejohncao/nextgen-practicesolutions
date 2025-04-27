
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Integration } from '@/types/integrations';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface IntegrationCardProps {
  integration: Integration;
}

// Function to determine background color based on category
const getCardBackgroundColor = (categories: string[]) => {
  if (categories.includes('CRM & Patient Management')) {
    return 'bg-gradient-to-br from-blue-50 to-blue-100/70';
  } else if (categories.includes('AI & Automations')) {
    return 'bg-gradient-to-br from-purple-50 to-purple-100/70';
  } else if (categories.includes('Billing & Payments')) {
    return 'bg-gradient-to-br from-green-50 to-green-100/70';
  } else if (categories.includes('Communications')) {
    return 'bg-gradient-to-br from-yellow-50 to-yellow-100/70';
  } else if (categories.includes('Scheduling')) {
    return 'bg-gradient-to-br from-cyan-50 to-cyan-100/70';
  } else if (categories.includes('Team Collaboration')) {
    return 'bg-gradient-to-br from-orange-50 to-orange-100/70';
  } else {
    return 'bg-gradient-to-br from-gray-50 to-gray-100/70';
  }
};

const IntegrationCard = ({ integration }: IntegrationCardProps) => {
  const bgClass = getCardBackgroundColor(integration.categories);

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${bgClass} border border-white/80 h-full`}>
      <div className="p-6 flex flex-col h-full">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-lg bg-white p-3 shadow-sm">
            <img 
              src={integration.logoUrl} 
              alt={`${integration.name} logo`} 
              className="max-w-full max-h-full object-contain" 
            />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-center mb-2 text-nextgen-dark">{integration.name}</h3>
        
        <p className="text-gray-600 text-center mb-4 text-sm flex-grow">{integration.description}</p>
        
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {integration.categories.map((category, idx) => (
            <Badge key={idx} variant="outline" className="text-xs bg-white/70 text-gray-600 border-gray-200 hover:bg-white">
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="mt-auto pt-2">
          <Button 
            variant="outline" 
            className="w-full border-gray-200 text-nextgen-dark hover:bg-white bg-white/80"
            onClick={() => integration.learnMoreUrl && window.open(integration.learnMoreUrl, '_blank')}
          >
            {integration.ctaText || "Learn More"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default IntegrationCard;
