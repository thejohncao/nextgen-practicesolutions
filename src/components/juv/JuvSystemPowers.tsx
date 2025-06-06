
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const JuvSystemPowers = () => {
  const systemFeatures = [
    {
      category: "🧠 AI Agent Suite",
      description: "4 core agents: Miles, Giselle, Devon, Alma — replacing departments with 24/7 execution"
    },
    {
      category: "🧩 Glow Wallet Engine",
      description: "Credit-based membership system, referral logic, and upsell tracking"
    },
    {
      category: "⚙️ Automated Funnels",
      description: "Quiz → Booking → Deposit → Reactivation + No-Show Winbacks"
    },
    {
      category: "📊 Live Dashboards",
      description: "Real-time KPIs for bookings, revenue, conversions, and NP performance"
    },
    {
      category: "🧰 Launch Kit",
      description: "Plug-and-play: GHL snapshot, Notion SOPs, Webflow assets, Lottie animations"
    },
    {
      category: "🎓 Internal Academy",
      description: "Alma trains NPs, front desk, and regional leaders with SOPs and onboarding workflows"
    },
    {
      category: "📦 System Blueprint",
      description: "Full rollout plan from 1 → 100 locations with lean ops and VA support"
    }
  ];

  return (
    <section className="py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            🧬 WHAT NEXTGEN POWERS FOR JUV
          </h2>
        </div>

        <Card className="glass-card max-w-5xl mx-auto overflow-hidden mb-8">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-white/10">
                    <TableHead className="text-white font-semibold">Category</TableHead>
                    <TableHead className="text-white font-semibold">What We've Already Built</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemFeatures.map((feature, index) => (
                    <TableRow key={index} className="border-b border-white/5 hover:bg-white/5">
                      <TableCell className="font-semibold text-nextgen-purple">{feature.category}</TableCell>
                      <TableCell className="text-white/80">{feature.description}</TableCell>
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

export default JuvSystemPowers;
