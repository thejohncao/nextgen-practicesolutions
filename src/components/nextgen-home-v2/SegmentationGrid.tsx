
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { FadeInSection } from '@/components/ui/fade-in-section';

const SegmentationGrid = () => {
  const segments = [
    {
      title: "I'm just getting started",
      description: "Learn how NextGen can help you establish solid systems from day one.",
      ctaText: "Book an Intro Call"
    },
    {
      title: "I need help with staff training",
      description: "Get your team certified and working from the same playbook.",
      ctaText: "Explore Academy Programs"
    },
    {
      title: "I want the full AI team",
      description: "Deploy AI assistants to handle scheduling, follow-up, and more.",
      ctaText: "Get a Custom Demo"
    },
    {
      title: "I'm ready for the Boardroom",
      description: "Take control of your practice data and run operations like a CEO.",
      ctaText: "Request Boardroom Access"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {segments.map((segment, index) => (
        <FadeInSection key={index} delay={0.1 * (index + 1)} direction="up">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-left h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {segment.title}
              </h3>
              <p className="text-white/80 mb-6">
                {segment.description}
              </p>
            </div>
            <Button className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white w-full justify-center">
              {segment.ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </FadeInSection>
      ))}
    </div>
  );
};

export default SegmentationGrid;
