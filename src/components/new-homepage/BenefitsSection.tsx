
import React from 'react';
import { Globe, Shield, TrendingUp, Zap, Server, BarChart3 } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { cn } from '@/lib/utils';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const BenefitCard = ({ title, description, icon, delay }: BenefitCardProps) => (
  <ScrollRevealWrapper animation="fade-up" delay={delay} className="w-full">
    <div className={cn(
      "p-6 rounded-xl backdrop-blur-md transition-all duration-300",
      "bg-white/5 border border-white/10",
      "hover:shadow-[0_8px_30px_rgba(155,135,245,0.15)] hover:border-nextgen-purple/20",
      "flex items-start gap-4"
    )}>
      <div className="p-3 rounded-full bg-nextgen-purple/20 text-nextgen-purple shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-medium text-lg mb-1">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </div>
  </ScrollRevealWrapper>
);

const BenefitsSection = () => {
  const platformBenefits = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Unified OS",
      description: "Training, automation, talent — all in one seamless system"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Works With Your Tools",
      description: "Built on GoHighLevel. Integrates with Google, Stripe, Meta Ads, and more"
    },
    {
      icon: <Server className="h-5 w-5" />,
      title: "Fast Setup",
      description: "Most practices go live in under 7 days"
    },
  ];
  
  const securityBenefits = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "SOC 2 Certified, HIPAA-Ready",
      description: "Enterprise-grade encryption and role-based access"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "HITECH & ADA Compliant",
      description: "Built for healthcare-grade privacy and accessibility"
    }
  ];
  
  const outcomeBenefits = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Boost Case Acceptance",
      description: "Increase treatment acceptance by 10–15% with AI-driven follow-up"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Reduce No-Shows",
      description: "Smart confirmations + reminders minimize appointment gaps"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Accelerate Onboarding",
      description: "Cut new hire ramp-up time by up to 50%"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black/20 to-black/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient">
            Engineered for Performance, Security, and Growth
          </h2>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          {/* Platform Benefits */}
          <ScrollRevealWrapper animation="fade-up" delay={0.1}>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Platform Benefits</h3>
              <div className="space-y-4">
                {platformBenefits.map((benefit, index) => (
                  <BenefitCard
                    key={index}
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                    delay={0.1 + (index * 0.1)}
                  />
                ))}
              </div>
            </div>
          </ScrollRevealWrapper>
          
          {/* Security & Compliance */}
          <ScrollRevealWrapper animation="fade-up" delay={0.2}>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Security & Compliance</h3>
              <div className="space-y-4">
                {securityBenefits.map((benefit, index) => (
                  <BenefitCard
                    key={index}
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                    delay={0.2 + (index * 0.1)}
                  />
                ))}
              </div>
            </div>
          </ScrollRevealWrapper>
          
          {/* Outcomes & ROI */}
          <ScrollRevealWrapper animation="fade-up" delay={0.3}>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Outcomes & ROI</h3>
              <div className="space-y-4">
                {outcomeBenefits.map((benefit, index) => (
                  <BenefitCard
                    key={index}
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                    delay={0.3 + (index * 0.1)}
                  />
                ))}
              </div>
            </div>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
