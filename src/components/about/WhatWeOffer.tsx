
import React from 'react';
import { Card } from '@/components/ui/card';
import FadeInSection from '@/components/ui/fade-in-section';
import { GraduationCap, Bot, TrendingUp } from 'lucide-react';

const WhatWeOffer = () => {
  const offerings = [
    {
      title: "NextGen Academy",
      description: "Online certification for front desk, treatment coordinators, and office managers",
      icon: GraduationCap,
      color: "text-nextgen-purple"
    },
    {
      title: "AI Assistant Team",
      description: "Automates scheduling, follow-up, billing, and training (Miles, Giselle, Devon, Alma)",
      subtitle: "(optional add-on)",
      icon: Bot,
      color: "text-blue-400"
    },
    {
      title: "Growth Engine",
      description: "Smile quiz funnels, $49 deposit flows, treatment planners, and SOPs",
      icon: TrendingUp,
      color: "text-green-400"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
              A Complete Operating System for Dental Front Offices
            </h2>
          </div>
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map((offering, index) => (
            <FadeInSection key={offering.title} delay={0.2 * index}>
              <Card className="glass-card p-8 h-full hover:bg-white/10 transition-all duration-300">
                <div className="text-center">
                  <offering.icon className={`w-16 h-16 mx-auto mb-6 ${offering.color}`} />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {offering.title}
                  </h3>
                  {offering.subtitle && (
                    <p className="text-sm text-white/50 mb-4">
                      {offering.subtitle}
                    </p>
                  )}
                  <p className="text-white/70">
                    {offering.description}
                  </p>
                </div>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
