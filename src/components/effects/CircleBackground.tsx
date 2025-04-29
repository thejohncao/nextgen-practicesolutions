
import React from 'react';
import FloatingCircles from './FloatingCircles';

interface CircleBackgroundProps {
  children?: React.ReactNode;
  count?: number;
  opacity?: number;
  colorScheme?: 'purple' | 'blue' | 'mixed';
  scale?: number;
  speed?: number;
  className?: string;
  overlay?: boolean;
}

const CircleBackground: React.FC<CircleBackgroundProps> = ({
  children,
  count,
  opacity,
  colorScheme,
  scale,
  speed,
  className = '',
  overlay = true
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <FloatingCircles
          count={count}
          opacity={opacity}
          colorScheme={colorScheme}
          scale={scale}
          speed={speed}
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20" />
        )}
      </div>
      {children}
    </div>
  );
};

export default CircleBackground;
