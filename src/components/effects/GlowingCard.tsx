
import React from 'react';
import { cn } from "@/lib/utils";

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string;
  glowIntensity?: 'soft' | 'medium' | 'strong';
  children: React.ReactNode;
}

const GlowingCard = ({ 
  children, 
  glowColor = "rgba(155, 135, 245, 0.2)", // Default purple glow
  glowIntensity = 'soft',
  className,
  ...props 
}: GlowingCardProps) => {
  const getIntensityValue = (intensity: string) => {
    switch (intensity) {
      case 'soft': return '0.2';
      case 'medium': return '0.3';
      case 'strong': return '0.4';
      default: return '0.2';
    }
  };

  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden group transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Glow Effect */}
      <div 
        className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition duration-700"
        style={{ 
          background: glowColor,
          filter: 'blur(20px)',
          animation: 'glow 2s ease-in-out infinite',
        }}
      />
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default GlowingCard;
