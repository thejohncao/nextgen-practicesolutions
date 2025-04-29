
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-in' | 'scale-in' | 'zoom-out';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

const ScrollRevealWrapper: React.FC<ScrollRevealWrapperProps> = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 0.7,
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '-10%',
  staggerChildren = false,
  staggerDelay = 0.1,
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all will-change-transform will-change-opacity';
    const durationClass = `duration-${Math.round(duration * 1000)}`;
    const delayClass = delay > 0 ? `delay-${delay * 1000}` : '';
    
    const initialStyles = {
      'fade-up': 'opacity-0 translate-y-8',
      'fade-in': 'opacity-0',
      'slide-in': 'opacity-0 -translate-x-8',
      'scale-in': 'opacity-0 scale-95',
      'zoom-out': 'opacity-0 scale-105',
    }[animation];
    
    const visibleClass = 'opacity-100 translate-y-0 translate-x-0 scale-100';
    
    return {
      base: `${baseClasses} ${durationClass} ${delayClass}`,
      initial: initialStyles,
      visible: visibleClass,
    };
  };

  const animationClasses = getAnimationClasses();
  
  const getStaggeredChildren = () => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      
      const childDelay = delay + (index * staggerDelay);
      const delayStyle = { transitionDelay: `${childDelay}s` };
      
      return React.cloneElement(child, {
        className: cn(
          child.props.className,
          animationClasses.base,
          isVisible ? animationClasses.visible : animationClasses.initial
        ),
        style: {
          ...child.props.style,
          ...delayStyle
        }
      });
    });
  };

  return (
    <div 
      ref={ref}
      className={cn(
        className,
        !staggerChildren && animationClasses.base,
        !staggerChildren && (isVisible ? animationClasses.visible : animationClasses.initial)
      )}
    >
      {staggerChildren ? getStaggeredChildren() : children}
    </div>
  );
};

export default ScrollRevealWrapper;
