
import { useState, useEffect, useRef, RefObject } from 'react';

export type AnimationTriggerOptions = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
};

/**
 * Hook for triggering animations based on element visibility using Intersection Observer API
 */
export const useIntersectionAnimation = <T extends HTMLElement>(
  options: AnimationTriggerOptions = {}
): [RefObject<T>, boolean] => {
  const {
    threshold = 0.2,
    rootMargin = '-10% 0%',
    triggerOnce = true,
    delay = 0
  } = options;
  
  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  
  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement || (triggerOnce && hasTriggered)) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          // Use setTimeout to allow for delayed animation triggering
          setTimeout(() => {
            setIsVisible(true);
            if (triggerOnce) setHasTriggered(true);
          }, delay);
          
          if (triggerOnce) {
            // Clean up observer after triggering once
            observer.unobserve(currentElement);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(currentElement);
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered, delay]);
  
  return [elementRef, isVisible];
};

/**
 * Hook for tracking scroll progress through a section
 */
export const useSectionScrollProgress = <T extends HTMLElement>(): [RefObject<T>, number] => {
  const sectionRef = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const calculateProgress = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Start when the element top hits the bottom of the viewport
      const start = windowHeight;
      // End when the element bottom hits the top of the viewport
      const end = rect.height + windowHeight;
      
      // Current position (relative to start)
      const current = window.scrollY + windowHeight - rect.top;
      
      // Calculate progress (0 to 1)
      const newProgress = Math.max(0, Math.min(1, current / (end - start)));
      setProgress(newProgress);
    };
    
    window.addEventListener('scroll', calculateProgress, { passive: true });
    calculateProgress(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', calculateProgress);
    };
  }, []);
  
  return [sectionRef, progress];
};
