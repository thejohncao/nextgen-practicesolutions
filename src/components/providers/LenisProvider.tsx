
import React, { ReactNode, useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

interface LenisProviderProps {
  children: ReactNode;
}

const LenisProvider = ({ children }: LenisProviderProps) => {
  // Options for smooth scrolling with scroll snapping
  const options = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  };

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
