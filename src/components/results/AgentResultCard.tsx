
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
  isLightMode?: boolean;
}

const AgentResultCard = ({ result, index, isMobile, isLightMode = false }: AgentResultCardProps) => {
  // Enhanced card color functions
  const getEnhancedCardBg = (color: string, isLightMode: boolean) => {
    if (isLightMode) {
      switch(color) {
        case 'green': return "bg-gradient-to-br from-green-50/80 to-white";
        case 'blue': return "bg-gradient-to-br from-blue-50/80 to-white";
        case 'purple': return "bg-gradient-to-br from-purple-50/80 to-white";
        case 'gold': return "bg-gradient-to-br from-amber-50/80 to-white";
        default: return "bg-gradient-to-br from-gray-50/80 to-white";
      }
    } else {
      switch(color) {
        case 'green': return "bg-gradient-to-br from-green-500/20 to-black/80";
        case 'blue': return "bg-gradient-to-br from-blue-500/20 to-black/80";
        case 'purple': return "bg-gradient-to-br from-purple-500/20 to-black/80";
        case 'gold': return "bg-gradient-to-br from-amber-500/20 to-black/80";
        default: return "bg-gradient-to-br from-white/10 to-black/80";
      }
    }
  };
  
  const getEnhancedCardBorder = (color: string, isLightMode: boolean) => {
    if (isLightMode) {
      switch(color) {
        case 'green': return "border-green-200";
        case 'blue': return "border-blue-200";
        case 'purple': return "border-purple-200";
        case 'gold': return "border-amber-200";
        default: return "border-gray-200";
      }
    } else {
      switch(color) {
        case 'green': return "border-green-500/40";
        case 'blue': return "border-blue-500/40";
        case 'purple': return "border-purple-500/40";
        case 'gold': return "border-amber-500/40";
        default: return "border-white/30";
      }
    }
  };

  const getTextColor = (isLightMode: boolean) => {
    return isLightMode ? "text-gray-800" : "text-white";
  };

  const getDescriptionColor = (isLightMode: boolean) => {
    return isLightMode ? "text-gray-600" : "text-white/90";
  };

  const shimmerClass = () => {
    switch(result.color) {
      case 'green': return "shimmer-green";
      case 'blue': return "shimmer-blue";
      case 'purple': return "shimmer-purple";
      case 'gold': return "shimmer-amber";
      default: return "";
    }
  };

  return (
    <Card 
      className={`
        h-full transition-all duration-500 
        ${getEnhancedCardBg(result.color, isLightMode)} 
        border ${getEnhancedCardBorder(result.color, isLightMode)}
        overflow-hidden relative ${isLightMode ? "shadow-sm" : "backdrop-blur-md"}
        ${shimmerClass()} hover:shadow-lg hover:scale-[1.01] transition-all duration-300
      `}
    >
      <CardContent className="p-5 md:p-6">
        {/* Agent info row */}
        <div className="flex items-center mb-3">
          <AgentAvatar 
            name={result.agent} 
            role={result.role}
            color={result.color}
            size="sm"
            animated={true}
          />
          <div className="ml-3">
            <h4 className={`font-semibold text-sm md:text-base ${getTextColor(isLightMode)}`}>{result.agent}</h4>
            <p className={`text-xs md:text-sm ${isLightMode ? "text-gray-500" : "text-white/80"}`}>{result.role}</p>
          </div>
        </div>
        
        {/* Result content */}
        <div>
          <h3 className={`text-base md:text-lg font-bold mb-2 flex items-center ${getTextColor(isLightMode)}`}>
            <Sparkle className={`w-3 h-3 mr-1 md:w-4 md:h-4 md:mr-2 ${isLightMode ? "text-indigo-500" : "text-white/90"}`} />
            {result.title}
          </h3>
          <p className={`text-sm md:text-base ${getDescriptionColor(isLightMode)}`}>{result.description}</p>
        </div>

        {/* Subtle decoration */}
        <div className={`absolute top-0 right-0 w-24 h-24 opacity-${isLightMode ? '10' : '20'} rounded-full blur-xl bg-${result.color === 'green' ? 'green' : result.color === 'blue' ? 'blue' : result.color === 'purple' ? 'purple' : 'amber'}-${isLightMode ? '300' : '500'} -translate-y-1/2 translate-x-1/2`} />
      </CardContent>
    </Card>
  );
};

export default AgentResultCard;
