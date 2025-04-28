
import React from 'react';
import { cn } from "@/lib/utils";

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string;
  children: React.ReactNode;
}

const GlowingCard = ({ 
  children, 
  glowColor = "rgba(155, 135, 245, 0.2)", // Default purple glow
  className,
  ...props 
}: GlowingCardProps) => {
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
        className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition duration-300 blur-xl"
        style={{ 
          background: glowColor,
          filter: 'blur(20px)',
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
