
import React, { ReactNode, useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

interface LenisProviderProps {
  children: ReactNode;
}

const LenisProvider = ({ children }: LenisProviderProps) => {
  // Refined options for smoother scrolling experience
  const options = {
    duration: 1.6,  // Increased for smoother transitions
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 0.8, // Reduced for better control
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  };

  // Prevent body scroll when using mousewheel
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
