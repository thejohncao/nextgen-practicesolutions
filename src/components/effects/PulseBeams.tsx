
import React from 'react';

interface PulseBeamsProps {
  opacity?: number;
  className?: string;
}

const PulseBeams = ({ opacity = 0.05, className = "" }: PulseBeamsProps) => {
  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <div className="relative w-full h-full">
        {/* Pulse beams */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[40rem] h-[40rem]">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full animate-pulse-slow"
                style={{
                  background: 'radial-gradient(circle, rgba(155,135,245,0.2) 0%, rgba(155,135,245,0) 70%)',
                  animationDelay: `${i * 1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseBeams;
