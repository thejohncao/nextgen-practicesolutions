
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import SparkleText from '../effects/SparkleText';

interface DisplayCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  className?: string;
}

const DisplayCard: React.FC<DisplayCardProps> = ({ icon: Icon, title, description, index, className }) => {
  return (
    <div 
      className={cn(
        "relative rounded-xl p-5 transition-all duration-300",
        "backdrop-blur-md bg-black/40 border border-white/10",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        "hover:shadow-[0_8px_30px_rgba(155,135,245,0.25)] hover:border-nextgen-purple/30",
        "flex flex-col gap-4",
        "transform hover:-translate-y-1",
        className
      )}
      style={{ 
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-nextgen-purple/0 via-nextgen-purple/5 to-nextgen-purple/0 opacity-0 hover:opacity-100 rounded-xl transition-opacity duration-500"></div>
      
      {/* Header with icon and title */}
      <div className="flex items-center gap-4">
        {/* Icon with animated glow */}
        <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-lg border border-white/10 shadow-inner">
          <div className="relative">
            <div className="absolute inset-0 rounded-full animate-pulse-glow bg-nextgen-purple/20 blur-md"></div>
            <Icon size={20} className="relative z-10 text-nextgen-purple" strokeWidth={1.5} />
          </div>
        </div>
        
        {/* Title */}
        <div className="flex-1">
          <SparkleText delay={index * 200} className="text-lg font-medium text-white">{title}</SparkleText>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-white/70 pl-16">{description}</p>
    </div>
  );
};

export default DisplayCard;
