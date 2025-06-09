
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Bot, Settings, BarChart3, Shield, Smartphone } from 'lucide-react';

const WhatsInsideOS = () => {
  const features = [
    {
      icon: CreditCard,
      title: "💳 Glow Wallet System",
      description: "Complete credit-based membership platform with automated billing",
      color: "text-giselle-primary",
      bgColor: "bg-giselle-primary/10"
    },
    {
      icon: Bot,
      title: "🤖 4 AI Executive Agents",
      description: "Miles, Giselle, Devon, and Alma handling operations automatically",
      color: "text-miles-primary",
      bgColor: "bg-miles-primary/10"
    },
    {
      icon: Settings,
      title: "⚙️ Funnel + Credit Automation",
      description: "Automated lead capture, nurturing, and credit processing workflows",
      color: "text-devon-primary",
      bgColor: "bg-devon-primary/10"
    },
    {
      icon: BarChart3,
      title: "📊 Analytics + Dashboards",
      description: "Real-time insights into practice performance and patient behavior",
      color: "text-alma-primary",
      bgColor: "bg-alma-primary/10"
    },
    {
      icon: Shield,
      title: "🛠️ Admin Control Panel",
      description: "Complete practice management with HIPAA-compliant security",
      color: "text-alert-coral",
      bgColor: "bg-alert-coral/10"
    },
    {
      icon: Smartphone,
      title: "📱 Web + Mobile App UI",
      description: "White-labeled frontend that matches your brand perfectly",
      color: "text-glow-indigo",
      bgColor: "bg-glow-indigo/10"
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-b from-crystal-white to-mist-blue/30">
      <div className="container-liquid">
        <div className="text-center mb-20">
          <h2 className="text-headline-lg text-liquid-gradient mb-8">
            What's Inside the OS
          </h2>
          <p className="text-body-lg text-liquid-slate/70 max-w-3xl mx-auto">
            Everything you need to run a modern practice, built into one unified platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="liquid-glass hover-lift hover-glow transition-all duration-350 group">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-liquid ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-350`}>
                    <IconComponent className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-body-lg font-semibold text-liquid-slate mb-4">{feature.title}</h3>
                  <p className="text-body text-liquid-slate/70">{feature.description}</p>
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
