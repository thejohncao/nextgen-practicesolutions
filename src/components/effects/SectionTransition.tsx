
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTransitionProps {
  className?: string;
  type?: 'fade' | 'blur' | 'gradient' | 'parallax' | 'wave';
  position?: 'top' | 'bottom' | 'both';
  height?: number;
  color?: string;
  intensity?: 'light' | 'medium' | 'strong';
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  className,
  type = 'fade',
  position = 'bottom',
  height = 16,
  color = 'nextgen-dark',
  intensity = 'medium'
}) => {
  // Get opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case 'light': return { from: '1', to: '0.2' };
      case 'strong': return { from: '1', to: '0' };
      default: return { from: '1', to: '0.1' };
    }
  };
  
  const opacityValues = getOpacity();
  
  const getGradientClass = (pos: 'top' | 'bottom') => {
    if (type === 'fade') {
      return pos === 'top' 
        ? `bg-gradient-to-b from-${color} from-opacity-${opacityValues.from} to-transparent` 
        : `bg-gradient-to-t from-${color} from-opacity-${opacityValues.from} to-transparent`;
    }
    
    if (type === 'blur') {
      return pos === 'top'
        ? `bg-gradient-to-b from-${color} via-${color}/80 to-transparent backdrop-blur-sm`
        : `bg-gradient-to-t from-${color} via-${color}/80 to-transparent backdrop-blur-sm`;
    }
    
    if (type === 'parallax') {
      return pos === 'top'
        ? `bg-gradient-to-b from-${color} via-${color}/70 to-transparent backdrop-filter backdrop-blur-[2px]`
        : `bg-gradient-to-t from-${color} via-${color}/70 to-transparent backdrop-filter backdrop-blur-[2px]`;
    }
    
    if (type === 'wave') {
      return pos === 'top'
        ? `bg-gradient-to-b from-${color} via-${color}/80 to-transparent`
        : `bg-gradient-to-t from-${color} via-${color}/80 to-transparent`;
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
            "absolute top-0 left-0 right-0 z-10 pointer-events-none",
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
            "absolute bottom-0 left-0 right-0 z-10 pointer-events-none",
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
