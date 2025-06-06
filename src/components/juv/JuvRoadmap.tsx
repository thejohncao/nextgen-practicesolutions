
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar, Target, CheckCircle, TrendingUp } from 'lucide-react';

const JuvRoadmap = () => {
  const roadmapPhases = [
    {
      phase: "Foundation",
      timeline: "Q2–Q3 2025",
      goal: "Launch flagship office with full AI + membership stack",
      milestones: [
        "Deploy AI Agents: Miles, Giselle, Devon, Alma",
        "Activate Glow Wallet (credit logic, referral tracking, upsells)",
        "Launch funnel: Quiz → Booking → Deposit → Reactivation",
        "Build KPI dashboards: bookings, NPs, conversions",
        "Train NP and staff via Alma's onboarding system"
      ],
      kpis: [
        "$30K/mo recurring revenue",
        "90% show-up rate",
        "80% case acceptance"
      ],
      color: "border-blue-500/20 bg-blue-50/5",
      phase_number: 1
    },
    {
      phase: "Expansion",
      timeline: "Q4 2025 – Q4 2026",
      goal: "Launch and stabilize 10 medspa locations",
      milestones: [
        "Launch 1 new location/month using Launch Kit",
        "Train NPs with Alma Academy",
        "Regional VA team activated (1 per 10 sites)",
        "Customize campaigns using Giselle AI",
        "Automate upsells inside Glow Wallet"
      ],
      kpis: [
        "$300K/mo network revenue",
        "70%+ first-visit conversion",
        "30% membership adoption"
      ],
      color: "border-green-500/20 bg-green-50/5",
      phase_number: 2
    },
    {
      phase: "Growth",
      timeline: "2026–2027",
      goal: "Optimize 50 locations with centralized systems",
      milestones: [
        "VA Concierge system scaled",
        "Devon manages all high-ticket follow-ups",
        "Automate new-hire SOPs",
        "Centralize onboarding + NP coaching",
        "Performance tracking dashboards live"
      ],
      kpis: [
        "$1.5M/mo network revenue",
        "80% show rate",
        "<15% churn",
        "50+ Glow Wallet members per site"
      ],
      color: "border-purple-500/20 bg-purple-50/5",
      phase_number: 3
    },
    {
      phase: "Scale",
      timeline: "2028–2029",
      goal: "Reach 100+ offices — run like a single machine",
      milestones: [
        "Launch AI Command Center (Miles + dashboards)",
        "Train regional leads via Alma certification",
        "Launch nationwide campaigns (Giselle)",
        "Optimize Glow Wallet ROI through spending insights"
      ],
      kpis: [
        "$5M+/mo run rate",
        "5–7 hires saved per region via automation",
        "Enterprise-grade tech + compliance stack"
      ],
      color: "border-amber-500/20 bg-amber-50/5",
      phase_number: 4
    },
    {
      phase: "Exit-Ready",
      timeline: "2030",
      goal: "Package platform for exit, licensing, or M&A",
      milestones: [
        "Data room + IP systems finalized",
        "Financials + dashboards clean and audit-ready",
        "Board-level buyer engagement triggered",
        "Leadership + training systems locked",
        "Transition plans mapped"
      ],
      kpis: [
        "$60M ARR",
        "$20M+/mo EBITDA",
        "Strategic exit or acquisition triggered"
      ],
      color: "border-red-500/20 bg-red-50/5",
      phase_number: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            🛣 ROADMAP TO $100M EXIT (2025–2030)
          </h2>
          <p className="text-xl text-white/70">
            Milestones, Metrics, and Systems to Reach 100+ Locations and a $100M+ Valuation
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Accordion type="multiple" className="space-y-6">
            {roadmapPhases.map((phase, index) => (
              <AccordionItem 
                key={index} 
                value={`phase-${index}`}
                className={`glass-card rounded-2xl border ${phase.color} overflow-hidden`}
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 bg-nextgen-purple rounded-full flex items-center justify-center text-white font-bold">
                      {phase.phase_number}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold text-white mb-1">
                        🔹 Phase {phase.phase_number}: {phase.phase}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{phase.timeline}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          <span>{phase.goal}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Milestones */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        Milestones
                      </h4>
                      <ul className="space-y-3">
                        {phase.milestones.map((milestone, milestoneIndex) => (
                          <li key={milestoneIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-nextgen-purple rounded-full mt-2 flex-shrink-0" />
                            <span className="text-white/80">{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Target KPIs */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-nextgen-purple" />
                        Target KPIs
                      </h4>
                      <div className="space-y-3">
                        {phase.kpis.map((kpi, kpiIndex) => (
                          <div key={kpiIndex} className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <span className="text-nextgen-purple font-semibold">{kpi}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default JuvRoadmap;
