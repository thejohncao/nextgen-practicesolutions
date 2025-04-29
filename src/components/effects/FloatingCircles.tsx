
import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  speed: number;
  angle: number;
  orbitRadius: number;
  orbitCenterX: number;
  orbitCenterY: number;
  breathingSpeed: number;
  breathingOffset: number;
}

interface FloatingCirclesProps {
  count?: number;
  opacity?: number;
  colorScheme?: 'purple' | 'blue' | 'mixed';
  scale?: number;
  speed?: number;
  className?: string;
  reduceOnMobile?: boolean;
}

const FloatingCircles: React.FC<FloatingCirclesProps> = ({
  count = 15,
  opacity = 0.06,
  colorScheme = 'mixed',
  scale = 1,
  speed = 1,
  className = '',
  reduceOnMobile = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const circlesRef = useRef<Circle[]>([]);
  const isMobile = useIsMobile();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Throttle for performance
  const throttleRef = useRef<number>(0);
  const FPS = isMobile ? 30 : 60; // Lower FPS on mobile for better performance
  const frameTime = 1000 / FPS;

  // Generate colors based on scheme
  const getColorScheme = () => {
    const colors = {
      purple: ['rgba(155, 135, 245, 1)', 'rgba(126, 105, 171, 1)', 'rgba(110, 89, 165, 1)', 'rgba(214, 188, 250, 1)'],
      blue: ['rgba(59, 130, 246, 1)', 'rgba(96, 165, 250, 1)', 'rgba(147, 197, 253, 1)'],
      mixed: ['rgba(155, 135, 245, 1)', 'rgba(59, 130, 246, 1)', 'rgba(214, 188, 250, 1)', 'rgba(147, 197, 253, 1)', 'rgba(255, 255, 255, 1)']
    };
    return colors[colorScheme];
  };

  const initializeCircles = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    // Adjust circle count based on screen size and reduceOnMobile setting
    const adjustedCount = (isMobile && reduceOnMobile) ? Math.floor(count / 2.5) : count;
    
    const circles: Circle[] = [];
    const colors = getColorScheme();
    
    for (let i = 0; i < adjustedCount; i++) {
      const radius = (Math.random() * 150 + 50) * scale;
      const orbitCenterX = Math.random() * width;
      const orbitCenterY = Math.random() * height;
      const orbitRadius = Math.random() * 100 + 50;
      const angle = Math.random() * Math.PI * 2;
      const x = orbitCenterX + Math.cos(angle) * orbitRadius;
      const y = orbitCenterY + Math.sin(angle) * orbitRadius;
      
      circles.push({
        x,
        y,
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: (Math.random() * 0.05 + 0.02) * opacity,
        speed: (Math.random() * 0.0002 + 0.0001) * speed,
        angle,
        orbitRadius,
        orbitCenterX,
        orbitCenterY,
        breathingSpeed: Math.random() * 0.001 + 0.0005,
        breathingOffset: Math.random() * Math.PI * 2,
      });
    }
    
    circlesRef.current = circles;
  };
  
  const updateCanvasSize = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    
    // Use getBoundingClientRect for more accurate dimensions
    const rect = canvas.getBoundingClientRect();
    
    setDimensions({
      width: rect.width,
      height: rect.height
    });
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    
    updateCanvasSize();
    initializeCircles();
    
    const handleResize = () => {
      // Debounce resize handler
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      requestRef.current = requestAnimationFrame(() => {
        updateCanvasSize();
        initializeCircles();
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    const animate = (timestamp: number) => {
      if (!canvasRef.current) return;
      
      // Throttle animation frames for better performance
      if (timestamp - throttleRef.current < frameTime) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      
      throttleRef.current = timestamp;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;
      
      // Use clearRect with the correct dimensions
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      
      // Request next frame before heavy calculation to ensure smooth animation
      requestRef.current = requestAnimationFrame(animate);
      
      circlesRef.current.forEach(circle => {
        // Update position using orbital motion
        circle.angle += circle.speed;
        circle.x = circle.orbitCenterX + Math.cos(circle.angle) * circle.orbitRadius;
        circle.y = circle.orbitCenterY + Math.sin(circle.angle) * circle.orbitRadius;
        
        // Calculate breathing effect
        const breathingFactor = 0.15 * Math.sin(performance.now() * circle.breathingSpeed + circle.breathingOffset) + 1;
        const currentAlpha = circle.alpha * breathingFactor;
        
        // Draw circle with proper transform
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color.replace('1)', `${currentAlpha})`);
        ctx.fill();
      });
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [count, opacity, colorScheme, scale, speed, isMobile, reduceOnMobile]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none will-change-transform ${className}`}
      style={{
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  );
};

export default FloatingCircles;
