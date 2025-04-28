
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import AgentAvatar from '../AgentAvatar';
import { Sparkle } from 'lucide-react';
import { AgentResultItem } from '@/types/agentResults';
import { getAgentCardColor, getAgentBorderColor } from '@/utils/colorUtils';

interface AgentResultCardProps {
  result: AgentResultItem;
  index: number;
  isMobile: boolean;
}

const AgentResultCard = ({ result, index, isMobile }: AgentResultCardProps) => {
  // Enhanced card color functions
  const getEnhancedCardBg = (color: string) => {
    switch(color) {
      case 'green': return "bg-gradient-to-br from-green-500/15 to-black/40";
      case 'blue': return "bg-gradient-to-br from-blue-500/15 to-black/40";
      case 'purple': return "bg-gradient-to-br from-purple-500/15 to-black/40";
      case 'gold': return "bg-gradient-to-br from-amber-500/15 to-black/40";
      default: return "bg-gradient-to-br from-white/10 to-black/40";
    }
  };
  
  const getEnhancedCardBorder = (color: string) => {
    switch(color) {
      case 'green': return "border-green-500/30";
      case 'blue': return "border-blue-500/30";
      case 'purple': return "border-purple-500/30";
      case 'gold': return "border-amber-500/30";
      default: return "border-white/20";
    }
  };

  return (
    <div 
      key={`${result.agent}-${result.title}-${index}`}
      className={`flex-none ${isMobile ? 'w-full sm:w-[85%]' : 'w-full'}`}
    >
      <Card 
        className={`
          h-full transition-all duration-300 hover:scale-[1.02] 
          ${getEnhancedCardBg(result.color)} 
          border ${getEnhancedCardBorder(result.color)}
          overflow-hidden relative backdrop-blur-sm
        `}
      >
        <CardContent className="p-6">
          {/* Agent info row */}
          <div className="flex items-center mb-4">
            <AgentAvatar 
              name={result.agent} 
              role={result.role}
              color={result.color}
              size="sm"
            />
            <div className="ml-3">
              <h4 className="font-semibold text-white">{result.agent}</h4>
              <p className="text-sm text-white/70">{result.role}</p>
            </div>
          </div>
          
          {/* Result content */}
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center text-white">
              <Sparkle className="w-4 h-4 mr-2 text-white/80" />
              {result.title}
            </h3>
            <p className="text-white/80">{result.description}</p>
          </div>

          {/* Subtle decoration */}
          <div className={`absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full blur-xl bg-${result.color === 'green' ? 'green' : result.color === 'blue' ? 'blue' : result.color === 'purple' ? 'purple' : 'amber'}-500 -translate-y-1/2 translate-x-1/2`} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentResultCard;
