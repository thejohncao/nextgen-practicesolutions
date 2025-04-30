
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A responsive grid layout for hero sections that adapts between 
 * desktop and mobile layouts automatically
 */
const HeroGrid: React.FC<HeroGridProps> = ({ children, className }) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={cn(
        "w-full h-full",
        isMobile 
          ? "grid grid-cols-1 gap-8 px-4" 
          : "grid grid-cols-12 gap-4 px-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default HeroGrid;

/**
 * Content area for the hero section (typically left side)
 */
export const HeroContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={cn(
        isMobile 
          ? "col-span-1 text-center" 
          : "col-span-5 lg:col-span-6 text-left",
        "flex flex-col justify-center z-10",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Visual area for the hero section (typically right side)
 */
export const HeroVisual: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={cn(
        isMobile 
          ? "col-span-1 order-first mb-6" 
          : "col-span-7 lg:col-span-6 order-last",
        "flex items-center justify-center relative z-0",
        className
      )}
    >
      {children}
    </div>
  );
};
