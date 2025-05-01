
import React from 'react';
import { GraduationCap, Bot, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { cn } from '@/lib/utils';

interface PillarCardProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  description: string;
  outcome: string;
  linkText: string;
  linkTo: string;
  delay: number;
}

const PillarCard = ({
  title,
  icon,
  iconColor,
  description,
  outcome,
  linkText,
  linkTo,
  delay
}: PillarCardProps) => (
  <ScrollRevealWrapper animation="fade-up" delay={delay}>
    <div className={cn(
      "p-8 rounded-xl backdrop-blur-md transition-all duration-300",
      "bg-white/5 border border-white/10",
      "hover:shadow-[0_8px_30px_rgba(155,135,245,0.25)] hover:border-nextgen-purple/30",
      "h-full group"
    )}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-full ${iconColor}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      
      <p className="text-white/80 mb-4">{description}</p>
      
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
        <p className="text-white/90 font-medium">Outcome:</p>
        <p className="text-white/70">{outcome}</p>
      </div>
      
      <Link to={linkTo} className="inline-flex items-center text-nextgen-purple hover:text-nextgen-purple/80 font-medium transition-colors">
        {linkText}
        <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </ScrollRevealWrapper>
);

const PillarsSection = () => {
  return (
    <section className="py-24 bg-black/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gradient">
            Train. Automate. Scale. Seamlessly Integrated.
          </h2>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.1}>
          <p className="text-xl text-white/80 text-center mb-12 max-w-3xl mx-auto">
            An integrated approach to creating a more efficient, profitable practice
          </p>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PillarCard
            title="Standardize Team Excellence"
            icon={<GraduationCap className="h-6 w-6 text-white" />}
            iconColor="bg-nextgen-purple"
            description="Role-based certifications and SOPs delivered via Alma, our AI training assistant. Consistent skills. Faster onboarding."
            outcome="Onboard new hires up to 50% faster"
            linkText="Explore Practice Academy"
            linkTo="/academy"
            delay={0.2}
          />
          
          <PillarCard
            title="Automate Routine Tasks"
            icon={<Bot className="h-6 w-6 text-white" />}
            iconColor="bg-nextgen-blue"
            description="AI agents (Giselle, Miles, Devon) handle lead nurture, scheduling, follow-ups, and more. Integrated with your CRM, site, and phone system."
            outcome="Reclaim 15+ hours per week from admin work"
            linkText="Meet Your AI Team"
            linkTo="/ai-team"
            delay={0.3}
          />
          
          <PillarCard
            title="Scale with Certified Talent"
            icon={<Users className="h-6 w-6 text-white" />}
            iconColor="bg-nextgen-green"
            description="Hire pre-certified, NextGen-trained front office professionals ready to contribute from Day 1. Remote, hybrid, or in-office."
            outcome="Fill staffing gaps instantly with system-ready team members"
            linkText="Access the Talent Network"
            linkTo="/join"
            delay={0.4}
          />
        </div>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.5} className="mt-12">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md max-w-3xl mx-auto text-center">
            <p className="text-lg text-white/90 font-medium">
              The Real Power? Integration. Trained teams leverage AI agents effectively. New hires from the Talent Network are instantly productive within your optimized system. It all works together, seamlessly.
            </p>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default PillarsSection;
