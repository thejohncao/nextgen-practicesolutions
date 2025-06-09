
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Building2, Infinity, Sparkles, Shield, Database } from 'lucide-react';

const WhatIsNextGenOS = () => {
  const principles = [
    {
      icon: Database,
      title: "Modular, multi-tenant backend",
      description: "Secure, scalable architecture built for multiple practices"
    },
    {
      icon: Smartphone,
      title: "White-labeled app UI for each partner",
      description: "Fully branded frontend that matches your practice identity"
    },
    {
      icon: Sparkles,
      title: "Built-in credit engine and patient wallet",
      description: "Complete membership and loyalty system out of the box"
    },
    {
      icon: Building2,
      title: "Full automation and analytics dashboard",
      description: "Real-time insights and automated workflows for your practice"
    },
    {
      icon: Shield,
      title: "Secure data separation for each licensee",
      description: "HIPAA-compliant data isolation and security protocols"
    },
    {
      icon: Infinity,
      title: "EMR integration optional",
      description: "Seamless integration with existing practice management systems"
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-b from-nextgen-dark to-black/95">
      <div className="container-liquid">
        <div className="text-center mb-20">
          <h2 className="text-headline-lg font-semibold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-8">
            What Is NextGen OS?
          </h2>
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-body-lg text-white/70 mb-6">
              NextGen OS is a platform-as-a-service (PaaS) — think of it as the <span className="text-nextgen-purple font-semibold">iOS of healthcare business models</span>. You build it once, license it out, and let practices brand and scale it under their own name.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 max-w-2xl mx-auto mb-12">
            <h3 className="text-body-lg font-semibold text-white mb-4">Platform Architecture</h3>
            <div className="text-white/60 font-mono text-sm text-left">
              <div className="mb-2">┌─────────────────────┐</div>
              <div className="mb-2">│   NextGen OS Core   │</div>
              <div className="mb-2">└─────────────────────┘</div>
              <div className="mb-2 text-center">│</div>
              <div className="mb-2">┌─────────┴─────────┐</div>
              <div className="mb-2">▼                   ▼</div>
              <div className="mb-2">Glow Wallet        AI Agent Suite</div>
              <div className="mb-2">│                   │</div>
              <div className="mb-2">Branded UI          Automation Flows</div>
              <div className="mb-2">▼                   ▼</div>
              <div>Patient Frontend     Practice Backend</div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-headline font-semibold text-white mb-8">Core Principles</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {principles.map((principle, index) => {
            const IconComponent = principle.icon;
            return (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-350 group hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-nextgen-purple/20 flex items-center justify-center mb-4 group-hover:bg-nextgen-purple/30 transition-colors duration-350">
                    <IconComponent className="h-6 w-6 text-nextgen-purple" />
                  </div>
                  <h4 className="text-body font-semibold text-white mb-3">{principle.title}</h4>
                  <p className="text-caption text-white/70">{principle.description}</p>
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
