
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
    <section className="py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
            How It Works: From Training to Transformation
          </h2>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={0.1 + index * 0.1}>
              <Card className="glass-card h-full hover:shadow-lg transition-all duration-300 group hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-nextgen-purple/20 mb-6 group-hover:scale-110 transition-transform text-nextgen-purple">
                    {step.icon}
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-nextgen-purple">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollRevealWrapper>
          ))}
        </div>

        <ScrollRevealWrapper animation="fade-up" delay={0.5}>
          <div className="text-center">
            <Button 
              asChild
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white font-bold"
            >
              <Link to="/academy">Learn More About Our Academy</Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default HowItWorksDemo;
