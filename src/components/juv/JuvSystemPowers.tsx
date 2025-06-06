
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, CreditCard, Settings, BarChart, Package, GraduationCap, Blueprint } from 'lucide-react';

const JuvSystemPowers = () => {
  const systemFeatures = [
    {
      icon: <Bot className="h-6 w-6" />,
      category: "🧠 AI Agent Suite",
      description: "8 intelligent agents (e.g., Juno, Luna, Nova, Miles, Alma) — automating key roles",
      color: "text-blue-500"
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      category: "🧩 Glow Wallet Engine",
      description: "Credit-based membership system, referral logic, upsell tracking",
      color: "text-purple-500"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      category: "⚙️ Automated Funnels",
      description: "Lead-gen: Quiz → Booking → Deposit → Reactivation + No-Show Winbacks",
      color: "text-green-500"
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      category: "📊 Live Dashboards",
      description: "Real-time metrics: bookings, conversions, top treatments, NP performance",
      color: "text-amber-500"
    },
    {
      icon: <Package className="h-6 w-6" />,
      category: "🧰 Launch Kit",
      description: "GHL snapshot, Notion SOPs, Webflow visuals, Lottie animations — plug-and-play ready",
      color: "text-red-500"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      category: "🎓 Internal Academy",
      description: "Alma trains NPs, front desk, and regional leads for scale",
      color: "text-indigo-500"
    },
    {
      icon: <Blueprint className="h-6 w-6" />,
      category: "📦 System Blueprint",
      description: "Fully mapped rollout plan for 1 → 100+ locations, designed for lean ops",
      color: "text-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            🧬 What NextGen Powers for JUV
          </h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto">
            NextGen isn't a concept — it's a fully built system ready to launch across 100+ locations. Designed specifically for hybrid healthcare models like JUV, we provide the engine that powers every part of the patient and provider experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {systemFeatures.map((feature, index) => (
            <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      {feature.category}
                    </h3>
                    <p className="text-white/70">
                      {feature.description}
                    </p>
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

export default JuvSystemPowers;
