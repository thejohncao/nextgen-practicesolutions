
import React from 'react';

interface OrbGlowEffectProps {
  color: string;
  intensity: "none" | "low" | "medium" | "high";
  size?: "small" | "medium" | "large";
}

const OrbGlowEffect = ({ color, intensity, size = "medium" }: OrbGlowEffectProps) => {
  // Map colors to CSS classes
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    gold: 'bg-amber-500',
  };

  // Map colors to opacity values based on intensity
  const getOpacities = () => {
    switch (intensity) {
      case "high": return { inner: "opacity-25", outer: "opacity-15" };
      case "medium": return { inner: "opacity-15", outer: "opacity-10" };
      case "low": return { inner: "opacity-10", outer: "opacity-5" };
      case "none": 
      default: return { inner: "opacity-0", outer: "opacity-0" };
    }
  };
  
  // Map sizes to CSS classes
  const getSizeClasses = () => {
    switch (size) {
      case "small": return { 
        outer: "w-14 h-14 -top-3 -left-3", 
        inner: "w-10 h-10 -top-1.5 -left-1.5" 
      };
      case "large": return { 
        outer: "w-24 h-24 -top-6 -left-6", 
        inner: "w-16 h-16 -top-3 -left-3" 
      };
      case "medium":
      default: return { 
        outer: "w-20 h-20 -top-5 -left-5", 
        inner: "w-14 h-14 -top-2 -left-2" 
      };
    }
  };

  const { inner: innerOpacity, outer: outerOpacity } = getOpacities();
  const { inner: innerSize, outer: outerSize } = getSizeClasses();
  const colorClass = colorMap[color] || 'bg-blue-500';

  return (
    <>
      {/* Outer glow - larger and more diffuse */}
      <div className={`absolute ${outerSize} rounded-full blur-xl ${colorClass} ${outerOpacity} animate-pulse-slow pointer-events-none`}></div>
      
      {/* Inner glow - smaller and more concentrated */}
      <div className={`absolute ${innerSize} rounded-full blur-md ${colorClass} ${innerOpacity} animate-pulse-slow pointer-events-none`} 
        style={{animationDelay: '0.5s'}}></div>
    </>
  );
};

export default OrbGlowEffect;
