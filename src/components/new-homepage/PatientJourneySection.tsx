
import React from 'react';
import { GraduationCap, Settings, Bot, TrendingUp } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PatientJourneySection = () => {
  const steps = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Certify Your Front Office",
      description: "Graduates of our Academy are trained in AI tools, patient financing, and treatment presentation.",
      color: "text-blue-500"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Plug In Our System",
      description: "Smile quiz funnel, $49 deposit booking, and treatment planner set up in Week 1.",
      color: "text-purple-500"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "Automate with AI Assistants",
      description: "Agents like Miles and Giselle handle follow-up, scheduling, and reminders.",
      color: "text-green-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Watch Collections Grow",
      description: "Certified TCs + automation = more consults booked, more treatment accepted.",
      color: "text-amber-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-transparent">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gradient">
            How It Works: From Training to Transformation
          </h2>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={0.1 + index * 0.1}>
              <Card className="glass-card h-full text-center relative">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4 ${step.color}`}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-nextgen-purple rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white">
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

        <ScrollRevealWrapper animation="fade-up" delay={0.5}>
          <div className="text-center">
            <Button 
              size="lg" 
              variant="outline"
              className="border border-white/20 bg-white/5 text-white hover:bg-white/10"
              asChild
            >
              <Link to="/join">
                Book a Demo
              </Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default PatientJourneySection;
