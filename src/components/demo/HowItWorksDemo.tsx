
import React from 'react';
import { ClipboardList, Bot, CreditCard, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
    <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              How It Works: From Training to Transformation
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              See how our certified staff and AI agents work together to transform your patient journey.
            </p>
          </div>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={0.1 + index * 0.1}>
              <Card className="glass-card h-full hover:shadow-lg transition-all duration-300 group relative">
                <CardContent className="p-6 text-center">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-nextgen-purple rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.number}
                  </div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4 mt-4 group-hover:scale-110 transition-transform text-nextgen-purple">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollRevealWrapper>
          ))}
        </div>

        <ScrollRevealWrapper animation="fade-up" delay={0.5}>
          <div className="text-center mt-12">
            <Button asChild className="bg-nextgen-purple hover:bg-nextgen-purple/90">
              <Link to="/ai-demo">Try the Demo</Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default HowItWorksDemo;
