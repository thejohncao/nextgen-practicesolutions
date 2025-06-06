
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Target } from 'lucide-react';

const JuvRoadmap = () => {
  const roadmapPhases = [
    {
      phase: "Foundation",
      timeline: "2025 Q2–Q3",
      milestones: "Launch 1 flagship w/ agents, Glow Wallet, CRM, and SOPs",
      kpi: "$30K/mo revenue",
      color: "border-blue-500/20 bg-blue-50/5"
    },
    {
      phase: "Expansion",
      timeline: "2025–2026",
      milestones: "Launch 10 offices with regional NP playbooks",
      kpi: "$300K/mo network",
      color: "border-green-500/20 bg-green-50/5"
    },
    {
      phase: "Growth",
      timeline: "2026–2027",
      milestones: "Automate onboarding/training across 50 offices",
      kpi: "$1M/mo network",
      color: "border-purple-500/20 bg-purple-50/5"
    },
    {
      phase: "Scale",
      timeline: "2028–2029",
      milestones: "100+ offices, dashboard stack, VA network activated",
      kpi: "$3M+/mo run rate",
      color: "border-amber-500/20 bg-amber-50/5"
    },
    {
      phase: "Exit-Ready",
      timeline: "2030",
      milestones: "Data room + clean financials for M&A or licensing exit",
      kpi: "$10M ARR, trigger exit",
      color: "border-red-500/20 bg-red-50/5"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            🛣 ROADMAP TO $10M EXIT (2025–2030)
          </h2>
        </div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {roadmapPhases.map((phase, index) => (
            <Card key={index} className={`glass-card hover:shadow-lg transition-all duration-300 ${phase.color}`}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-nextgen-purple rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-white">{phase.phase}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-white/70">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{phase.timeline}</span>
                  </div>
                  
                  <div className="text-white/80 text-sm">
                    {phase.milestones}
                  </div>
                  
                  <div className="flex items-center gap-2 text-nextgen-purple font-semibold">
                    <Target className="h-4 w-4" />
                    <span>{phase.kpi}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JuvRoadmap;
