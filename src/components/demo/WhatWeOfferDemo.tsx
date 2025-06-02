
import React from 'react';
import { Bot, TrendingUp, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const WhatWeOfferDemo = () => {
  const agents = [
    {
      name: "Miles",
      role: "Practice Management",
      description: "Automates scheduling, intake, and reviews so your front desk doesn't drown in admin work.",
      features: ["Calendar", "forms", "reminders"],
      icon: <Bot className="h-8 w-8" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      replaces: ["Calendly", "Weave", "RevenueWell"]
    },
    {
      name: "Giselle",
      role: "Practice Growth",
      description: "Converts more leads and reactivates dormant patients through smart follow-up workflows.",
      features: ["Lead nurture", "reactivation"],
      icon: <TrendingUp className="h-8 w-8" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      replaces: ["Mailchimp", "Salesforce", "Lighthouse 360"]
    },
    {
      name: "Devon",
      role: "Treatment Development",
      description: "Helps TCs close high-ticket cases with interactive planners, cost calculators, and finance tools.",
      features: ["Case close", "financing"],
      icon: <CreditCard className="h-8 w-8" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      replaces: ["CareCredit", "Cherry", "Sunbit"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Three Practice Solutions, One Unified System
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {agents.map((agent, index) => (
            <Card key={index} className="glass-card h-full hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-full ${agent.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform ${agent.color}`}>
                    {agent.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                    <p className="text-sm text-white/70">{agent.role}</p>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  {agent.description}
                </p>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className={`${agent.color} border-current/20`}>
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-white/50 uppercase tracking-wide mb-2">Replaces:</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.replaces.map((tool, idx) => (
                      <span key={idx} className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-white/60">
                        {tool}
                      </span>
                    ))}
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

export default WhatWeOfferDemo;
