
import React from 'react';

const QuantumGrid = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Primary quantum grid with animation */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"
          style={{
            animation: 'pulse 4s ease-in-out infinite',
            opacity: 0.5
          }}
        />
        
        {/* Secondary grid layer with different timing */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem]"
          style={{
            animation: 'pulse 3s ease-in-out infinite',
            animationDelay: '1s',
            opacity: 0.3
          }}
        />

        {/* Quantum particles effect */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-nextgen-purple/30"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `quantum-float ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Gradient mask for depth effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(26,31,44,0.8) 100%)'
          }}
        />
      </div>
    </div>
  );
};

export default QuantumGrid;
