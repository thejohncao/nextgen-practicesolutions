
import React from 'react';
import { Link2, Users, Award, LineChart, Headset } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import GlowingCard from '@/components/effects/GlowingCard';
import { cn } from '@/lib/utils';

interface DifferentiatorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
  className?: string;
}

const DifferentiatorCard = ({ title, description, icon, color, delay, className }: DifferentiatorCardProps) => (
  <ScrollRevealWrapper animation="fade-up" delay={delay} className="h-full">
    <div className={cn(
      "p-6 rounded-xl backdrop-blur-md",
      "bg-white/5 border border-white/10 h-full",
      "transition-all duration-300 hover:bg-white/10",
      className
    )}>
      <div className={`p-3 rounded-full ${color} mb-4 inline-block`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  </ScrollRevealWrapper>
);

const DifferentiatorsSection = () => {
  return (
    <section className="py-24 bg-black/40 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient">
            What Makes NextGen Different
          </h2>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.1}>
          <p className="text-xl text-white/80 text-center mb-12 max-w-3xl mx-auto">
            We don't just give you another tool — we provide a complete operating system for your practice
          </p>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <DifferentiatorCard 
            title="Unified Experience"
            description="One seamless system that handles training, automation, and talent acquisition."
            icon={<Link2 className="h-6 w-6 text-white" />}
            color="bg-nextgen-purple/20"
            delay={0.2}
          />
          
          <DifferentiatorCard 
            title="Industry-Specific"
            description="Built exclusively for dental practices with tailored workflows."
            icon={<Award className="h-6 w-6 text-white" />}
            color="bg-nextgen-blue/20"
            delay={0.3}
          />
          
          <DifferentiatorCard 
            title="Human + AI Approach"
            description="AI automation with human oversight where it matters most."
            icon={<Users className="h-6 w-6 text-white" />}
            color="bg-nextgen-green/20"
            delay={0.4}
          />
          
          <DifferentiatorCard 
            title="Measurable Results"
            description="Clear metrics showing reduced costs and improved patient experience."
            icon={<LineChart className="h-6 w-6 text-white" />}
            color="bg-nextgen-orange/20"
            delay={0.5}
          />
        </div>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.6} className="mt-16">
          <GlowingCard className="p-6 max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-2 rounded-full bg-nextgen-purple/20">
                <Headset className="h-5 w-5 text-nextgen-purple" />
              </div>
            </div>
            <p className="text-lg text-white/90">
              "Our support team consists of actual dental practice managers who understand your challenges."
            </p>
          </GlowingCard>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default DifferentiatorsSection;
