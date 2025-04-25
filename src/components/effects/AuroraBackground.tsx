
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface AuroraBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  baseColor?: string;
  highlightColor?: string;
  size?: 'sm' | 'md' | 'lg';
  blur?: 'sm' | 'md' | 'lg';
  intensity?: 'low' | 'medium' | 'high';
}

const getBlurValue = (blur: 'sm' | 'md' | 'lg') => {
  const blurValues = {
    sm: 'blur-[50px]',
    md: 'blur-[100px]',
    lg: 'blur-[150px]'
  };
  return blurValues[blur];
};

const getSizeValue = (size: 'sm' | 'md' | 'lg') => {
  const sizeValues = {
    sm: 'w-[300px] h-[300px]',
    md: 'w-[500px] h-[500px]',
    lg: 'w-[800px] h-[800px]'
  };
  return sizeValues[size];
};

const getIntensityValue = (intensity: 'low' | 'medium' | 'high') => {
  const intensityValues = {
    low: 'opacity-20',
    medium: 'opacity-30',
    high: 'opacity-40'
  };
  return intensityValues[intensity];
};

export const AuroraBackground = ({
  className = '',
  children,
  baseColor = 'bg-nextgen-purple',
  highlightColor = 'bg-nextgen-blue',
  size = 'lg',
  blur = 'lg',
  intensity = 'medium'
}: AuroraBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      container.style.setProperty('--mouse-x', `${x}`);
      container.style.setProperty('--mouse-y', `${y}`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Base aurora orb */}
        <div
          className={`absolute ${getSizeValue(size)} ${getBlurValue(blur)} ${getIntensityValue(intensity)} ${baseColor} rounded-full animate-pulse-slow`}
          style={{
            left: 'calc(50% + calc(var(--mouse-x, 0.5) * 10%))',
            top: 'calc(50% + calc(var(--mouse-y, 0.5) * 10%))',
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.2s, top 0.2s',
          }}
        />
        {/* Highlight aurora orb */}
        <div
          className={`absolute ${getSizeValue(size)} ${getBlurValue(blur)} ${getIntensityValue(intensity)} ${highlightColor} rounded-full animate-pulse-slow`}
          style={{
            right: 'calc(50% + calc(var(--mouse-x, 0.5) * 10%))',
            bottom: 'calc(50% + calc(var(--mouse-y, 0.5) * 10%))',
            transform: 'translate(50%, 50%)',
            transition: 'right 0.2s, bottom 0.2s',
            animationDelay: '1s',
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default AuroraBackground;
