
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import AgentAvatar from '../AgentAvatar';
import EmailCollectionDialog from '../EmailCollectionDialog';

interface PricingCardProps {
  name: string;
  stage: string;
  bestFor: string;
  features: string[];
  agent: {
    name: string;
    role: string;
    color: string;
  };
  ctaText: string;
  isPopular?: boolean;
  includesText?: string;
}

const PricingCard = ({
  name,
  stage,
  bestFor,
  features,
  agent,
  ctaText,
  isPopular,
  includesText
}: PricingCardProps) => {
  return (
    <Card className="glass-card border-white/10 relative group animate-fade-in">
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-nextgen-purple text-white text-xs font-medium px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      
      <CardHeader className="space-y-4">
        <div>
          <p className="text-sm text-nextgen-purple font-medium">{stage}</p>
          <h3 className="text-2xl font-heading font-bold text-white mt-2">{name}</h3>
          <p className="text-white/70 mt-2 text-sm">{bestFor}</p>
        </div>
        
        {includesText && (
          <p className="text-sm text-white/60 italic">{includesText}</p>
        )}

        <div className="flex items-center gap-3">
          <AgentAvatar
            name={agent.name}
            role={agent.role}
            color={agent.color}
          />
          <div>
            <p className="text-sm text-white/90">Unlocks</p>
            <p className="text-white font-medium">{agent.name}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-4 w-4 text-nextgen-purple flex-shrink-0 mt-1" />
              <span className="text-white/80 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <EmailCollectionDialog
          triggerText={ctaText}
          buttonClassName="w-full bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
        />
      </CardContent>
    </Card>
  );
};

export default PricingCard;
