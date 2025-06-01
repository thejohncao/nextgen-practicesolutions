
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import RainbowButton from '@/components/ui/rainbow-button';
import GlowingCard from '@/components/effects/GlowingCard';

const PartnerPracticesSection = () => {
  const benefits = [
    "Hire pre-trained front office staff, ready from Day 1",
    "Upskill existing team members into certified closers",
    "Reduce payroll while increasing collections",
    "Optional AI assistant add-on to automate follow-up, reminders, and scheduling",
    "Boost EBITDA without growing your headcount"
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <GlowingCard className="p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-nextgen-purple/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-nextgen-blue/20 rounded-full blur-3xl -z-10"></div>
          
          <ScrollRevealWrapper animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gradient">
              For Partner Practices
            </h2>
          </ScrollRevealWrapper>

          <div className="max-w-4xl mx-auto">
            <ScrollRevealWrapper animation="fade-up" delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-white/80 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </ScrollRevealWrapper>

            <ScrollRevealWrapper animation="fade-up" delay={0.2}>
              <div className="text-center mb-8">
                <p className="text-xl text-nextgen-purple font-medium">
                  We train. You grow.
                </p>
              </div>
            </ScrollRevealWrapper>

            <ScrollRevealWrapper animation="fade-up" delay={0.3}>
              <div className="text-center">
                <RainbowButton size="lg" asChild>
                  <Link to="/join" className="inline-flex items-center">
                    Become a Partner Practice
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </RainbowButton>
              </div>
            </ScrollRevealWrapper>
          </div>
        </GlowingCard>
      </div>
    </section>
  );
};

export default PartnerPracticesSection;
