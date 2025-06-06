
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const JuvAiExecutiveTeam = () => {
  const agents = [
    {
      agent: "🟦 Miles",
      pillar: "Practice Management",
      role: "Schedules, automates ops, manages insurance, and reduces no-shows",
      replaces: "Scheduler, ops lead, admin"
    },
    {
      agent: "🟩 Giselle",
      pillar: "Practice Growth",
      role: "Fills schedules with high-value patients through ads, content, and reactivations",
      replaces: "Marketing coordinator, content"
    },
    {
      agent: "🟪 Devon",
      pillar: "Practice Development",
      role: "Closes unscheduled treatment plans and increases big-case acceptance",
      replaces: "Treatment coordinator, sales rep"
    },
    {
      agent: "🟨 Alma",
      pillar: "Supports All Pillars",
      role: "Trains your team, builds SOPs, and systemizes onboarding across locations",
      replaces: "Office manager trainer, SOP lead"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            🔧 THE AI EXECUTIVE TEAM
          </h2>
          <p className="text-xl text-white/70 mb-2">
            Replaces 5–7 hires per location. Runs 24/7. No burnout.
          </p>
          <p className="text-lg text-nextgen-purple font-semibold">
            🧠 This is your executive team — in code.
          </p>
        </div>

        <Card className="glass-card max-w-6xl mx-auto overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-white/10">
                    <TableHead className="text-white font-semibold">Agent</TableHead>
                    <TableHead className="text-white font-semibold">Pillar</TableHead>
                    <TableHead className="text-white font-semibold">Role Summary</TableHead>
                    <TableHead className="text-white font-semibold">Replaces</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent, index) => (
                    <TableRow key={index} className="border-b border-white/5 hover:bg-white/5">
                      <TableCell className="font-semibold text-white">{agent.agent}</TableCell>
                      <TableCell className="text-nextgen-purple font-medium">{agent.pillar}</TableCell>
                      <TableCell className="text-white/80">{agent.role}</TableCell>
                      <TableCell className="text-white/70">{agent.replaces}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default JuvAiExecutiveTeam;
