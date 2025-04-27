
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Integration } from '@/types/integrations';

interface IntegrationCardProps {
  integration: Integration;
}

const IntegrationCard = ({ integration }: IntegrationCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-gradient-to-br from-white to-gray-50/95 border border-white/80">
      <div className="p-6 flex flex-col h-full">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-lg bg-white p-3 shadow-sm group-hover:shadow-md transition-all duration-300">
            <img 
              src={integration.logoUrl} 
              alt={`${integration.name} logo`} 
              className="max-w-full max-h-full object-contain" 
            />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-center mb-2 text-nextgen-dark group-hover:text-nextgen-purple transition-colors">
          {integration.name}
        </h3>
        
        <p className="text-gray-600 text-center mb-4 text-sm flex-grow">
          {integration.description}
        </p>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {integration.categories.map((category, idx) => (
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
  );
};

export default IntegrationCard;
