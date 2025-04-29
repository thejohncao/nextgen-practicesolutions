
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'none' | 'sm' | 'md' | 'lg';
}

export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, children, cols = 3, gap = 'md' }, ref) => {
    const gapClass = {
      none: 'gap-0',
      sm: 'gap-3',
      md: 'gap-6',
      lg: 'gap-8',
    };

    const colsClass = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid w-full',
          colsClass[cols],
          gapClass[gap],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

BentoGrid.displayName = 'BentoGrid';

export interface BentoItemProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  span?: 'col' | 'row' | 'both' | 'none';
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary';
}

export const BentoItem = React.forwardRef<HTMLDivElement, BentoItemProps>(
  ({ 
    className, 
    children, 
    title, 
    description, 
    header, 
    icon, 
    span = 'none',
    variant = 'default'
  }, ref) => {
    // Define span classes based on span prop
    const getSpanClass = () => {
      switch (span) {
        case 'col':
          return 'md:col-span-2';
        case 'row':
          return 'md:row-span-2';
        case 'both':
          return 'md:col-span-2 md:row-span-2';
        default:
          return '';
      }
    };

    // Define variant classes
    const getVariantClass = () => {
      switch (variant) {
        case 'primary':
          return 'bg-white/10 hover:bg-white/15 border-white/20';
        case 'secondary':
          return 'bg-nextgen-purple/20 hover:bg-nextgen-purple/25 border-nextgen-purple/30';
        case 'tertiary':
          return 'bg-nextgen-blue/10 hover:bg-nextgen-blue/15 border-nextgen-blue/20';
        default:
          return 'bg-black/20 hover:bg-black/30 border-white/10';
      }
    };

    // Animation variants for Framer Motion
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }
      },
      hover: {
        scale: 1.02,
        boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
        transition: {
          duration: 0.3,
          ease: 'easeInOut'
        }
      }
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'group flex flex-col justify-between overflow-hidden rounded-xl backdrop-blur-sm border transition-all duration-300',
          getSpanClass(),
          getVariantClass(),
          className
        )}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-100px" }}
        variants={itemVariants}
      >
        <div className="flex flex-col p-6 md:p-8">
          {header ? header : (
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  {icon}
                </div>
              )}
              {title && <h3 className="text-xl font-semibold text-white">{title}</h3>}
            </div>
          )}
          {description && (
            <p className="mt-3 text-white/70">{description}</p>
          )}
          {children}
        </div>
      </motion.div>
    );
  }
);

BentoItem.displayName = 'BentoItem';
