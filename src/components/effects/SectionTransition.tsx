
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTransitionProps {
  className?: string;
  type?: 'fade' | 'blur' | 'gradient';
  position?: 'top' | 'bottom' | 'both';
  height?: number;
  color?: string;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  className,
  type = 'fade',
  position = 'bottom',
  height = 16,
  color = 'nextgen-dark'
}) => {
  const getGradientClass = (pos: 'top' | 'bottom') => {
    if (type === 'fade') {
      return pos === 'top' 
        ? `bg-gradient-to-b from-${color} to-transparent` 
        : `bg-gradient-to-t from-${color} to-transparent`;
    }
    
    if (type === 'blur') {
      return pos === 'top'
        ? `bg-gradient-to-b from-${color} via-${color}/80 to-transparent backdrop-blur-sm`
        : `bg-gradient-to-t from-${color} via-${color}/80 to-transparent backdrop-blur-sm`;
    }
    
    return pos === 'top'
      ? `bg-gradient-to-b from-${color} via-${color}/90 to-${color}/30`
      : `bg-gradient-to-t from-${color} via-${color}/90 to-${color}/30`;
  };

  return (
    <>
      {(position === 'top' || position === 'both') && (
        <div 
          className={cn(
            "absolute top-0 left-0 right-0 z-10",
            getGradientClass('top'),
            className
          )}
          style={{ height: `${height}px` }}
          aria-hidden="true"
        />
      )}
      {(position === 'bottom' || position === 'both') && (
        <div 
          className={cn(
            "absolute bottom-0 left-0 right-0 z-10",
            getGradientClass('bottom'),
            className
          )}
          style={{ height: `${height}px` }}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default SectionTransition;
