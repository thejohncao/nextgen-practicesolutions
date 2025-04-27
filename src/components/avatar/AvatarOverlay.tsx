
import React from 'react';

interface AvatarOverlayProps {
  isAnimating: boolean;
}

const AvatarOverlay = ({ isAnimating }: AvatarOverlayProps) => {
  return (
    <div className={`absolute inset-0 rounded-full overflow-hidden ${isAnimating ? 'opacity-70' : 'opacity-30'}`}>
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-flow" 
        style={{ animationDuration: isAnimating ? '1.5s' : '3s' }}
      />
    </div>
  );
};

export default AvatarOverlay;
