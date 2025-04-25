
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Integration } from '@/types/integrations';

interface IntegrationCardProps {
  integration: Integration;
}

const IntegrationCard = ({ integration }: IntegrationCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white/5 backdrop-blur-lg border border-white/10">
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-white/10 p-3">
            <img 
              src={integration.logoUrl} 
              alt={`${integration.name} logo`} 
              className="max-w-full max-h-full object-contain" 
            />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-center mb-2 text-white">{integration.name}</h3>
        
        <p className="text-white/70 text-center mb-4 text-sm flex-grow">{integration.description}</p>
        
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {integration.categories.map((category, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs bg-white/10 text-white/70 hover:bg-white/20">
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="mt-auto pt-2">
          <Button 
            variant="outline" 
            className="w-full border-white/10 text-white hover:bg-white/10"
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
