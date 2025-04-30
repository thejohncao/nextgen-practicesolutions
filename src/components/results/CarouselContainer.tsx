
import React, { useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { AgentResult } from '@/types/agentResults';
import { useIsMobile } from '@/hooks/use-mobile';
import AgentAvatar from '../AgentAvatar';

interface CarouselContainerProps {
  children?: React.ReactNode;
  isPaused?: boolean;
  setIsPaused?: (isPaused: boolean) => void;
  isMobile?: boolean;
  agentName?: string;
  agentRole?: string;
  agentColor?: 'blue' | 'green' | 'purple' | 'red' | 'gold';
  results?: AgentResult[];
  direction?: string;
}

const CarouselContainer: React.FC<CarouselContainerProps> = ({ 
  children, 
  isPaused = false, 
  setIsPaused = () => {},
  agentName,
  agentRole,
  agentColor = 'blue',
  results = [],
  direction = 'ltr',
  isMobile = false
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      slidesToScroll: 1,
      dragFree: true,
      direction: direction as 'ltr' | 'rtl',
    },
    [
      AutoPlay({ 
        playOnInit: true, 
        delay: 5000, 
        stopOnInteraction: true,
        stopOnMouseEnter: true, 
      })
    ]
  );

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    if (emblaApi) emblaApi.plugins().autoplay?.stop();
  }, [emblaApi, setIsPaused]);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    if (emblaApi) emblaApi.plugins().autoplay?.play();
  }, [emblaApi, setIsPaused]);

  return (
    <div 
      className="relative" 
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
    >
      {/* Agent header if agent info is provided */}
      {agentName && agentRole && (
        <div className="flex items-center gap-3 mb-5">
          <AgentAvatar
            name={agentName} 
            role={agentRole}
            color={agentColor}
            size="sm"
          />
          <div>
            <h3 className="text-lg font-bold text-white">{agentName}</h3>
            <p className="text-sm text-white/60">{agentRole}</p>
          </div>
        </div>
      )}

      {/* Edge fading effect containers */}
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-nextgen-dark to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-nextgen-dark to-transparent pointer-events-none"></div>
      
      {/* Carousel container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 scrollbar-none">
          {children || results?.map((result, index) => (
            <div key={`result-${index}`} className="flex-none w-[300px]">
              {/* Render result cards if children not provided */}
            </div>
          ))}
        </div>
      </div>

      {/* Pause indicator for desktop */}
      {!isMobile && isPaused && (
        <div className="absolute top-4 right-4 bg-white/10 text-white text-xs px-2 py-1 rounded-full z-20 backdrop-blur-sm">
          Paused
        </div>
      )}
    </div>
  );
};

export default CarouselContainer;
