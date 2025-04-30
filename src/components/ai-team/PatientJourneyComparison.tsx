
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertCircle, CheckCircle, Activity } from 'lucide-react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import JourneyComparison from './JourneyComparison';

const PatientJourneyComparison = () => {
  return (
    <section className="py-24 bg-black/30">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gradient">
            Patient Journey: <span className="text-red-400">Before</span> vs <span className="text-nextgen-purple">After</span>
          </h2>
          <p className="text-lg text-white/70 text-center max-w-2xl mx-auto mb-16">
            See how AI transforms your patient experience from fragmented to frictionless
          </p>
        </FadeInSection>
        
        <div className="max-w-6xl mx-auto">
          <JourneyComparison />
        </div>
        
        <FadeInSection delay={0.3}>
          <div className="flex justify-center mt-16">
            <Button
              asChild
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
            >
              <Link to="/join">
                Automate My Patient Flow
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default PatientJourneyComparison;
