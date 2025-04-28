
import React from 'react';

const BackgroundEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] bg-[#E87C7C]/10 blur-[80px] rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
    </div>
  );
};

export default BackgroundEffect;
