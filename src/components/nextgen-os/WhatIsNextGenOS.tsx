
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Building2, Infinity, Sparkles } from 'lucide-react';

const WhatIsNextGenOS = () => {
  const features = [
    {
      icon: Smartphone,
      title: "iOS for Healthcare",
      description: "Think Apple's ecosystem, but for practice management"
    },
    {
      icon: Building2,
      title: "One Backend",
      description: "Many branded frontends for your unique practice identity"
    },
    {
      icon: Sparkles,
      title: "Multi-Specialty",
      description: "Built for Medspa, Dental, Vision, and Wellness practices"
    },
    {
      icon: Infinity,
      title: "Infinite Scale",
      description: "Build once. Brand forever. Scale infinitely."
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-b from-crystal-white to-mist-blue/20">
      <div className="container-liquid">
        <div className="text-center mb-20">
          <h2 className="text-headline-lg text-liquid-gradient mb-8">
            What Is NextGen OS?
          </h2>
          <p className="text-body-lg text-liquid-slate/70 max-w-3xl mx-auto mb-8">
            Think: iOS for healthcare business models
          </p>
          <div className="text-headline text-primary-gradient">
            "Build once. Brand forever. Scale infinitely."
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="liquid-glass hover-lift hover-glow transition-all duration-350 text-center group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-liquid bg-glow-indigo/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-glow-indigo/20 transition-colors duration-350">
                    <IconComponent className="h-8 w-8 text-glow-indigo" />
                  </div>
                  <h3 className="text-body-lg font-semibold text-liquid-slate mb-3">{feature.title}</h3>
                  <p className="text-body text-liquid-slate/70">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIsNextGenOS;
