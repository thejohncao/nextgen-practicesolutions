
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';

const CertificationOverview = () => {
  return (
    <section className="py-16 md:py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Where Practice Systems Meet Executive-Level Thinking
            </h2>
            
            <p className="text-lg text-white/80 mb-8">
              The NextGen Academy certification tracks are designed for modern dental teams who want more than just technical know-how — they want mastery in systems, strategy, and execution.
              Our programs blend real-world workflows with healthcare leadership insights from institutions like Harvard and UCLA, applied directly to the day-to-day operations of a dental or group practice.
            </p>
            
            <p className="text-lg text-white/80">
              Whether you're a treatment coordinator, office manager, or scaling DSO team member, you'll leave with tools you can use — and credentials you can trust.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default CertificationOverview;
