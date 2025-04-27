
import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Calendar, MessageCircle, HeartHandshake, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const stages = [
  {
    name: "Awareness",
    icon: Users,
    description: "Patients discover your practice through targeted outreach",
    color: "green"
  },
  {
    name: "Appointment",
    icon: Calendar,
    description: "Easy scheduling with smart automation and reminders",
    color: "blue"
  },
  {
    name: "Consultation",
    icon: MessageCircle,
    description: "Personalized care plans and detailed treatment options",
    color: "purple"
  },
  {
    name: "Follow-Up",
    icon: HeartHandshake,
    description: "Automated communication for continued care and support",
    color: "indigo"
  },
  {
    name: "Membership",
    icon: StarIcon,
    description: "Long-term loyalty programs and patient retention",
    color: "teal"
  }
];

const PatientJourneySection = () => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(stages.map(() => false));

  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found, clicking...');
        chatButton.click();
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found after delay, clicking...');
            delayedChatButton.click();
          } else {
            console.warn('Chat button not found in DOM after delay');
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Show stages with cascading timing
            const newVisibleItems = [...visibleItems];
            stages.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const updated = [...prev];
                  updated[index] = true;
                  return updated;
                });
              }, index * 200);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('patient-journey');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="patient-journey" className="section-padding py-20 bg-gradient-to-b from-nextgen-dark/90 to-nextgen-dark">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <ArrowRight className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">Patient Journey</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            How the NextGen System Grows Your Practice
          </h2>
          
          <p className="text-lg text-white/70">
            From first contact to loyal membership — see how our AI agents guide your patients every step of the way.
          </p>
        </div>
        
        <div className="relative mt-20">
          {/* Timeline connector for desktop */}
          <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-0.5 bg-white/10 rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 animate-flow"></div>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {stages.map((stage, index) => {
              const StageIcon = stage.icon;
              const colorClasses = {
                green: "text-green-500 border-green-500/20 hover:bg-green-500/20",
                blue: "text-blue-500 border-blue-500/20 hover:bg-blue-500/20",
                purple: "text-purple-500 border-purple-500/20 hover:bg-purple-500/20",
                indigo: "text-indigo-500 border-indigo-500/20 hover:bg-indigo-500/20",
                teal: "text-teal-500 border-teal-500/20 hover:bg-teal-500/20"
              };
              
              return (
                <div 
                  key={stage.name} 
                  className={`relative transition-all duration-700 transform ${
                    visibleItems[index] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-20'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center">
                      <div className={`w-14 h-14 rounded-full bg-white/5 border ${colorClasses[stage.color as keyof typeof colorClasses]} flex items-center justify-center relative z-10 mb-4`}>
                        <StageIcon className={`h-6 w-6 ${colorClasses[stage.color as keyof typeof colorClasses]}`} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{stage.name}</h3>
                    <p className="text-white/70">{stage.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            onClick={handleChatOpen}
            className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(155,135,245,0.5)]"
            size="lg"
          >
            Experience the Future — Talk to Miles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PatientJourneySection;
