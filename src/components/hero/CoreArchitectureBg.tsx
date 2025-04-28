
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
          opacity: 0.07
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-[1200px] max-h-[1200px]"
        >
          {/* Central CPU Block */}
          <g>
            {/* Main CPU Frame */}
            <rect x="500" y="500" width="200" height="200" fill="#242424" stroke="currentColor" strokeWidth="1" />
            <rect x="510" y="510" width="180" height="180" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" />
            <rect x="520" y="520" width="160" height="160" fill="none" stroke="currentColor" strokeWidth="0.5" />
            
            {/* CPU Grid Pattern */}
            <path d="M520 540 H680 M520 560 H680 M520 580 H680 M520 600 H680 M520 620 H680 M520 640 H680 M520 660 H680" 
                  stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
            <path d="M540 520 V680 M560 520 V680 M580 520 V680 M600 520 V680 M620 520 V680 M640 520 V680 M660 520 V680" 
                  stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />

            {/* CPU Text */}
            <text x="600" y="610" textAnchor="middle" className="text-sm font-bold" fill="currentColor">NextGen</text>
          </g>

          {/* Circuit Paths - 45° angles */}
          {/* Top Left */}
          <path d="M500 600 L400 600 L400 400 L300 400" stroke="currentColor" strokeWidth="0.5" />
          <path d="M500 550 L450 550 L450 350 L250 350" stroke="currentColor" strokeWidth="0.5" />
          
          {/* Top Right */}
          <path d="M700 600 L800 600 L800 400 L900 400" stroke="currentColor" strokeWidth="0.5" />
          <path d="M700 550 L750 550 L750 350 L950 350" stroke="currentColor" strokeWidth="0.5" />
          
          {/* Bottom Left */}
          <path d="M500 700 L400 700 L400 800 L300 800" stroke="currentColor" strokeWidth="0.5" />
          <path d="M500 650 L450 650 L450 850 L250 850" stroke="currentColor" strokeWidth="0.5" />
          
          {/* Bottom Right */}
          <path d="M700 700 L800 700 L800 800 L900 800" stroke="currentColor" strokeWidth="0.5" />
          <path d="M700 650 L750 650 L750 850 L950 850" stroke="currentColor" strokeWidth="0.5" />

          {/* Circuit Components */}
          {/* Top */}
          <rect x="240" y="330" width="60" height="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="900" y="330" width="60" height="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
          
          {/* Bottom */}
          <rect x="240" y="830" width="60" height="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="900" y="830" width="60" height="40" stroke="currentColor" strokeWidth="0.5" fill="none" />

          {/* Circuit Nodes */}
          <circle cx="400" cy="400" r="3" fill="currentColor" />
          <circle cx="800" cy="400" r="3" fill="currentColor" />
          <circle cx="400" cy="800" r="3" fill="currentColor" />
          <circle cx="800" cy="800" r="3" fill="currentColor" />

          {/* Pin Arrays */}
          {/* Top */}
          {Array.from({length: 8}).map((_, i) => (
            <rect key={`top-${i}`} x={520 + i * 20} y="490" width="4" height="4" fill="currentColor" />
          ))}
          {/* Bottom */}
          {Array.from({length: 8}).map((_, i) => (
            <rect key={`bottom-${i}`} x={520 + i * 20} y="706" width="4" height="4" fill="currentColor" />
          ))}
          {/* Left */}
          {Array.from({length: 8}).map((_, i) => (
            <rect key={`left-${i}`} x="490" y={520 + i * 20} width="4" height="4" fill="currentColor" />
          ))}
          {/* Right */}
          {Array.from({length: 8}).map((_, i) => (
            <rect key={`right-${i}`} x="706" y={520 + i * 20} width="4" height="4" fill="currentColor" />
          ))}

          {/* Data Flow Indicators */}
          {Array.from({length: 8}).map((_, i) => (
            <circle 
              key={`indicator-${i}`} 
              cx={300 + i * 100} 
              cy={300 + i * 100} 
              r="2" 
              fill="#00BFFF" 
              opacity="0.6"
            >
              <animate 
                attributeName="opacity"
                values="0.2;0.6;0.2"
                dur={`${3 + i}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Memory Blocks */}
          <g>
            <rect x="200" y="200" width="100" height="60" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <rect x="900" y="200" width="100" height="60" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <rect x="200" y="940" width="100" height="60" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <rect x="900" y="940" width="100" height="60" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </g>

          {/* Bus Lines */}
          <path d="M300 230 L500 230" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" />
          <path d="M700 230 L900 230" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" />
          <path d="M300 970 L500 970" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" />
          <path d="M700 970 L900 970" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" />
        </svg>
      </div>
    </div>
  );
};

export default CoreArchitectureBg;
