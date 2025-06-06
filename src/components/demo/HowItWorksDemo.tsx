
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            How It Works: From Training to Transformation
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            See how NextGen transforms your practice through our proven 4-step system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={index * 0.1}>
              <Card className="glass-card border-nextgen-purple/20 bg-black/20 backdrop-blur-xl h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-nextgen-purple/20 flex items-center justify-center text-nextgen-purple">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-bold text-nextgen-purple mb-2">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollRevealWrapper>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-nextgen-purple hover:bg-nextgen-purple/90">
            <Link to="/pricing">
              Start Your Transformation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksDemo;
