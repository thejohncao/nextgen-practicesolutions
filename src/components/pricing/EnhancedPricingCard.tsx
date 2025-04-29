
import React, { useState } from 'react';
import { Check, ChevronRight, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import AgentStackDisplay from './AgentStackDisplay';
import { motion } from 'framer-motion';

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
  agents: AgentInfo[];
  ctaText: string;
  tagline?: string;
  isPopular?: boolean;
  isMastery?: boolean;
  onOpen?: () => void;
  nextTier?: string;
  onFeatureHover?: (feature: string) => void;
  onFeatureLeave?: () => void;
  highlightedFeature?: string | null;
}

const EnhancedPricingCard = ({
  name,
  stage,
  bestFor,
  features,
  agents,
  ctaText,
  tagline,
  isPopular = false,
  isMastery = false,
  onOpen,
  nextTier,
  onFeatureHover,
  onFeatureLeave,
  highlightedFeature,
}: PricingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine card's visual styling based on tier/status
  const getCardStyle = () => {
    if (isMastery) {
      return "bg-gradient-to-br from-[#FFD700]/10 via-[#FFD700]/5 to-transparent border-[#FFD700]/30";
    }
    if (isPopular) {
      return "bg-gradient-to-br from-nextgen-purple/15 via-nextgen-purple/10 to-transparent border-nextgen-purple/30";
    }
    return "bg-gradient-to-br from-white/10 to-transparent border-white/10";
  };

  // Handle chat button click
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found in pricing card, clicking...');
        chatButton.click();
      } else {
        console.log('Chat button not found, trying custom handler...');
        if (onOpen) onOpen();
      }
    } catch (error) {
      console.error('Error opening chat:', error);
      if (onOpen) onOpen();
    }
  };
  
  // Handle feature hover
  const handleFeatureHover = (feature: string) => {
    if (onFeatureHover) {
      onFeatureHover(feature);
    }
  };
  
  // Handle feature leave
  const handleFeatureLeave = () => {
    if (onFeatureLeave) {
      onFeatureLeave();
    }
  };

  return (
    <motion.div 
      className={cn(
        "relative h-full rounded-xl border backdrop-blur-sm p-6 transition-all duration-500 flex flex-col",
        getCardStyle(),
        isHovered && "transform-gpu scale-[1.02] shadow-xl",
        isPopular && "ring-1 ring-nextgen-purple/30",
        isMastery && "ring-1 ring-[#FFD700]/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isPopular && !isHovered ? [0, -5, 0] : 0
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }
      }}
      initial={false}
    >
      {/* Popular/Master badge */}
      {(isPopular || isMastery) && (
        <motion.div 
          className={cn(
            "absolute -top-4 right-4 px-4 py-1 rounded-full text-xs font-bold",
            isPopular ? "bg-nextgen-purple text-white" : "bg-[#FFD700] text-nextgen-dark"
          )}
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 0 rgba(155, 135, 245, 0.4)",
              "0 0 10px rgba(155, 135, 245, 0.6)",
              "0 0 0 rgba(155, 135, 245, 0.4)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {isPopular && "MOST POPULAR"}
          {isMastery && "MASTERY TIER"}
        </motion.div>
      )}

      {/* Glow effect based on tier */}
      <div className={cn(
        "absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity duration-500",
        isHovered && "opacity-100",
        isPopular ? "bg-nextgen-purple/5 blur-xl" : isMastery ? "bg-[#FFD700]/5 blur-xl" : "bg-white/5 blur-lg"
      )}></div>

      {/* Card header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className={cn(
              "text-2xl font-bold mb-1",
              isPopular ? "text-nextgen-purple" : isMastery ? "text-[#FFD700]" : "text-white"
            )}>
              {name}
            </h3>
            <p className="text-white/60 text-sm">{stage}</p>
          </div>

          {/* Crown for Mastery tier */}
          {isMastery && (
            <motion.div 
              className="flex-shrink-0"
              animate={{
                rotate: [0, 5, -5, 0],
                y: [0, -2, 2, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Crown className="w-6 h-6 text-[#FFD700]" />
            </motion.div>
          )}
        </div>

        {/* "Best for" indicator */}
        <div className="mt-4 p-2 bg-black/30 rounded-lg">
          <p className="text-white/80 text-sm">{bestFor}</p>
        </div>

        {/* Agent stack display */}
        <div className="mt-6">
          <AgentStackDisplay 
            agents={agents} 
            isPrimary={isPopular || isMastery} 
            displayMode="fullName"
            animated={isHovered}
          />
        </div>
      </div>

      {/* Tagline */}
      {tagline && (
        <p className="text-white/70 mb-6 text-sm italic">"{tagline}"</p>
      )}

      {/* Features list - now with interactive highlighting */}
      <div className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => {
            const isHighlighted = highlightedFeature === feature;
            
            return (
              <motion.li 
                key={index} 
                className={cn(
                  "flex items-start gap-2 text-sm p-1 rounded-lg",
                  isHovered ? "text-white" : "text-white/80",
                  isHighlighted && "bg-white/5"
                )}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={() => handleFeatureHover(feature)}
                onMouseLeave={handleFeatureLeave}
                whileHover={{ x: 2 }}
                animate={{
                  scale: isHighlighted ? 1.02 : 1,
                  backgroundColor: isHighlighted ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)"
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.25, 1, 0.5, 1]
                }}
              >
                <Check className={cn(
                  "w-4 h-4 mt-1 flex-shrink-0", 
                  isPopular ? "text-nextgen-purple" : isMastery ? "text-[#FFD700]" : "text-white/70"
                )} />
                <span>{feature}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* CTA button with enhanced animation */}
      <div className="mt-8">
        <motion.button
          onClick={handleChatOpen}
          className={cn(
            "w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 font-medium",
            isPopular 
              ? "bg-nextgen-purple hover:bg-nextgen-purple/90 text-white" 
              : isMastery 
                ? "bg-gradient-to-r from-[#FFD700]/90 to-[#FFC800] text-nextgen-dark hover:from-[#FFD700] hover:to-[#FFD700]" 
                : "bg-white/10 hover:bg-white/20 text-white"
          )}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {ctaText}
          <motion.div
            animate={{ x: isHovered ? [0, 5, 0] : 0 }}
            transition={{
              duration: 1,
              repeat: isHovered ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>

      {/* Upgrade suggestion */}
      {!isPopular && !isMastery && (
        <div 
          className={cn(
            "mt-4 text-xs text-center text-white/50 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-70"
          )}
        >
          Consider upgrading for more capabilities
        </div>
      )}
      
      {/* Floating comparison indicator that appears on hover */}
      {nextTier && (
        <div 
          className={cn(
            "absolute -right-2 top-1/2 transform -translate-y-1/2 transition-all duration-300 p-1 rounded-full bg-black/50 backdrop-blur-sm",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
          )}
        >
          <ChevronRight className="w-4 h-4 text-white/70" />
        </div>
      )}
    </motion.div>
  );
};

export default EnhancedPricingCard;
