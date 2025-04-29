
import React from 'react';

interface OrbGlowEffectProps {
  color: string;
  intensity?: "none" | "low" | "medium" | "high";
}

const OrbGlowEffect: React.FC<OrbGlowEffectProps> = ({ color = "purple", intensity = "medium" }) => {
  // Skip rendering if intensity is none
  if (intensity === "none") return null;
  
  // Map color names to RGB values for dynamic CSS
  const colorMap: Record<string, string> = {
    blue: "74, 140, 255", // Miles
    green: "63, 198, 160", // Giselle
    purple: "139, 92, 246", // Devon
    gold: "245, 158, 11", // Alma
    red: "239, 68, 68"
  };
  
  // Map intensity to visual properties
  const intensityMap: Record<string, { opacity: number, scale: number, blurSize: number }> = {
    low: { opacity: 0.3, scale: 1.2, blurSize: 15 },
    medium: { opacity: 0.4, scale: 1.5, blurSize: 20 },
    high: { opacity: 0.5, scale: 1.8, blurSize: 25 },
  };
  
  const { opacity, scale, blurSize } = intensityMap[intensity] || intensityMap.medium;
  const rgbColor = colorMap[color] || colorMap.purple;
  
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {/* Outer glow effect */}
      <div 
        className="absolute inset-0 rounded-full animate-pulse-slow"
        style={{ 
          opacity: opacity,
          transform: `scale(${scale})`,
          background: `radial-gradient(circle, rgba(${rgbColor}, 0.3) 0%, rgba(${rgbColor}, 0) 70%)`,
          filter: `blur(${blurSize}px)`,
        }}
      />
      
      {/* Inner particles/sparks (for high and medium intensities) */}
      {intensity !== "low" && (
        <div className="absolute inset-0">
          {[...Array(intensity === "high" ? 8 : 5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `float ${Math.random() * 3 + 2}s infinite alternate ease-in-out`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrbGlowEffect;
