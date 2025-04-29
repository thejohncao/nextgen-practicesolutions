
import React from 'react';

interface AvatarOverlayProps {
  isAnimating: boolean;
}

const AvatarOverlay = ({ isAnimating }: AvatarOverlayProps) => {
  return (
    <div className={`absolute inset-0 rounded-full overflow-hidden ${isAnimating ? 'opacity-70' : 'opacity-30'} bg-transparent`}>
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-flow bg-transparent" 
        style={{ animationDuration: isAnimating ? '1.5s' : '3s' }}
      />
    </div>
  );
};

export default AvatarOverlay;
