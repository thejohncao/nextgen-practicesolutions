
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, RefreshCcw, Star, DollarSign } from 'lucide-react';
import EmailCollectionDialog from '../EmailCollectionDialog';

interface PricingCardProps {
  name: string;
  stage: string;
  bestFor: string;
  tagline: string;
  features: string[];
  agent: {
    name: string;
    role: string;
    color: string;
  };
  ctaText: string;
  isPopular?: boolean;
}

const getFeatureIcon = (feature: string) => {
  if (feature.toLowerCase().includes('calendar') || feature.toLowerCase().includes('scheduling')) {
    return <Calendar className="w-4 h-4" />;
  }
  if (feature.toLowerCase().includes('recall') || feature.toLowerCase().includes('automat')) {
    return <RefreshCcw className="w-4 h-4" />;
  }
  if (feature.toLowerCase().includes('membership') || feature.toLowerCase().includes('growth')) {
    return <Star className="w-4 h-4" />;
  }
  if (feature.toLowerCase().includes('financ') || feature.toLowerCase().includes('payment')) {
    return <DollarSign className="w-4 h-4" />;
  }
  return <Star className="w-4 h-4" />; // Default icon
};

const getAgentColor = (agentName: string) => {
  switch (agentName.toLowerCase()) {
    case 'miles':
      return 'text-red-500 bg-red-500/10';
    case 'giselle':
      return 'text-green-500 bg-green-500/10';
    case 'devon':
      return 'text-blue-500 bg-blue-500/10';
    case 'alma':
      return 'text-amber-500 bg-amber-500/10';
    default:
      return 'text-purple-500 bg-purple-500/10';
  }
};

const PricingCard = ({
  name,
  stage,
  bestFor,
  tagline,
  features,
  agent,
  ctaText,
  isPopular
}: PricingCardProps) => {
  const agentColorClass = getAgentColor(agent.name);
  
  return (
    <div className={cn(
      "glass-card p-6 relative flex flex-col h-full",
      isPopular && "border-nextgen-purple/30 shadow-[0_0_30px_rgba(155,135,245,0.1)]"
    )}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-nextgen-purple text-white px-4 py-1 rounded-full text-sm">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6 text-center">
        <h3 className="text-2xl font-heading font-bold mb-2">{name}</h3>
        <p className="text-sm text-white/60">{stage}</p>
        <div className={cn(
          "inline-block px-3 py-1 rounded-full text-sm mt-3",
          agentColorClass
        )}>
          {bestFor}
        </div>
      </div>

      <p className="text-white/80 mb-6 text-center">{tagline}</p>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className={cn(
              "rounded-full p-1 mt-0.5",
              agentColorClass
            )}>
              {getFeatureIcon(feature)}
            </span>
            <span className="text-white/80">{feature}</span>
          </li>
        ))}
      </ul>

      <EmailCollectionDialog
        triggerText={ctaText}
        buttonClassName={cn(
          "w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
          isPopular ? "bg-nextgen-purple hover:bg-nextgen-purple/90" : "bg-white/5 hover:bg-white/10"
        )}
      />
    </div>
  );
};

export default PricingCard;
