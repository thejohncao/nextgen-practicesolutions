
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Built to Run the Full Patient Journey
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              From first contact to final payment, our system handles every touchpoint with certified staff and AI automation.
            </p>
          </div>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={0.1 + index * 0.1}>
              <Card className="glass-card h-full hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4 group-hover:scale-110 transition-transform ${step.color}`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-white/70">
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
              <Link to="/solutions">See How It Works</Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default PatientJourneySection;
