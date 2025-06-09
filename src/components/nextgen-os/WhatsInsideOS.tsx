
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
      bgColor: "bg-green-400/20"
    },
    {
      icon: Bot,
      title: "🤖 4 AI Executive Agents",
      description: "Miles, Giselle, Devon, and Alma handling operations automatically",
      color: "text-blue-400",
      bgColor: "bg-blue-400/20"
    },
    {
      icon: Settings,
      title: "⚙️ Funnel + Credit Automation",
      description: "Automated lead capture, nurturing, and credit processing workflows",
      color: "text-purple-400",
      bgColor: "bg-purple-400/20"
    },
    {
      icon: BarChart3,
      title: "📊 Analytics + Dashboards",
      description: "Real-time insights into practice performance and patient behavior",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/20"
    },
    {
      icon: Shield,
      title: "🛠️ Admin Control Panel",
      description: "Complete practice management with HIPAA-compliant security",
      color: "text-red-400",
      bgColor: "bg-red-400/20"
    },
    {
      icon: Smartphone,
      title: "📱 Web + Mobile App UI",
      description: "White-labeled frontend that matches your brand perfectly",
      color: "text-nextgen-purple",
      bgColor: "bg-nextgen-purple/20"
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-b from-black/95 to-nextgen-dark">
      <div className="container-liquid">
        <div className="text-center mb-20">
          <h2 className="text-headline-lg font-semibold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-8">
            What's Inside the OS
          </h2>
          <p className="text-body-lg text-white/70 max-w-3xl mx-auto">
            Everything you need to run a modern practice, built into one unified platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-350 group hover:scale-105">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-lg ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-350`}>
                    <IconComponent className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-body-lg font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-body text-white/70">{feature.description}</p>
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
