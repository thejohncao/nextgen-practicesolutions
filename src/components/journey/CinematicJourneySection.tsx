
import React, { useState, useRef, useEffect } from 'react';
import { patientJourney } from '@/data/patientJourney';
import FullScreenStage from './FullScreenStage';
import VerticalProgressIndicator from './VerticalProgressIndicator';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SparkleText from '../effects/SparkleText';
import JourneyProgressBar from './JourneyProgressBar';

const CinematicJourneySection = () => {
  const [activeStage, setActiveStage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);
  
  // Function to scroll to a specific stage
  const scrollToStage = (stageNumber: number) => {
    const stageElement = document.getElementById(`journey-stage-${String(stageNumber).padStart(2, '0')}`);
    if (stageElement) {
      stageElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track scrolling to update active stage
  useEffect(() => {
    const handleScroll = () => {
      if (!stagesRef.current) return;
      
      const stages = stagesRef.current.querySelectorAll('.journey-stage');
      stages.forEach((stage) => {
        const rect = stage.getBoundingClientRect();
        const inView = rect.top < window.innerHeight/2 && rect.bottom > window.innerHeight/2;
        if (inView) {
          const stageNum = parseInt(stage.id.split('-').pop() || '1');
          setActiveStage(stageNum);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-nextgen-dark overflow-hidden scroll-smooth"
    >
      <div className="text-center py-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
          The Patient Journey, Reimagined
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto px-4">
          Experience how our AI agents work together to grow your practice at every stage
          of the patient journey.
        </p>
        
        <div className="mt-6 flex justify-center">
          <JourneyProgressBar 
            currentStage={activeStage} 
            totalStages={patientJourney.length} 
          />
        </div>
      </div>
      
      <div ref={stagesRef} className="relative snap-y snap-mandatory overflow-y-auto">
        {patientJourney.map((stage, index) => (
          <FullScreenStage
            key={stage.number}
            stage={stage}
            isActive={activeStage === index + 1}
            onInView={() => setActiveStage(index + 1)}
          />
        ))}
      </div>

      <VerticalProgressIndicator 
        totalStages={patientJourney.length} 
        activeStage={activeStage}
        onStageClick={scrollToStage}
      />
      
      <div className="min-h-[50vh] py-16 text-center bg-gradient-to-t from-nextgen-dark to-nextgen-dark/20">
        <div className="max-w-2xl mx-auto px-4">
          <SparkleText className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Your AI Team is Ready. Are You?
            </h3>
          </SparkleText>
          
          <p className="text-lg text-white/70 mb-8">
            Discover how NextGen's AI can transform your practice growth journey.
          </p>
          
          <Button 
            asChild
            size="lg"
            className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white font-bold shadow-glow"
          >
            <Link to="/join">Book Your Free Strategy Call</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CinematicJourneySection;
