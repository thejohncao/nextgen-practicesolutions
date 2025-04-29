
import React, { useEffect, useState } from 'react';
import { getDuplicatedResults } from '@/data/agentResults';
import SectionHeader from './SectionHeader';
import VerticalSlider from './VerticalSlider';

const AgentResultsSection = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* We'll create three columns of vertical sliders for a more interesting effect */}
          <div className="h-[500px] md:h-[700px]">
            <VerticalSlider 
              items={duplicatedResults.slice(0, 6)} 
              isMobile={isMobile} 
            />
          </div>
          
          {/* Only show additional columns on desktop */}
          {!isMobile && (
            <>
              <div className="h-[700px]">
                <VerticalSlider 
                  items={duplicatedResults.slice(6, 12)} 
                  isMobile={isMobile} 
                />
              </div>
              <div className="h-[700px]">
                <VerticalSlider 
                  items={duplicatedResults.slice(12, 18)} 
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
