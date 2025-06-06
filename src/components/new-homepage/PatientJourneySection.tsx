
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
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
            Built to Run the Full Patient Journey
          </h2>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={0.1 + index * 0.1}>
              <Card className="glass-card h-full hover:shadow-lg transition-all duration-300 group hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-6 group-hover:scale-110 transition-transform ${step.color}`}>
                    {step.icon}
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
              <Link to="/solutions">Explore Our Solutions</Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default PatientJourneySection;
