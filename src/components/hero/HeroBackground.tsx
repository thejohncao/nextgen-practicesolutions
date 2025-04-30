
import React from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-nextgen-purple/10 blur-[120px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-nextgen-blue/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
    </div>
  );
};

export default HeroBackground;
