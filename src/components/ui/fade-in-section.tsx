
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FadeInSectionProps {
  className?: string;
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  className2?: string;
  viewport?: {
    once?: boolean;
    margin?: string;
  };
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  className,
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  once = true,
  threshold = 0.1,
  viewport = { once: true, margin: "-50px" }
}) => {
  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: 30, x: 0 };
      case 'down': return { y: -30, x: 0 };
      case 'left': return { y: 0, x: 30 };
      case 'right': return { y: 0, x: -30 };
      case 'none': return { y: 0, x: 0 };
      default: return { y: 20, x: 0 };
    }
  };

  const offset = getDirectionOffset();

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={viewport}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
