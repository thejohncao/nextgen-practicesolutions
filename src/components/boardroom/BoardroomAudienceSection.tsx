
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import SectionHeader from '@/components/boardroom/SectionHeader';
import { Card, CardContent } from '@/components/ui/card';

const BoardroomAudienceSection = () => {
  const audienceTypes = [
    "Busy owners who want weekly visibility",
    "Managers tired of chasing team accountability",
    "Growth-focused DSOs who want to scale without multiplying their payroll",
    "Any practice who wants to replace 6 platforms with 1"
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-black/80 to-nextgen-dark/90">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <SectionHeader
            title="Who the Boardroom Is For"
            subtitle=""
          />
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6">
              {audienceTypes.map((audience, index) => (
                <Card key={index} className="glass-card hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <p className="text-white/90">{audience}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default BoardroomAudienceSection;
