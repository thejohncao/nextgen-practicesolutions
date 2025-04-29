
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedGrainOverlayProps {
  className?: string;
  opacity?: number;
  animated?: boolean;
  blendMode?: 'normal' | 'overlay' | 'soft-light' | 'multiply' | 'screen';
}

const AnimatedGrainOverlay: React.FC<AnimatedGrainOverlayProps> = ({
  className,
  opacity = 0.06,
  animated = true,
  blendMode = 'soft-light'
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none",
        animated && "animate-grain",
        className
      )}
      style={{
        opacity,
        backgroundImage: 'url("/grain-texture.png")',
        backgroundRepeat: 'repeat',
        mixBlendMode: blendMode,
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
};

export default AnimatedGrainOverlay;
