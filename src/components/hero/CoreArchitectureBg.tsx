
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
          animation: 'pulse 45s ease-in-out infinite'
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
          {/* CPU Block */}
          <rect
            x="365"
            y="365"
            width="70"
            height="70"
            rx="4"
            fill="#242424"
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* CPU Text */}
          <text 
            x="400" 
            y="400" 
            textAnchor="middle" 
            dominantBaseline="middle"
            className="text-xs font-bold"
            fill="currentColor"
          >
            NextGen
          </text>

          {/* Circuit Lines - Horizontal & Vertical */}
          {/* Top */}
          <path d="M400 365 L400 300 L500 300 L500 200" stroke="currentColor" strokeWidth="1" />
          <path d="M400 365 L400 280 L300 280 L300 150" stroke="currentColor" strokeWidth="1" />
          
          {/* Right */}
          <path d="M435 400 L500 400 L500 450 L620 450" stroke="currentColor" strokeWidth="1" />
          <path d="M435 400 L480 400 L480 320 L580 320" stroke="currentColor" strokeWidth="1" />
          
          {/* Bottom */}
          <path d="M400 435 L400 480 L480 480 L480 560" stroke="currentColor" strokeWidth="1" />
          <path d="M400 435 L400 520 L350 520 L350 600" stroke="currentColor" strokeWidth="1" />
          
          {/* Left */}
          <path d="M365 400 L300 400 L300 350 L200 350" stroke="currentColor" strokeWidth="1" />
          <path d="M365 400 L320 400 L320 480 L220 480" stroke="currentColor" strokeWidth="1" />

          {/* Connection Points */}
          {/* Top */}
          <circle cx="500" cy="200" r="4" fill="currentColor" />
          <circle cx="300" cy="150" r="4" fill="currentColor" />
          
          {/* Right */}
          <circle cx="620" cy="450" r="4" fill="currentColor" />
          <circle cx="580" cy="320" r="4" fill="currentColor" />
          
          {/* Bottom */}
          <circle cx="480" cy="560" r="4" fill="currentColor" />
          <circle cx="350" cy="600" r="4" fill="currentColor" />
          
          {/* Left */}
          <circle cx="200" cy="350" r="4" fill="currentColor" />
          <circle cx="220" cy="480" r="4" fill="currentColor" />

          {/* Circuit Blocks */}
          {/* Top section */}
          <rect x="460" y="180" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="260" y="130" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
          
          {/* Right section */}
          <rect x="540" y="430" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="520" y="300" width="60" height="40" rx="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
          
          {/* Bottom section */}
          <rect x="440" y="540" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="310" y="580" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
          
          {/* Left section */}
          <rect x="120" y="330" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <rect x="140" y="460" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="0.5" fill="none" />

          {/* CPU Pin Connectors */}
          <rect x="375" y="365" width="4" height="4" fill="currentColor" />
          <rect x="385" y="365" width="4" height="4" fill="currentColor" />
          <rect x="395" y="365" width="4" height="4" fill="currentColor" />
          <rect x="405" y="365" width="4" height="4" fill="currentColor" />
          <rect x="415" y="365" width="4" height="4" fill="currentColor" />
          
          <rect x="375" y="431" width="4" height="4" fill="currentColor" />
          <rect x="385" y="431" width="4" height="4" fill="currentColor" />
          <rect x="395" y="431" width="4" height="4" fill="currentColor" />
          <rect x="405" y="431" width="4" height="4" fill="currentColor" />
          <rect x="415" y="431" width="4" height="4" fill="currentColor" />
          
          <rect x="365" y="375" width="4" height="4" fill="currentColor" />
          <rect x="365" y="385" width="4" height="4" fill="currentColor" />
          <rect x="365" y="395" width="4" height="4" fill="currentColor" />
          <rect x="365" y="405" width="4" height="4" fill="currentColor" />
          <rect x="365" y="415" width="4" height="4" fill="currentColor" />
          
          <rect x="431" y="375" width="4" height="4" fill="currentColor" />
          <rect x="431" y="385" width="4" height="4" fill="currentColor" />
          <rect x="431" y="395" width="4" height="4" fill="currentColor" />
          <rect x="431" y="405" width="4" height="4" fill="currentColor" />
          <rect x="431" y="415" width="4" height="4" fill="currentColor" />

          {/* Additional light indicators */}
          <circle cx="450" cy="180" r="2" fill="#00BFFF" opacity="0.8">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="550" cy="300" r="2" fill="#00FF00" opacity="0.8">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="330" r="2" fill="#FFA500" opacity="0.8">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="350" cy="600" r="2" fill="#FF00FF" opacity="0.8">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </div>
  );
};

export default CoreArchitectureBg;
