
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const CoreArchitectureBg = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: 0.07,
          animation: 'rotate 45s linear infinite'
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-[800px] max-h-[800px]"
        >
          {/* Central NextGen Text */}
          <text 
            x="400" 
            y="400" 
            textAnchor="middle" 
            dominantBaseline="middle"
            className="text-3xl font-bold"
            fill="currentColor"
          >
            NextGen
          </text>

          {/* Core Circle */}
          <circle cx="400" cy="400" r="60" stroke="currentColor" strokeWidth="1" />
          <circle cx="400" cy="400" r="85" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />

          {/* Connection Lines */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
            <React.Fragment key={angle}>
              <line
                x1="400"
                y1="400"
                x2={400 + Math.cos(angle * Math.PI / 180) * 300}
                y2={400 + Math.sin(angle * Math.PI / 180) * 300}
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
              <circle
                cx={400 + Math.cos(angle * Math.PI / 180) * 300}
                cy={400 + Math.sin(angle * Math.PI / 180) * 300}
                r="8"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </React.Fragment>
          ))}

          {/* Outer Rings */}
          <circle 
            cx="400" 
            cy="400" 
            r="200" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            strokeDasharray="8 8"
            className="animate-pulse-slow"
          />
          <circle 
            cx="400" 
            cy="400" 
            r="300" 
            stroke="currentColor" 
            strokeWidth="0.3"
            strokeDasharray="12 12" 
          />
        </svg>
      </div>
    </div>
  );
};

export default CoreArchitectureBg;
