
import React, { ReactNode } from 'react';

interface LenisProviderProps {
  children: ReactNode;
}

// Disabled smooth scrolling provider - passing children directly
const LenisProvider = ({ children }: LenisProviderProps) => {
  // Simply return children without any scroll modifications
  return <>{children}</>;
};

export default LenisProvider;
