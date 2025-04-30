import React from 'react';
import { motion } from 'framer-motion';

interface OrbInnerEffectsProps {
  color: string;
  intensity?: "none" | "low" | "medium" | "high";
  poweredUp?: boolean;
}

const OrbInnerEffects: React.FC<OrbInnerEffectsProps> = ({ 
  color,
  intensity = "medium",
  poweredUp = false
}) => {
  if (intensity === "none") return null;
  
  // Configure animation parameters based on intensity
  const getAnimationConfig = () => {
    switch (intensity) {
      case "low":
        return { duration: 8, amplitude: 5, delay: 0 };
      case "high":
        return { duration: 4, amplitude: 15, delay: 0 };
      case "medium":
      default:
        return { duration: 6, amplitude: 10, delay: 0 };
    }
  };
  
  const { duration, amplitude, delay } = getAnimationConfig();

  return (
    <>
      {/* Main pulse effect */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="w-full h-full rounded-full bg-gradient-radial from-white/20 to-transparent"
        />
      </div>
      
      {/* Floating particles */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-white/60 blur-[0.5px]"
          initial={{ 
            x: Math.random() * 20 - 10, 
            y: Math.random() * 20 - 10,
            opacity: 0.3
          }}
          animate={{ 
            x: Math.random() * amplitude - amplitude/2, 
            y: Math.random() * amplitude - amplitude/2,
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: duration * (0.7 + Math.random() * 0.6),
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: delay + i * 0.2
          }}
        />
      ))}
      
      {/* Additional power-up effect */}
      {poweredUp && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 2,
            ease: "easeOut",
            times: [0, 0.3, 1]
          }}
          className="absolute inset-0 rounded-full bg-gradient-radial"
          style={{
            background: `radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)`
          }}
        />
      )}
    </>
  );
};

export default OrbInnerEffects;
