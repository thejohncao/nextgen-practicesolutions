
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AgentAvatar from '@/components/AgentAvatar';
import PillarBadge from './PillarBadge';

const JuvAiExecutiveTeam = () => {
  const agents = [
    {
      name: "Miles",
      color: "blue",
      pillar: "Practice Management",
      role: "Schedules, automates ops, manages insurance, and reduces no-shows",
      replaces: ["Scheduler", "ops lead", "admin"]
    },
    {
      name: "Giselle",
      color: "green", 
      pillar: "Practice Growth",
      role: "Fills schedules with high-value patients through ads, content, and reactivations",
      replaces: ["Marketing coordinator", "content"]
    },
    {
      name: "Devon",
      color: "purple",
      pillar: "Practice Development", 
      role: "Closes unscheduled treatment plans and increases big-case acceptance",
      replaces: ["Treatment coordinator", "sales rep"]
    },
    {
      name: "Alma",
      color: "gold",
      pillar: "Supports All Pillars",
      role: "Trains your team, builds SOPs, and systemizes onboarding across locations",
      replaces: ["Office manager trainer", "SOP lead"]
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
                    <TableHead className="text-white font-semibold w-1/4">Agent</TableHead>
                    <TableHead className="text-white font-semibold w-1/4">Pillar</TableHead>
                    <TableHead className="text-white font-semibold w-1/3">Role Summary</TableHead>
                    <TableHead className="text-white font-semibold w-1/6">Replaces</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent, index) => (
                    <TableRow key={index} className="border-b border-white/5 hover:bg-white/5 group transition-all duration-200">
                      <TableCell className="py-6">
                        <div className="flex items-center gap-4">
                          <div className="transition-transform duration-200 group-hover:scale-110 group-hover:rotate-2">
                            <AgentAvatar 
                              name={agent.name} 
                              role={agent.pillar}
                              color={agent.color}
                              size="md"
                              animated={true}
                              displayMode="initial"
                            />
                          </div>
                          <span className="font-bold text-white text-lg">{agent.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <PillarBadge pillar={agent.pillar} agent={agent.name} />
                      </TableCell>
                      <TableCell className="py-6">
                        <p className="text-white/80 font-light leading-relaxed">
                          {agent.role}
                        </p>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="space-y-1">
                          {agent.replaces.map((role, roleIndex) => (
                            <div 
                              key={roleIndex} 
                              className="text-white/70 text-sm transition-all duration-200 group-hover:line-through group-hover:text-red-400/70"
                            >
                              {role}
                            </div>
                          ))}
                        </div>
                      </TableCell>
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
