
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SparkleTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const SparkleText = ({ children, className, delay = 0 }: SparkleTextProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={cn('relative sparkle-container overflow-hidden', className, isVisible ? 'sparkle-visible' : 'sparkle-hidden')}>
      <span className="sparkle-text">{children}</span>
      <div className="sparkle-overlay" />
    </div>
  );
};

export default SparkleText;
