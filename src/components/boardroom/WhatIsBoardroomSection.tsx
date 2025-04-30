
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import SectionHeader from '@/components/boardroom/SectionHeader';
import { Card, CardContent } from '@/components/ui/card';
import { LayoutGrid, Users, GraduationCap, TrendingUp } from 'lucide-react';

const WhatIsBoardroomSection = () => {
  const connections = [
    {
      title: "Your AI agents",
      icon: <LayoutGrid className="h-6 w-6 text-nextgen-purple" />
    },
    {
      title: "Your patient journey",
      icon: <Users className="h-6 w-6 text-nextgen-purple" />
    },
    {
      title: "Your team training",
      icon: <GraduationCap className="h-6 w-6 text-nextgen-purple" />
    },
    {
      title: "Your KPIs + workflows",
      icon: <TrendingUp className="h-6 w-6 text-nextgen-purple" />
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <SectionHeader
            title="What Is the NextGen Boardroom?"
            subtitle="A centralized platform that connects:"
          />
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {connections.map((item, index) => (
              <Card key={index} className="glass-card hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-nextgen-purple/20 p-4 rounded-full mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-medium">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.3}>
          <p className="text-lg text-white/80 text-center max-w-2xl mx-auto">
            Everything flows through one unified dashboard, designed for modern dental teams.
          </p>
        </FadeInSection>
      </div>
    </section>
  );
};

export default WhatIsBoardroomSection;
