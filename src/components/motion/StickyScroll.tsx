
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

type StickyScrollItem = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  agent?: string;
  agentRole?: string;
  agentColor?: string;
  stageLabel?: string;
};

interface StickyScrollProps {
  items: StickyScrollItem[];
  className?: string;
  contentClassName?: string;
  stickyClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  staggerDelay?: number;
  titleComponent?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  height?: string;
}

const StickyScroll: React.FC<StickyScrollProps> = ({
  items,
  className,
  contentClassName,
  stickyClassName,
  titleClassName,
  descriptionClassName,
  staggerDelay = 0.1,
  titleComponent: TitleComponent = 'h2',
  height = '100vh',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Initialize scroll progress tracker
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });
  
  // Use spring for smoother transitions
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Calculate the progress range for each item
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { height: containerHeight } = containerRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const containerTop = containerRef.current.offsetTop;
      const scrollHeight = scrollRef.current?.scrollHeight || 0;
      
      // Calculate progress through the container
      const relativeScrollPosition = scrollPosition - containerTop;
      const scrollRange = scrollHeight - containerHeight;
      const progress = Math.min(Math.max(relativeScrollPosition / scrollRange, 0), 1);
      
      // Calculate active index based on progress
      const itemCount = items.length;
      const newIndex = Math.min(Math.floor(progress * itemCount), itemCount - 1);
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeIndex, items.length]);
  
  return (
    <div 
      ref={containerRef} 
      className={cn("relative", className)}
    >
      <div 
        ref={scrollRef} 
        className="relative w-full"
        style={{ height: `calc(${height} * ${items.length})` }}
      >
        {/* Sticky container for content */}
        <div className={cn("sticky top-0 h-screen flex items-center overflow-hidden", stickyClassName)}>
          <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center">
            {/* Left side: Content that changes */}
            <div className={cn("w-full md:w-1/2 h-full flex flex-col justify-center py-12", contentClassName)}>
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: activeIndex === idx ? 1 : 0,
                    y: activeIndex === idx ? 0 : 20
                  }}
                  transition={{ 
                    duration: 0.5, 
                    ease: "easeOut",
                    delay: activeIndex === idx ? staggerDelay : 0
                  }}
                  className={cn(
                    "absolute inset-0 flex flex-col justify-center",
                    activeIndex === idx ? "pointer-events-auto" : "pointer-events-none"
                  )}
                >
                  {/* Stage Label */}
                  {item.stageLabel && (
                    <motion.div 
                      className={`mb-2 text-sm font-medium inline-flex px-3 py-1 rounded-full bg-${item.agentColor || 'purple'}-500/20 text-${item.agentColor || 'purple'}-500 w-fit`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: activeIndex === idx ? 1 : 0,
                        y: activeIndex === idx ? 0 : 10
                      }}
                      transition={{ delay: staggerDelay + 0.1 }}
                    >
                      {item.stageLabel}
                    </motion.div>
                  )}
                  
                  {/* Icon + Agent info */}
                  {(item.icon || item.agent) && (
                    <motion.div 
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: activeIndex === idx ? 1 : 0,
                        y: activeIndex === idx ? 0 : 10
                      }}
                      transition={{ delay: staggerDelay + 0.2 }}
                    >
                      {item.icon && <div className="text-white">{item.icon}</div>}
                      {item.agent && (
                        <div className="flex items-center gap-2">
                          <div className={`h-8 w-8 rounded-full bg-${item.agentColor || 'purple'}-500/30 flex items-center justify-center`}>
                            <span className="text-white font-medium">{item.agent[0]}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">{item.agent}</div>
                            {item.agentRole && <div className="text-white/60 text-xs">{item.agentRole}</div>}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                  
                  {/* Title */}
                  <TitleComponent className={cn("text-3xl font-heading font-bold mb-3", titleClassName)}>
                    {item.title}
                  </TitleComponent>
                  
                  {/* Description */}
                  <p className={cn("text-white/70", descriptionClassName)}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {/* Right side: Visual indicator */}
            <div className="w-full md:w-1/2 h-full flex justify-center items-center">
              <div className="relative h-[80%] flex items-center">
                {/* Progress bar */}
                <div className="absolute left-0 h-full w-0.5 bg-white/10">
                  <motion.div 
                    className="absolute top-0 left-0 right-0 bg-white/70"
                    style={{ 
                      height: smoothProgress,
                      transformOrigin: 'top'
                    }}
                  />
                </div>
                
                {/* Stages */}
                <div className="relative h-full ml-6">
                  {items.map((item, idx) => {
                    const segmentProgress = (items.length - 1 === 0) ? 1 : idx / (items.length - 1);
                    
                    return (
                      <motion.div
                        key={idx}
                        className="absolute left-0 flex items-center"
                        style={{ top: `calc(${segmentProgress * 100}% - 16px)` }}
                        animate={{
                          scale: activeIndex === idx ? 1.1 : 1,
                          opacity: 1
                        }}
                      >
                        {/* Progress node */}
                        <motion.div 
                          className={cn(
                            "h-8 w-8 rounded-full border-2",
                            activeIndex === idx 
                              ? `border-${item.agentColor || 'purple'}-500 bg-${item.agentColor || 'purple'}-500/20` 
                              : "border-white/20 bg-black/30"
                          )}
                          animate={{ 
                            borderColor: activeIndex >= idx ? `var(--${item.agentColor || 'nextgen-purple'})` : "rgba(255,255,255,0.2)",
                            backgroundColor: activeIndex === idx ? `rgba(var(--${item.agentColor || 'purple'}-color-rgb), 0.2)` : "rgba(0,0,0,0.3)"
                          }}
                        >
                          {/* Inner circle */}
                          <motion.div 
                            className="h-full w-full rounded-full flex items-center justify-center"
                            animate={{ 
                              backgroundColor: activeIndex === idx ? `var(--${item.agentColor || 'purple'}-color)` : "transparent" 
                            }}
                          >
                            {activeIndex === idx && (
                              <span className="text-white text-sm font-medium">{idx + 1}</span>
                            )}
                          </motion.div>
                        </motion.div>
                        
                        {/* Label */}
                        <motion.div 
                          className="ml-3 whitespace-nowrap" 
                          animate={{ 
                            opacity: activeIndex === idx ? 1 : 0.5 
                          }}
                        >
                          <div className={cn(
                            "text-lg font-medium",
                            activeIndex === idx ? "text-white" : "text-white/50"
                          )}>
                            {item.stageLabel || `Step ${idx + 1}`}
                          </div>
                          <div className={cn(
                            "text-sm",
                            activeIndex === idx ? "text-white/70" : "text-white/30"
                          )}>
                            {item.agent}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyScroll;
