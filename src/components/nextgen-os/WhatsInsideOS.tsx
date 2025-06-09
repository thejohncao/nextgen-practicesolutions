
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Bot, Settings, BarChart3, Shield, Smartphone } from 'lucide-react';

const WhatsInsideOS = () => {
  const features = [
    {
      icon: CreditCard,
      title: "💳 Glow Wallet System",
      description: "Complete credit-based membership platform with automated billing",
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Bot,
      title: "🤖 4 AI Executive Agents",
      description: "Miles, Giselle, Devon, and Alma handling operations automatically",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Settings,
      title: "⚙️ Funnel + Credit Automation",
      description: "Automated lead capture, nurturing, and credit processing workflows",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: BarChart3,
      title: "📊 Analytics + Dashboards",
      description: "Real-time insights into practice performance and patient behavior",
      color: "text-amber-400",
      bgColor: "bg-amber-500/10"
    },
    {
      icon: Shield,
      title: "🛠️ Admin Control Panel",
      description: "Complete practice management with HIPAA-compliant security",
      color: "text-red-400",
      bgColor: "bg-red-500/10"
    },
    {
      icon: Smartphone,
      title: "📱 Web + Mobile App UI",
      description: "White-labeled frontend that matches your brand perfectly",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            What's Inside the OS
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Everything you need to run a modern practice, built into one unified platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="glass-card border-nextgen-purple/20 hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <IconComponent className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatsInsideOS;
