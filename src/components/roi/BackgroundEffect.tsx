
import React from 'react';
import GeminiEffect from '../effects/GeminiEffect';

const BackgroundEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <GeminiEffect />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/30 via-transparent to-black/30 backdrop-blur-[1px]"></div>
    </div>
  );
};

export default BackgroundEffect;
