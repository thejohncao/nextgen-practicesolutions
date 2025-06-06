
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
    <section className="py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Built to Run the Full Patient Journey
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            From first contact to final payment, NextGen automates every step of your patient experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={index * 0.1}>
              <Card className="glass-card border-nextgen-purple/20 bg-black/20 backdrop-blur-xl h-full">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-nextgen-purple/20 flex items-center justify-center ${step.color}`}>
                    {step.icon}
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
            <Link to="/demo">
              See It In Action
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PatientJourneySection;
