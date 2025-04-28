
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
  
  // Disable on mobile
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={(e) => {
        if (!containerRef.current) return;
        const bounds = containerRef.current.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        
        containerRef.current.style.setProperty('--x', `${x}px`);
        containerRef.current.style.setProperty('--y', `${y}px`);
      }}
    >
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(600px circle at var(--x) var(--y), rgba(255,255,255,0.06), transparent 40%)',
        }}
      />
      {children}
    </motion.div>
  );
};

export default LampEffect;
