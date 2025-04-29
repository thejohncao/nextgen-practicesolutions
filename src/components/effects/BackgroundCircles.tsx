
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  speed: number;
  direction: number;
}

interface BackgroundCirclesProps {
  variant?: 'default' | 'subtle' | 'intense';
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  density?: 'low' | 'medium' | 'high';
  animate?: boolean;
  maxOpacity?: number;
  blurAmount?: string;
}

const BackgroundCircles: React.FC<BackgroundCirclesProps> = ({
  variant = 'default',
  className,
  primaryColor = 'rgba(155, 135, 245, 0.15)',
  secondaryColor = 'rgba(30, 174, 219, 0.12)',
  density = 'medium',
  animate = true,
  maxOpacity = 0.4,
  blurAmount = '120px'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circles = useRef<Circle[]>([]);
  const requestRef = useRef<number>();
  
  // Determine circle count based on density
  const getCircleCount = () => {
    const baseCounts = { low: 3, medium: 5, high: 8 };
    return baseCounts[density];
  };

  // Generate initial circles
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    const circleCount = getCircleCount();
    const newCircles: Circle[] = [];
    
    for (let i = 0; i < circleCount; i++) {
      const isEven = i % 2 === 0;
      const color = isEven ? primaryColor : secondaryColor;
      const baseRadius = Math.min(width, height) * (isEven ? 0.3 : 0.25);
      
      newCircles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: baseRadius * (0.7 + Math.random() * 0.6),
        color,
        opacity: (0.2 + Math.random() * 0.6) * maxOpacity,
        speed: 0.2 + Math.random() * 0.4,
        direction: Math.random() > 0.5 ? 1 : -1
      });
    }
    
    circles.current = newCircles;
  }, [density, primaryColor, secondaryColor, maxOpacity]);

  // Set up animation loop
  useEffect(() => {
    if (!animate || !containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    const animate = () => {
      circles.current = circles.current.map(circle => {
        const newOpacity = circle.opacity + (0.002 * circle.direction);
        
        if (newOpacity > maxOpacity || newOpacity < maxOpacity * 0.3) {
          circle.direction *= -1;
        }
        
        return {
          ...circle,
          opacity: Math.max(0.1, Math.min(maxOpacity, newOpacity)),
          x: circle.x + (Math.sin(Date.now() * 0.0001 * circle.speed) * 0.5),
          y: circle.y + (Math.cos(Date.now() * 0.0001 * circle.speed) * 0.5)
        };
      });
      
      renderCircles();
      requestRef.current = requestAnimationFrame(animate);
    };
    
    const renderCircles = () => {
      if (!containerRef.current) return;
      
      const circles = containerRef.current.querySelectorAll<HTMLDivElement>('.background-circle');
      
      circles.current.forEach((circle, index) => {
        if (circles[index]) {
          const el = circles[index];
          el.style.left = `${circle.x}px`;
          el.style.top = `${circle.y}px`;
          el.style.width = `${circle.radius * 2}px`;
          el.style.height = `${circle.radius * 2}px`;
          el.style.backgroundColor = circle.color;
          el.style.opacity = String(circle.opacity);
          el.style.filter = `blur(${blurAmount})`;
        }
      });
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, maxOpacity, blurAmount]);

  // Apply different styles based on variant
  const getVariantClass = () => {
    switch (variant) {
      case 'subtle':
        return 'opacity-30';
      case 'intense':
        return 'opacity-70';
      default:
        return 'opacity-50';
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        getVariantClass(),
        className
      )}
      aria-hidden="true"
    >
      {circles.current.map((circle, index) => (
        <div
          key={index}
          className={`background-circle absolute rounded-full transition-opacity duration-1000 will-change-[transform,opacity]`}
          style={{
            left: circle.x,
            top: circle.y,
            width: circle.radius * 2,
            height: circle.radius * 2,
            backgroundColor: circle.color,
            opacity: circle.opacity,
            filter: `blur(${blurAmount})`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundCircles;
