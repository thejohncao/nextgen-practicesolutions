
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar, Clipboard, MessageCircle, RefreshCcw, DollarSign, Briefcase, Network, Star, UserSquare2, Files } from "lucide-react";
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

const getFeatureIcon = (feature: string, color: string) => {
  const iconProps = { className: `h-4 w-4 flex-shrink-0 mt-1`, style: { color } };
  
  if (feature.toLowerCase().includes('calendar')) return <Calendar {...iconProps} />;
  if (feature.toLowerCase().includes('intake')) return <Clipboard {...iconProps} />;
  if (feature.toLowerCase().includes('messaging')) return <MessageCircle {...iconProps} />;
  if (feature.toLowerCase().includes('recall') || feature.toLowerCase().includes('rescue')) return <RefreshCcw {...iconProps} />;
  if (feature.toLowerCase().includes('financ')) return <DollarSign {...iconProps} />;
  if (feature.toLowerCase().includes('consult')) return <Briefcase {...iconProps} />;
  if (feature.toLowerCase().includes('referral')) return <Network {...iconProps} />;
  if (feature.toLowerCase().includes('membership')) return <Star {...iconProps} />;
  if (feature.toLowerCase().includes('hire') || feature.toLowerCase().includes('onboarding')) return <UserSquare2 {...iconProps} />;
  if (feature.toLowerCase().includes('sop') || feature.toLowerCase().includes('library')) return <Files {...iconProps} />;
  
  // Default icon with package color
  return <Star {...iconProps} />;
};

const getAgentColor = (name: string) => {
  switch (name.toLowerCase()) {
    case 'miles':
      return '#ea384c'; // Red
    case 'giselle':
      return '#22c55e'; // Green
    case 'devon':
      return '#0FA0CE'; // Deep Blue
    case 'alma':
      return '#f59e0b'; // Gold
    default:
      return '#9b87f5';
  }
};

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
  const agentColor = getAgentColor(agent.name);
  
  return (
    <Card className="glass-card border-white/10 relative group animate-fade-in">
      {/* Stage Badge */}
      <div 
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium"
        style={{ 
          backgroundColor: `${agentColor}20`,
          color: agentColor 
        }}
      >
        {stage}
      </div>
      
      {/* Popular Badge (if applicable) */}
      {isPopular && (
        <div className="absolute -top-3 right-4 bg-nextgen-purple text-white text-xs font-medium px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      
      <CardHeader className="space-y-4">
        <div>
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
            color={agentColor}
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
              {getFeatureIcon(feature, agentColor)}
              <span className="text-white/80 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <EmailCollectionDialog
          triggerText={ctaText}
          buttonClassName={`w-full text-white hover:opacity-90 transition-opacity`}
          style={{ backgroundColor: agentColor }}
        />
      </CardContent>
    </Card>
  );
};

export default PricingCard;
