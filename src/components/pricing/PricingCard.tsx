import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar, Clipboard, MessageCircle, RefreshCcw, DollarSign, Briefcase, Network, Star, UserSquare2, Files } from "lucide-react";
import RainbowButton from '../ui/rainbow-button';
import { cn } from "@/lib/utils";
import AgentStackDisplay from './AgentStackDisplay';

interface AgentInfo {
  name: string;
  role: string;
  color: string;
}

interface PricingCardProps {
  name: string;
  stage: string;
  bestFor: string;
  features: string[];
  tagline?: string;
  agents: AgentInfo[];
  ctaText: string;
  isPopular?: boolean;
  isMastery?: boolean;
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

const getAgentColor = (name: string): string => {
  switch (name.toLowerCase()) {
    case 'miles':
      return 'blue';
    case 'giselle':
      return 'green';
    case 'devon':
      return 'purple';
    case 'alma':
      return 'gold';
    default:
      return 'purple';
  }
};

const getAgentHexColor = (name: string): string => {
  switch (name.toLowerCase()) {
    case 'miles':
      return '#3A86FF';
    case 'giselle':
      return '#22c55e';
    case 'devon':
      return '#9b87f5';
    case 'alma':
      return '#f59e0b';
    default:
      return '#9b87f5';
  }
};

const PricingCard = ({
  name,
  stage,
  bestFor,
  features,
  tagline,
  agents,
  ctaText,
  isPopular,
  isMastery,
  includesText
}: PricingCardProps) => {
  if (!agents || agents.length === 0) return null;
  
  const primaryAgent = agents[0];
  const agentHexColor = getAgentHexColor(primaryAgent.name);
  
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found in pricing card, clicking immediately...');
        chatButton.click();
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found in pricing card after delay, clicking...');
            delayedChatButton.click();
          } else {
            console.warn('Chat button still not found in DOM after pricing card click');
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat from pricing card:', error);
    }
  };
  
  // Generate appropriate text based on the number of agents
  const getAgentCountText = () => {
    if (agents.length === 1) {
      return `Unlocks ${primaryAgent.name}`;
    } else if (agents.length === 4) {
      return "Unlocks Full AI Team";
    } else {
      return `Unlocks ${agents.length} AI Agents`;
    }
  };

  return (
    <Card 
      className={cn(
        "glass-card border-white/10 relative group animate-fade-in",
        isMastery ? "border-amber-400/50" : ""
      )}
    >
      {/* Stage Badge */}
      <div 
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
        style={{ 
          backgroundColor: `${agentHexColor}20`,
          color: agentHexColor 
        }}
      >
        {isMastery && <div className="w-3.5 h-3.5">👑</div>}
        {stage}
      </div>
      
      <CardHeader className="space-y-4">
        <div>
          <h3 className="text-2xl font-heading font-bold text-white mt-2">{name}</h3>
          <p className="text-white/70 mt-2 text-sm">{bestFor}</p>
        </div>
        
        {includesText && (
          <p className="text-sm text-white/60 italic">{includesText}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-white/90">{getAgentCountText()}</p>
          </div>
          <div className="flex items-end">
            <AgentStackDisplay 
              agents={agents} 
              isPrimary={true}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <p className="text-white/80 text-sm font-medium mb-2">Includes:</p>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                {getFeatureIcon(feature, agentHexColor)}
                <span className="text-white/80 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {tagline && (
          <div className="pt-4 pb-1">
            <p className="text-sm italic text-white/80 border-l-2 pl-3 border-l-nextgen-purple/50">{tagline}</p>
          </div>
        )}

        {(isPopular || isMastery) && (
          <div className="text-center">
            <span 
              className="inline-block px-3 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: `${agentHexColor}20`,
                color: agentHexColor 
              }}
            >
              {isMastery ? 'Best for Large Practices' : 'Most Popular'}
            </span>
          </div>
        )}

        <RainbowButton 
          onClick={handleChatOpen}
          className="w-full"
        >
          Talk to Miles
        </RainbowButton>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
