
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
    <section className="py-20 bg-gradient-to-b from-black to-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            What Is NextGen OS?
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Think: iOS for healthcare business models
          </p>
          <div className="text-2xl md:text-3xl font-bold text-nextgen-purple mb-4">
            "Build once. Brand forever. Scale infinitely."
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="glass-card border-nextgen-purple/20 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-nextgen-purple/20 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-nextgen-purple" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
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
