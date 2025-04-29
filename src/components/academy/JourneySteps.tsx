
import React from 'react';
import { BookUser, Award, Users, GraduationCap } from "lucide-react";

const JourneySteps = () => {
  const steps = [
    {
      icon: BookUser,
      title: "1. Enroll",
      description: "Start your journey into AI-powered operations"
    },
    {
      icon: GraduationCap,
      title: "2. Certify",
      description: "Master your training at your own pace"
    },
    {
      icon: Award,
      title: "3. Coach",
      description: "Get career coaching and strategic guidance"
    },
    {
      icon: Users,
      title: "4. Launch",
      description: "Join a NextGen-approved practice"
    }
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-nextgen-dark/90 to-nextgen-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center text-gradient">
          The NextGen Journey
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-nextgen-purple/30 to-transparent"></div>
          
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative flex flex-col items-center text-center animate-fade-in"
              style={{animationDelay: `${index * 150}ms`}}
            >
              {/* Icon */}
              <div className="rounded-full bg-nextgen-purple/20 p-5 mb-4">
                <step.icon className="h-8 w-8 text-nextgen-purple" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-heading font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-white/70 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySteps;
