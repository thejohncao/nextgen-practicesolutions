
import React, { useEffect, useRef, useState } from 'react';
import { AgentResultItem } from '@/types/agentResults';
import AgentResultCard from './AgentResultCard';

interface VerticalSliderProps {
  items: AgentResultItem[];
  isMobile: boolean;
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({ items, isMobile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const scrollPosRef = useRef(0);
  const scrollSpeed = 0.5; // slower speed for premium feel

  // Setup the scrolling animation
  const scrollItems = () => {
    if (!containerRef.current || isPaused) return;

    const container = containerRef.current;
    scrollPosRef.current += scrollSpeed;
    
    // If we've scrolled past the first item, reset position to create infinite loop
    if (scrollPosRef.current >= container.children[0].clientHeight) {
      // Move the first item to the end to create an infinite loop
      const firstItem = container.children[0];
      container.appendChild(firstItem);
      
      // Reset scroll position
      scrollPosRef.current = 0;
      container.style.transform = `translateY(0px)`;
    } else {
      // Apply the scroll position
      container.style.transform = `translateY(-${scrollPosRef.current}px)`;
    }
    
    animationRef.current = requestAnimationFrame(scrollItems);
  };

  // Initialize and clean up animation
  useEffect(() => {
    if (isMobile) return; // Don't auto-scroll on mobile
    
    animationRef.current = requestAnimationFrame(scrollItems);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, isPaused]);

  // Handle mouse interactions
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div 
      className="vertical-slider-container overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient fade effect at top */}
      <div className="absolute top-0 w-full h-16 bg-gradient-to-b from-nextgen-dark to-transparent z-10"></div>
      
      {/* Scrolling content */}
      <div 
        ref={containerRef} 
        className="vertical-slider-content transition-transform duration-300 ease-out will-change-transform"
        style={{ 
          display: 'flex', 
          flexDirection: 'column',
        }}
      >
        {/* Duplicate items to ensure seamless looping */}
        {items.map((result, index) => (
          <div 
            key={`${result.agent}-${result.title}-${index}`} 
            className="py-3"
          >
            <AgentResultCard 
              result={result}
              index={index}
              isMobile={isMobile}
              isLightMode={false}
            />
          </div>
        ))}
      </div>
      
      {/* Gradient fade effect at bottom */}
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-nextgen-dark to-transparent z-10"></div>
    </div>
  );
};

export default VerticalSlider;
