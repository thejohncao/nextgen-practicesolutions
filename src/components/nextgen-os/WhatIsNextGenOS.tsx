
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
    <section className="section-spacing bg-gradient-to-b from-nextgen-dark to-black/95">
      <div className="container-liquid">
        <div className="text-center mb-20">
          <h2 className="text-headline-lg font-semibold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-8">
            What Is NextGen OS?
          </h2>
          <p className="text-body-lg text-white/70 max-w-3xl mx-auto mb-8">
            Think: iOS for healthcare business models
          </p>
          <div className="text-headline bg-gradient-to-br from-nextgen-purple via-nextgen-purple/80 to-nextgen-purple/60 bg-clip-text text-transparent">
            "Build once. Brand forever. Scale infinitely."
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-350 text-center group hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-lg bg-nextgen-purple/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-nextgen-purple/30 transition-colors duration-350">
                    <IconComponent className="h-8 w-8 text-nextgen-purple" />
                  </div>
                  <h3 className="text-body-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-body text-white/70">{feature.description}</p>
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
