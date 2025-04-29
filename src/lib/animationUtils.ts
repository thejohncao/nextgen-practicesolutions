
import { useEffect, useState } from 'react';
import React from 'react';

/**
 * Motion Choreography System - Core animation utilities
 */

// Timing and easing functions
export const timings = {
  fast: 0.3,
  medium: 0.5,
  slow: 0.7,
  extraSlow: 1.2,
};

export const easings = {
  smooth: [0.25, 0.1, 0.25, 1],
  bouncy: [0.34, 1.56, 0.64, 1],
  emphatic: [0.22, 1, 0.36, 1],
  snappy: [0, 0.95, 0.53, 1],
};

// Animation sequence helper
export const createSequence = (baseDelay = 0, interval = 0.1) => {
  let currentDelay = baseDelay;
  
  return {
    next: () => {
      const delay = currentDelay;
      currentDelay += interval;
      return delay;
    },
    reset: (newBaseDelay = baseDelay) => {
      currentDelay = newBaseDelay;
    },
    current: () => currentDelay,
  };
};

// Stagger children helper
export const staggerChildren = (children: React.ReactNode, delayFn: (index: number) => number) => {
  return React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    
    const delay = delayFn(index);
    const style = { ...child.props.style, animationDelay: `${delay}s` };
    
    return React.cloneElement(child, {
      ...child.props,
      style,
    });
  });
};

// Scroll progress hook
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = scrollY / height;
      setProgress(scrollProgress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return progress;
};

// Section scroll progress hook
export const useSectionScrollProgress = (sectionRef: React.RefObject<HTMLElement>) => {
  const [sectionProgress, setSectionProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the section is visible
      if (sectionTop > windowHeight) {
        // Section is below viewport
        setSectionProgress(0);
      } else if (sectionTop + sectionHeight < 0) {
        // Section is above viewport
        setSectionProgress(1);
      } else {
        // Section is partially visible
        const progress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
        setSectionProgress(Math.max(0, Math.min(1, progress)));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRef]);
  
  return sectionProgress;
};

// Element visibility hook
export const useElementVisibility = (
  ref: React.RefObject<HTMLElement>, 
  options = { rootMargin: '-10% 0%', threshold: 0.1 }
) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      }, 
      options
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);
  
  return isVisible;
};
