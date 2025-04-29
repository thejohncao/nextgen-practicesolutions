
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
    
    // Check if container has children before trying to access them
    if (!container.children.length) {
      console.log('No children found in vertical slider container');
      return;
    }
    
    scrollPosRef.current += scrollSpeed;
    
    // Safe access to first child with null check
    const firstChildHeight = container.children[0]?.clientHeight;
    
    // If we couldn't get the height or there's no first child, don't proceed
    if (!firstChildHeight) {
      console.log('Could not determine height of first child in vertical slider');
      return;
    }
    
    // If we've scrolled past the first item, reset position to create infinite loop
    if (scrollPosRef.current >= firstChildHeight) {
      // Check if the first child exists before operating on it
      const firstItem = container.children[0];
      if (firstItem) {
        container.appendChild(firstItem);
      }
      
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
    // Don't start animation if we're on mobile or if items array is empty
    if (isMobile || !items || items.length === 0) return;
    
    // Give DOM time to render before starting animation
    const timeout = setTimeout(() => {
      animationRef.current = requestAnimationFrame(scrollItems);
    }, 500);
    
    return () => {
      clearTimeout(timeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, isPaused, items]);

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
        {/* Only render items if we have them */}
        {items && items.length > 0 ? (
          items.map((result, index) => (
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
          ))
        ) : (
          <div className="py-3 text-center text-white/60">No result data available</div>
        )}
      </div>
      
      {/* Gradient fade effect at bottom */}
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-nextgen-dark to-transparent z-10"></div>
    </div>
  );
};

export default VerticalSlider;
