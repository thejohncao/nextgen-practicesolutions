
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';

const ResultsCards = () => {
  const results = [
    {
      metric: '2x',
      description: 'treatment acceptance within 30 days'
    },
    {
      metric: '70%',
      description: 'increase in follow-up completion'
    },
    {
      metric: '$25K–$50K',
      description: '/month in recovered treatment revenue'
    },
    {
      metric: '<1 week',
      description: 'onboarding time'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
      {results.map((result, index) => (
        <FadeInSection key={index} delay={0.1 * (index + 1)} direction="up">
          <div className="bg-black/30 border border-white/10 backdrop-blur-sm rounded-xl p-6 text-center h-full">
            <div className="text-3xl lg:text-4xl font-bold text-nextgen-purple mb-3">
              {result.metric}
            </div>
            <p className="text-white/80">
              {result.description}
            </p>
          </div>
        </FadeInSection>
      ))}
    </div>
  );
};

export default ResultsCards;
