
import React from 'react';
import { cn } from '@/lib/utils';

interface SparkleTextProps {
  children: React.ReactNode;
  className?: string;
}

const SparkleText = ({ children, className }: SparkleTextProps) => {
  return (
    <div className={cn('relative sparkle-container', className)}>
      <span className="sparkle-text">{children}</span>
      <div className="sparkle-overlay" />
    </div>
  );
};

export default SparkleText;
