
import React from 'react';
import { Card } from '@/components/ui/card';
import FadeInSection from '@/components/ui/fade-in-section';
import { Check } from 'lucide-react';

const PartnerPractices = () => {
  const benefits = [
    "Hire pre-trained front office staff, ready from Day 1",
    "Upskill existing team members into certified closers",
    "Reduce payroll while increasing collections",
    "Optionally add AI agents to automate reminders, follow-ups, and more"
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
              Why Doctors Work With Us
            </h2>
          </div>
        </FadeInSection>
        
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <FadeInSection>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <Check className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-white/80 text-lg">{benefit}</p>
                    </div>
                  ))}
                </div>
              </FadeInSection>
              
              <FadeInSection delay={0.2}>
                <div className="text-center md:text-left">
                  <div className="inline-block px-6 py-3 bg-nextgen-purple/20 rounded-full mb-6">
                    <span className="text-nextgen-purple font-semibold text-lg">
                      We train. You grow.
                    </span>
                  </div>
                  
                  <p className="text-white/70 text-lg">
                    Partner practices see an average 40% increase in case acceptance within 90 days of implementing our certified team members and systems.
                  </p>
                </div>
              </FadeInSection>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PartnerPractices;
