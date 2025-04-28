
import React, { useRef, useEffect, useState } from 'react';
import { patientJourney } from '@/data/patientJourney';
import JourneyStage from './JourneyStage';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SparkleText from '../effects/SparkleText';
import { useIsMobile } from '@/hooks/use-mobile';

const PatientJourneySection = () => {
  const [activeStage, setActiveStage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-stage'));
            if (!isNaN(index)) {
              setActiveStage(index + 1);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const stageElements = sectionRef.current?.querySelectorAll('.journey-stage');
    stageElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-nextgen-dark py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Meet Your AI Team
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto px-4">
            Experience how our AI agents work together to grow your practice at every stage
            of the patient journey.
          </p>
        </div>

        <div 
          ref={sectionRef} 
          className={`${isMobile ? 'flex flex-col gap-12' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'}`}
        >
          {patientJourney.map((stage, index) => (
            <div 
              key={stage.number} 
              className={`journey-stage ${stage.gradientClass} rounded-xl p-6 animate-fade-in`} 
              data-stage={index}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <JourneyStage
                stage={stage}
                isActive={activeStage === index + 1}
              />
            </div>
          ))}
        </div>

        <div className="py-16 text-center">
          <div className="max-w-2xl mx-auto px-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <SparkleText className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Your AI Team is Ready. Are You?
              </h3>
            </SparkleText>
            
            <p className="text-lg text-white/70 mb-8">
              Discover how NextGen's AI transforms your practice growth journey.
            </p>
            
            <Button 
              asChild
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white font-bold"
            >
              <Link to="/join">Book Your Free Strategy Call</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientJourneySection;
