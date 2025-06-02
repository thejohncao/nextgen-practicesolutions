
import React from 'react';
import { ClipboardList, Bot, CreditCard, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorksDemo = () => {
  const steps = [
    {
      number: "1",
      icon: <ClipboardList className="h-8 w-8" />,
      title: "Patient submits quiz or form",
      description: "Smart intake forms capture patient needs and preferences automatically"
    },
    {
      number: "2",
      icon: <Bot className="h-8 w-8" />,
      title: "AI books and tags reason",
      description: "Miles schedules the appointment and categorizes the visit type for optimal preparation"
    },
    {
      number: "3",
      icon: <CreditCard className="h-8 w-8" />,
      title: "TC presents case + offers financing",
      description: "Devon assists with treatment presentation and financing options for higher acceptance"
    },
    {
      number: "4",
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Practice collects more, spends less",
      description: "Automated workflows and certified staff deliver measurable ROI growth"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Your Modern Practice, Powered by AI + Certified Talent
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="glass-card h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-nextgen-purple/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-bold text-nextgen-purple">{step.number}</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-nextgen-blue/20 flex items-center justify-center mx-auto mb-4 text-nextgen-blue">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-white">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Connecting line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-nextgen-purple to-nextgen-blue transform -translate-y-1/2 z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksDemo;
