
import React, { useRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useSectionScrollProgress } from '@/lib/animationUtils';

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Negative values move against scroll, positive values move with scroll
  offset?: number; // Initial position offset
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  className,
  speed = -0.2,
  offset = 0,
}) => {
  const style = {
    transform: `translateY(calc(var(--section-progress) * ${speed * 100}px + ${offset}px))`,
  };

  return (
    <div 
      className={cn("absolute will-change-transform", className)}
      style={style}
    >
      {children}
    </div>
  );
};

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  as?: React.ElementType;
  preserveHeight?: boolean;
}

const ParallaxSection = forwardRef<HTMLDivElement, ParallaxSectionProps>(({
  children,
  className,
  backgroundColor = "bg-nextgen-dark",
  as: Component = "section",
  preserveHeight = true,
}, ref) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const sectionRef = ref || internalRef;
  const progress = useSectionScrollProgress(sectionRef as React.RefObject<HTMLDivElement>);
  
  return (
    <Component
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden",
        backgroundColor,
        className
      )}
      style={{ 
        '--section-progress': progress,
      } as React.CSSProperties}
    >
      {/* Pass the progress value to all children that need it */}
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child, {
          ...child.props,
        });
      })}
    </Component>
  );
});

ParallaxSection.displayName = "ParallaxSection";

export default ParallaxSection;
