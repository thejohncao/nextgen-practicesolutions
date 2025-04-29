
import React, { useState, useEffect, useRef } from 'react';

interface ProgressiveCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  active?: boolean;
  formatter?: (value: number) => string;
}

const ProgressiveCounter: React.FC<ProgressiveCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 1.0,
  active = true,
  formatter
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const countRef = useRef<number>(0);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  
  // Format the number (with commas for thousands)
  const formatValue = (num: number): string => {
    if (formatter) return formatter(num);
    
    // Default formatting with commas
    if (num >= 1000) {
      return num.toLocaleString('en-US');
    }
    return num.toString();
  };
  
  // Animation function
  const animateCount = (timestamp: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / (duration * 1000), 1);
    
    // Easing function for smooth counting
    const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentCount = Math.floor(easedProgress * value);
    
    if (currentCount !== countRef.current) {
      countRef.current = currentCount;
      setDisplayValue(currentCount);
    }
    
    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animateCount);
    } else {
      setDisplayValue(value); // Ensure we end on the exact target value
    }
  };
  
  // Start/reset animation when active changes
  useEffect(() => {
    if (active) {
      // Reset values
      setDisplayValue(0);
      countRef.current = 0;
      startTimeRef.current = undefined;
      
      // Start animation
      requestRef.current = requestAnimationFrame(animateCount);
    } else {
      // Reset when not active
      setDisplayValue(0);
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [active, value]);
  
  return (
    <span className="tabular-nums">
      {prefix}{formatValue(displayValue)}{suffix}
    </span>
  );
};

export default ProgressiveCounter;
