
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Palette, Settings, BarChart3, Zap, Bot, Database } from 'lucide-react';

const CoreModules = () => {
  const modules = [
    {
      icon: CreditCard,
      title: "💳 Glow Wallet",
      description: "Auto-accrual credits, birthday bonuses, referrals, rollovers",
      color: "text-green-400",
      bgColor: "bg-green-400/20"
    },
    {
      icon: Palette,
      title: "🎨 Branded App UI",
      description: "White-labeled booking, wallet, tracking, and referrals",
      color: "text-blue-400",
      bgColor: "bg-blue-400/20"
    },
    {
      icon: Settings,
      title: "💻 Admin Panel",
      description: "Set pricing, tiers, redemption rules, and service menus",
      color: "text-purple-400",
      bgColor: "bg-purple-400/20"
    },
    {
      icon: BarChart3,
      title: "📈 Analytics",
      description: "Real-time dashboard: redemptions, referrals, LTV, bookings, usage",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/20"
    },
    {
      icon: Zap,
      title: "🔁 Automations",
      description: "Stripe/GHL/Make flows: drop credits, send reminders, run follow-ups",
      color: "text-orange-400",
      bgColor: "bg-orange-400/20"
    },
    {
      icon: Bot,
      title: "🧠 AI Agents",
      description: "Optional AI layer: automate scheduling, marketing, training, sales",
      color: "text-nextgen-purple",
      bgColor: "bg-nextgen-purple/20"
    },
    {
      icon: Database,
      title: "🔌 EMR Sync",
      description: "PatientNow and 3rd party API integration (optional phase)",
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/20"
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-b from-black/95 to-nextgen-dark">
      <div className="container-liquid">
        <div className="text-center mb-20">
          <h2 className="text-headline-lg font-semibold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-8">
            Core Modules of NextGen OS
          </h2>
          <p className="text-body-lg text-white/70 max-w-3xl mx-auto">
            Everything you need to run a modern practice, built into one unified platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-350 group hover:scale-105">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-lg ${module.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-350`}>
                    <IconComponent className={`h-7 w-7 ${module.color}`} />
                  </div>
                  <h3 className="text-body-lg font-semibold text-white mb-4">{module.title}</h3>
                  <p className="text-body text-white/70">{module.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreModules;
