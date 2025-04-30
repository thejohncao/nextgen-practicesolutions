
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getFlattenedResults } from '@/data/agentResults';
import AgentResultCard from './AgentResultCard';
import SectionHeader from './SectionHeader';

const MarqueeResultsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const results = getFlattenedResults();
  
  // Create two rows of results with different speeds
  const row1Results = results.slice(0, Math.ceil(results.length / 2));
  const row2Results = results.slice(Math.ceil(results.length / 2));

  // For horizontal scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to horizontal movement
  const row1X = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const row2X = useTransform(scrollYProgress, [0, 1], [0, 500]);

  return (
    <section className="py-20 bg-nextgen-dark overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 mb-12">
        <SectionHeader 
          title="Real Results from Your AI Team" 
          subtitle="Practices using NextGen agents scale faster, close more, and reclaim their time."
        />
      </div>
      
      {/* Marquee Row 1 - Moving left */}
      <div className="relative mb-8 overflow-hidden">
        <motion.div 
          className="flex gap-6 relative"
          style={{ x: row1X }}
        >
          {row1Results.map((result, index) => (
            <div 
              key={`row1-${result.agent}-${result.title}-${index}`}
              className="w-[340px] flex-shrink-0"
            >
              <AgentResultCard 
                result={result}
                index={index}
                isMobile={false}
              />
            </div>
          ))}
          {/* Duplicate for seamless scrolling */}
          {row1Results.map((result, index) => (
            <div 
              key={`row1-dup-${result.agent}-${result.title}-${index}`}
              className="w-[340px] flex-shrink-0"
            >
              <AgentResultCard 
                result={result}
                index={index + row1Results.length}
                isMobile={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Marquee Row 2 - Moving right */}
      <div className="relative overflow-hidden">
        <motion.div 
          className="flex gap-6 relative"
          style={{ x: row2X }}
        >
          {row2Results.map((result, index) => (
            <div 
              key={`row2-${result.agent}-${result.title}-${index}`}
              className="w-[340px] flex-shrink-0"
            >
              <AgentResultCard 
                result={result}
                index={index}
                isMobile={false}
              />
            </div>
          ))}
          {/* Duplicate for seamless scrolling */}
          {row2Results.map((result, index) => (
            <div 
              key={`row2-dup-${result.agent}-${result.title}-${index}`}
              className="w-[340px] flex-shrink-0"
            >
              <AgentResultCard 
                result={result}
                index={index + row2Results.length}
                isMobile={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarqueeResultsSection;
