
import React from 'react';
import { Link2, Users, Award, LineChart, HeadsetMic } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import GlowingCard from '@/components/effects/GlowingCard';
import { cn } from '@/lib/utils';

interface DifferentiatorProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const Differentiator = ({ title, description, icon, delay }: DifferentiatorProps) => (
  <ScrollRevealWrapper animation="fade-up" delay={delay}>
    <div className="flex items-start gap-4">
      <div className="p-2 rounded-full bg-nextgen-purple/20 text-nextgen-purple shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-medium text-lg mb-2">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </div>
  </ScrollRevealWrapper>
);

const DifferentiatorsSection = () => {
  const differentiators = [
    {
      icon: <Link2 className="h-5 w-5" />,
      title: "Truly Unified Platform",
      description: "Stop juggling multiple vendors. Get training, automation, and talent in one seamless OS."
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "AI That Empowers, Not Replaces",
      description: "Our tools augment your team's abilities, reducing tedious work and freeing them for meaningful interaction."
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Preserve Your Independence",
      description: "Grow efficiently and modernize without needing to adopt a restrictive franchise model or change your brand."
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      title: "Dental-Specific Expertise",
      description: "Built from the ground up with a deep understanding of dental workflows and challenges."
    },
    {
      icon: <HeadsetMic className="h-5 w-5" />,
      title: "Dedicated Support & Partnership",
      description: "We're invested in your success beyond the initial setup."
    }
  ];

  return (
    <section className="py-24 bg-black/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <GlowingCard 
          className="p-8 md:p-12 backdrop-blur-xl"
          glowColor="rgba(155, 135, 245, 0.2)"
        >
          <ScrollRevealWrapper animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              The NextGen Advantage: Beyond Fragmented Tools
            </h2>
          </ScrollRevealWrapper>
          
          <ScrollRevealWrapper animation="fade-up" delay={0.1}>
            <p className="text-xl text-white/80 mb-12 max-w-3xl">
              We've built NextGen from the ground up to address the specific challenges dental practices face
            </p>
          </ScrollRevealWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {differentiators.map((item, index) => (
              <Differentiator
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                delay={0.2 + (index * 0.1)}
              />
            ))}
          </div>
        </GlowingCard>
      </div>
    </section>
  );
};

export default DifferentiatorsSection;
