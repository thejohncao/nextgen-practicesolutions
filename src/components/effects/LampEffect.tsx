
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface LampEffectProps {
  children: React.ReactNode;
  className?: string;
}

const LampEffect = ({ children, className = "" }: LampEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const bounds = containerRef.current.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      
      containerRef.current.style.setProperty('--x', `${x}px`);
      containerRef.current.style.setProperty('--y', `${y}px`);
    };

    const container = containerRef.current;
    if (container && !isMobile) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container && !isMobile) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  // Return basic container on mobile
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div 
      ref={containerRef}
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lamp-gradient absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
};

export default LampEffect;
