
import { useState, useEffect } from 'react';

/**
 * Hook that detects if the user has requested reduced motion
 * @returns boolean indicating if reduced motion is preferred
 */
export function useReducedMotion(): boolean {
  // Default to false to ensure animations play on first render
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Watch for changes to the preference
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    
    // Modern browsers use addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
    
    // Legacy browsers use addListener (deprecated)
    // @ts-ignore - For backwards compatibility
    mediaQuery.addListener(handleChange);
    return () => {
      // @ts-ignore - For backwards compatibility
      mediaQuery.removeListener(handleChange);
    };
  }, []);
  
  return prefersReducedMotion;
}
