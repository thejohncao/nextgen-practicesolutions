
import React from 'react';
import { Book, BrainCircuit, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { cn } from '@/lib/utils';

interface PillarCardProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  description: string;
  benefit: string;
  linkText: string;
  linkTo: string;
  delay: number;
}

const PillarCard = ({
  title,
  icon,
  iconColor,
  description,
  benefit,
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
        <p className="text-white/90 font-medium">Benefit:</p>
        <p className="text-white/70">{benefit}</p>
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
            Transform Your Operations with the 3 Pillars of NextGen
          </h2>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.1}>
          <p className="text-xl text-white/80 text-center mb-12 max-w-3xl mx-auto">
            An integrated approach to solving your practice's operational challenges
          </p>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PillarCard
            title="Practice Academy"
            icon={<Book className="h-6 w-6 text-white" />}
            iconColor="bg-nextgen-purple"
            description="Standardize skills and slash onboarding time. Access role-based certifications (TC, Systems Operator, Exec Op), SOPs, checklists, and best practices delivered via Alma, our AI training assistant."
            benefit="Faster onboarding, reduced errors, empowered & consistent team performance."
            linkText="Learn More About Practice Academy"
            linkTo="/academy"
            delay={0.2}
          />
          
          <PillarCard
            title="AI Agent Team"
            icon={<BrainCircuit className="h-6 w-6 text-white" />}
            iconColor="bg-nextgen-blue"
            description="Deploy specialized AI agents integrated with your systems. Giselle nurtures leads 24/7, Miles handles scheduling & confirmations intelligently, Devon ensures timely treatment & recall follow-ups."
            benefit="Reclaim hours daily, capture more revenue, reduce manual errors, free staff for patient care."
            linkText="Meet Your AI Agent Team"
            linkTo="/ai-team"
            delay={0.3}
          />
          
          <PillarCard
            title="Talent Network"
            icon={<Users className="h-6 w-6 text-white" />}
            iconColor="bg-nextgen-green"
            description="Need skilled front-office help? Access our network of AI-ready professionals (remote or in-office) already proficient in the NextGen OS. Hire talent ready to contribute from Day 1."
            benefit="Eliminate ramp-up time, reduce hiring costs, fill gaps quickly, scale flexibly."
            linkText="Explore the Talent Network"
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
