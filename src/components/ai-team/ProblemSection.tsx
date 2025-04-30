
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Check } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    'Leads aren't followed up on',
    'Treatment plans go cold',
    'Staff is overwhelmed or undertrained',
    'CRMs are underutilized'
  ];
  
  return (
    <section className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">
              <span className="text-nextgen-purple">Every day</span>, practices lose revenue because:
            </h2>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {problems.map((problem, index) => (
              <FadeInSection key={index} delay={0.1 * index} direction="up">
                <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-lg">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-nextgen-purple/20 text-nextgen-purple">
                    <Check size={20} />
                  </div>
                  <p className="text-lg text-white">{problem}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
          
          <FadeInSection delay={0.4}>
            <div className="text-center mt-12">
              <p className="text-xl md:text-2xl font-semibold text-white mb-2">
                What you need isn't more software.
              </p>
              <p className="text-2xl md:text-3xl font-bold text-nextgen-purple">
                You need a team.
              </p>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
