
import React from 'react';
import { Clock, Award, TrendingUp, ShieldCheck, Heart, PhoneCall, LineChart } from 'lucide-react';
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
  const benefits = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Slash Onboarding Time",
      description: "Reduce new hire training duration by up to 50%."
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Boost Treatment Acceptance",
      description: "Increase case acceptance and production with automated, effective follow-up."
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Reclaim Countless Hours",
      description: "Save an average of 15 hours per team member weekly by eliminating repetitive tasks."
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Reduce Costly Errors",
      description: "Minimize mistakes in scheduling, confirmations, and follow-ups."
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Decrease Staff Burnout",
      description: "Improve team morale and retention by providing tools that empower, not overwhelm."
    },
    {
      icon: <PhoneCall className="h-5 w-5" />,
      title: "Capture Every Lead",
      description: "Ensure rapid, consistent follow-up for all new patient inquiries."
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      title: "Achieve Scalable Growth",
      description: "Expand your practice without the usual operational headaches."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black/20 to-black/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient">
            Expect More: Tangible Results for Your Practice
          </h2>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.1}>
          <p className="text-xl text-white/80 text-center mb-12 max-w-3xl mx-auto">
            NextGen delivers measurable improvements across your practice operations
          </p>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
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
    </section>
  );
};

export default BenefitsSection;
