
import React, { useEffect, useState } from 'react';
import { getDuplicatedResults } from '@/data/agentResults';
import AgentResultCard from './AgentResultCard';
import CarouselContainer from './CarouselContainer';
import SectionHeader from './SectionHeader';

const AgentResultsSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const duplicatedResults = getDuplicatedResults();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <section className="py-24 bg-nextgen-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeader />

        <CarouselContainer 
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          isMobile={isMobile}
        >
          {duplicatedResults.map((result, index) => (
            <AgentResultCard 
              key={`${result.agent}-${result.title}-${index}`}
              result={result}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </CarouselContainer>
      </div>
    </section>
  );
};

export default AgentResultsSection;
