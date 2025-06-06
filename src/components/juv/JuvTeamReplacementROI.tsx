
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DollarSign, Clock, Zap, TrendingUp } from 'lucide-react';
import AgentAvatar from '@/components/AgentAvatar';

const JuvTeamReplacementROI = () => {
  const [showComparison, setShowComparison] = useState(false);

  const roiData = [
    {
      role: "Front Desk Scheduler",
      replacedBy: "Miles",
      agentColor: "blue",
      salary: 40000,
      icon: "📅"
    },
    {
      role: "Operations Lead / Admin",
      replacedBy: "Miles", 
      agentColor: "blue",
      salary: 55000,
      icon: "⚙️"
    },
    {
      role: "Marketing Coordinator",
      replacedBy: "Giselle",
      agentColor: "green",
      salary: 50000,
      icon: "📈"
    },
    {
      role: "Social Media + Campaign Manager",
      replacedBy: "Giselle",
      agentColor: "green", 
      salary: 40000,
      icon: "📱"
    },
    {
      role: "Treatment Coordinator / Closer",
      replacedBy: "Devon",
      agentColor: "purple",
      salary: 60000,
      icon: "🎯"
    },
    {
      role: "Sales Follow-up Team",
      replacedBy: "Devon",
      agentColor: "purple",
      salary: 35000,
      icon: "📞"
    },
    {
      role: "Office Manager Trainer",
      replacedBy: "Alma",
      agentColor: "gold",
      salary: 60000,
      icon: "👥"
    },
    {
      role: "SOP + Onboarding Developer",
      replacedBy: "Alma",
      agentColor: "gold",
      salary: 45000,
      icon: "📋"
    }
  ];

  const totalSavings = roiData.reduce((sum, item) => sum + item.salary, 0);

  const getAgentBorderColor = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-500/20';
      case 'green': return 'border-green-500/20';
      case 'purple': return 'border-purple-500/20';
      case 'gold': return 'border-amber-500/20';
      default: return 'border-white/20';
    }
  };

  const getAgentTextColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-400';
      case 'green': return 'text-green-400';
      case 'purple': return 'text-purple-400';
      case 'gold': return 'text-amber-400';
      default: return 'text-white';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            💰 What You Save by Activating the AI Executive Team
          </h2>
          <p className="text-xl text-white/70 mb-6">
            Each AI agent replaces an entire department — without salary, sick days, or scale limits.
          </p>
          
          <div className="flex justify-center mb-8">
            <Button
              onClick={() => setShowComparison(!showComparison)}
              variant="outline"
              className="border-nextgen-purple/30 text-nextgen-purple hover:bg-nextgen-purple/10"
            >
              {showComparison ? 'Hide' : 'Show'} Time to Scale Comparison
            </Button>
          </div>
        </div>

        <Card className="glass-card max-w-6xl mx-auto overflow-hidden mb-8">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-white/10">
                    <TableHead className="text-white font-semibold">Role Replaced</TableHead>
                    <TableHead className="text-white font-semibold">Replaced By</TableHead>
                    <TableHead className="text-white font-semibold">Typical Salary (Annual)</TableHead>
                    <TableHead className="text-white font-semibold">Cost with NextGen OS</TableHead>
                    {showComparison && <TableHead className="text-white font-semibold">Time to Scale</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roiData.map((item, index) => (
                    <TableRow key={index} className="border-b border-white/5 hover:bg-white/5 group transition-all duration-200">
                      <TableCell className="py-6">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-white/90 font-medium">{item.role}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-3">
                          <div className="transition-transform duration-200 group-hover:scale-110">
                            <AgentAvatar 
                              name={item.replacedBy} 
                              role={item.role}
                              color={item.agentColor}
                              size="sm"
                              animated={true}
                              displayMode="initial"
                            />
                          </div>
                          <span className={`font-semibold ${getAgentTextColor(item.agentColor)}`}>
                            {item.replacedBy}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="text-red-400 font-semibold text-lg">
                          ${item.salary.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="text-green-400 font-bold text-lg">
                          Included ✓
                        </div>
                      </TableCell>
                      {showComparison && (
                        <TableCell className="py-6">
                          <div className="space-y-1">
                            <div className="text-red-400 text-sm line-through">4–6 months</div>
                            <div className="text-green-400 font-semibold">Instant</div>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Section */}
        <Card className="glass-card max-w-4xl mx-auto border-green-500/20 bg-green-50/5">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <DollarSign className="h-12 w-12 text-green-400" />
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">
                  ${totalSavings.toLocaleString()}+
                </div>
                <p className="text-xl text-white/90">
                  in annual labor savings — per region — replaced by 4 AI agents that work 24/7.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <Clock className="h-8 w-8 text-nextgen-purple mx-auto mb-2" />
                <div className="text-2xl font-bold text-nextgen-purple mb-1">24/7</div>
                <p className="text-white/70">Never sick, never tired</p>
              </div>
              <div className="text-center">
                <Zap className="h-8 w-8 text-nextgen-purple mx-auto mb-2" />
                <div className="text-2xl font-bold text-nextgen-purple mb-1">Instant</div>
                <p className="text-white/70">Deploy in minutes</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-nextgen-purple mx-auto mb-2" />
                <div className="text-2xl font-bold text-nextgen-purple mb-1">Scalable</div>
                <p className="text-white/70">No hiring limits</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-lg text-white/90 mb-4">
                Ready to replace overhead with high-performance AI?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white">
                  Let's Talk
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  See the Full System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default JuvTeamReplacementROI;
