
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building, TrendingUp, Rocket, DollarSign, Trophy } from 'lucide-react';

const HowItScales = () => {
  const phases = [
    {
      phase: "Foundation",
      outcome: "1–3 studios live w/ AI",
      icon: Building,
      description: "Launch your first locations with full AI automation",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      phase: "Expansion", 
      outcome: "10+ studios w/ playbooks",
      icon: TrendingUp,
      description: "Scale with proven systems and standardized operations",
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      phase: "Growth",
      outcome: "50+ studios w/ SOP ops",
      icon: Rocket,
      description: "Streamlined operations with virtual assistant support",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      phase: "Scale",
      outcome: "100+ locations VA-powered",
      icon: DollarSign,
      description: "Fully automated multi-location enterprise operations",
      color: "text-amber-400",
      bgColor: "bg-amber-500/10"
    },
    {
      phase: "Exit Ready",
      outcome: "$10M ARR, clean ops, M&A",
      icon: Trophy,
      description: "Maximum valuation with pristine operational systems",
      color: "text-red-400",
      bgColor: "bg-red-500/10"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            How It Scales
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Your roadmap from startup to exit-ready enterprise
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {phases.map((phase, index) => {
            const IconComponent = phase.icon;
            return (
              <div key={index} className="flex items-start gap-6 mb-8 last:mb-0">
                {/* Phase Number & Icon */}
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full ${phase.bgColor} flex items-center justify-center mb-2`}>
                    <IconComponent className={`h-8 w-8 ${phase.color}`} />
                  </div>
                  <div className="text-sm text-white/50 font-medium">Phase {index + 1}</div>
                </div>

                {/* Content */}
                <Card className="glass-card flex-1 border-nextgen-purple/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">{phase.phase}</h3>
                      <div className="text-nextgen-purple font-semibold">{phase.outcome}</div>
                    </div>
                    <p className="text-white/70">{phase.description}</p>
                  </CardContent>
                </Card>

                {/* Connecting Line */}
                {index < phases.length - 1 && (
                  <div className="absolute left-8 mt-20 w-0.5 h-8 bg-gradient-to-b from-nextgen-purple/50 to-transparent" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItScales;
