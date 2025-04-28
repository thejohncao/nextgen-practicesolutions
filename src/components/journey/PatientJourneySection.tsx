
import React, { useRef, useEffect, useState } from 'react';
import { patientJourney } from '@/data/patientJourney';
import JourneyStage from './JourneyStage';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SparkleText from '../effects/SparkleText';

const PatientJourneySection = () => {
  const [activeStage, setActiveStage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    <section className="bg-nextgen-dark py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
          Meet Your AI Team
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto px-4">
          Experience how our AI agents work together to grow your practice at every stage
          of the patient journey.
        </p>
      </div>

      <div ref={sectionRef} className="divide-y divide-white/5">
        {patientJourney.map((stage, index) => (
          <div key={stage.number} className="journey-stage" data-stage={index}>
            <JourneyStage
              stage={stage}
              currentStage={activeStage}
              totalStages={patientJourney.length}
            />
          </div>
        ))}
      </div>

      <div className="py-16 text-center bg-gradient-to-t from-nextgen-dark to-nextgen-dark/20">
        <div className="max-w-2xl mx-auto px-4">
          <SparkleText className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Your AI Team is Ready. Are You?
            </h3>
          </SparkleText>
          
          <Button 
            asChild
            size="lg"
            className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white font-bold"
          >
            <Link to="/join">Book Your Free Strategy Call</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PatientJourneySection;
