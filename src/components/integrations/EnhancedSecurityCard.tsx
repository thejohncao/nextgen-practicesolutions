
import React from 'react';
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import GlowingCard from '../effects/GlowingCard';

interface EnhancedSecurityCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const EnhancedSecurityCard = ({ 
  title, 
  description, 
  icon: Icon,
  className 
}: EnhancedSecurityCardProps) => {
  return (
    <GlowingCard className={cn("group", className)}>
      <div className="p-6 bg-black/40 rounded-xl flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]">
        {/* Icon with animated ring */}
        <div className="relative">
          <div className="rounded-full p-3 bg-nextgen-purple/10 relative">
            {/* Pulsing ring animation */}
            <div className="absolute inset-0 rounded-full bg-nextgen-purple/5 animate-pulse-glow"></div>
            
            {/* Icon with shimmer effect */}
            <div className="relative sparkle-container sparkle-visible">
              <Icon className="h-6 w-6 text-nextgen-purple z-10" />
              <div className="sparkle-overlay"></div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div>
          <h4 className="font-semibold text-white group-hover:text-gradient transition-all duration-300">
            {title}
          </h4>
          <p className="text-sm text-white/60 mt-1 group-hover:text-white/80 transition-all duration-300">
            {description}
          </p>
        </div>
      </div>
    </GlowingCard>
  );
};

export default EnhancedSecurityCard;
