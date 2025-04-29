
import React from 'react';
import { BookUser, Award, Users, GraduationCap } from "lucide-react";
import ScrollRevealWrapper from '../animation/ScrollRevealWrapper';
import { cn } from '@/lib/utils';

const NextGenJourney = () => {
  const steps = [
    {
      icon: BookUser,
      title: "1. Enroll",
      description: "Start your journey into AI-powered operations"
    },
    {
      icon: GraduationCap,
      title: "2. Certify",
      description: "Complete training modules at your own pace"
    },
    {
      icon: Award,
      title: "3. Coach",
      description: "Get career coaching and personalized guidance"
    },
    {
      icon: Users,
      title: "4. Launch",
      description: "Join a NextGen-approved practice or bring skills back to your own"
    }
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-nextgen-dark/90 to-nextgen-dark">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center text-gradient">
            Your Journey, Simplified
          </h2>
        </ScrollRevealWrapper>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-nextgen-purple/30 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            {steps.map((step, index) => (
              <ScrollRevealWrapper 
                key={index} 
                animation="fade-up"
                delay={0.1 * (index + 1)}
                className={cn(
                  "relative flex flex-col items-center text-center",
                  "transition-all duration-300 hover:transform hover:-translate-y-2"
                )}
              >
                {/* Progress line connector for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute h-12 w-0.5 bg-nextgen-purple/30 top-[90px] left-1/2 transform -translate-x-1/2"></div>
                )}
                
                {/* Icon */}
                <div className="rounded-full bg-nextgen-purple/20 p-5 mb-4 relative z-10">
                  <step.icon className="h-8 w-8 text-nextgen-purple" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-heading font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-white/70 text-sm max-w-[200px]">{step.description}</p>
              </ScrollRevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextGenJourney;
