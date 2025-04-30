
import React, { useEffect, useState } from 'react';
import { getDuplicatedResults } from '@/data/agentResults';
import SectionHeader from './SectionHeader';
import VerticalSlider from './VerticalSlider';

const AgentResultsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [shuffledResults, setShuffledResults] = useState([]);
  
  // Get results and shuffle them on component mount
  useEffect(() => {
    const duplicatedResults = getDuplicatedResults();
    setShuffledResults(shuffleArray(duplicatedResults));
  }, []);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

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
        <SectionHeader 
          title="Real Results from Your AI Team" 
          subtitle="Practices using NextGen agents scale faster, close more, and reclaim their time."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* We'll create three columns of vertical sliders with shuffled data */}
          <div className="h-[500px] md:h-[700px]">
            <VerticalSlider 
              items={shuffledResults.slice(0, 6)} 
              isMobile={isMobile} 
            />
          </div>
          
          {/* Only show additional columns on desktop */}
          {!isMobile && (
            <>
              <div className="h-[700px]">
                <VerticalSlider 
                  items={shuffledResults.slice(6, 12).reverse()} 
                  isMobile={isMobile} 
                />
              </div>
              <div className="h-[700px]">
                <VerticalSlider 
                  items={shuffledResults.slice(12, 18)} 
                  isMobile={isMobile} 
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AgentResultsSection;
