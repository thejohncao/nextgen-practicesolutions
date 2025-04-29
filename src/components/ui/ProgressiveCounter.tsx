
import React, { useState, useEffect, useRef } from 'react';

interface ProgressiveCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  active?: boolean;
  decimals?: number;
}

const ProgressiveCounter: React.FC<ProgressiveCounterProps> = ({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  active = true,
  decimals = 0
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const countRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  // Format the number with commas and decimals
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };
  
  // Check for reduced motion preference
  const prefersReducedMotion = useRef(false);
  
  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    if (!active) {
      setDisplayValue(0);
      return;
    }
    
    // If reduced motion is preferred, just set the final value
    if (prefersReducedMotion.current) {
      setDisplayValue(value);
      return;
    }
    
    // Animate the counting
    const animateCount = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Use easing for more natural counting
      const easedProgress = easeOutExpo(progress);
      const currentValue = Math.floor(value * easedProgress);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        countRef.current = requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(value);
      }
    };
    
    countRef.current = requestAnimationFrame(animateCount);
    
    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current);
      }
    };
  }, [value, duration, active]);
  
  // Reset when becoming inactive
  useEffect(() => {
    if (!active) {
      setDisplayValue(0);
      startTimeRef.current = null;
    }
  }, [active]);
  
  // Easing function for smoother counting
  const easeOutExpo = (x: number): number => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };
  
  return (
    <span>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
};

export default ProgressiveCounter;
