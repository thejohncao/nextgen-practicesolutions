
import React from 'react';
import { Video, User, Download, Check, Book, Clock } from "lucide-react";
import ScrollRevealWrapper from '../animation/ScrollRevealWrapper';
import ParallaxSection from '../effects/ParallaxSection';
import { cn } from '@/lib/utils';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <ScrollRevealWrapper 
    animation="fade-up" 
    delay={delay} 
    className="relative flex flex-col items-center text-center p-6 glass-card transform transition-all duration-500 hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="rounded-full bg-nextgen-purple/20 p-4 mb-4">
      <Icon className="h-6 w-6 text-nextgen-purple" />
    </div>
    <h3 className="text-lg font-heading font-semibold mb-2 text-white">{title}</h3>
    <p className="text-white/70 text-sm">{description}</p>
  </ScrollRevealWrapper>
);

const HowItWorks = () => {
  const features = [
    {
      icon: Video,
      title: "Self-paced video training",
      description: "Learn at your own schedule with comprehensive video modules"
    },
    {
      icon: User,
      title: "AI-powered role play",
      description: "Practice with realistic patient interactions in a risk-free environment"
    },
    {
      icon: Download,
      title: "Done-for-you templates",
      description: "Access ready-to-use scripts and frameworks for your practice"
    },
    {
      icon: Check,
      title: "Certification quizzes",
      description: "Verify knowledge and earn professional certificates for your team"
    },
    {
      icon: Book,
      title: "Progress tracking",
      description: "Monitor your team's learning journey and milestones"
    },
    {
      icon: Clock,
      title: "Lifetime access",
      description: "Revisit materials anytime with unlimited access for clients"
    }
  ];

  return (
    <ParallaxSection className="py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-gradient">
            How It Works
          </h2>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
};

export default HowItWorks;
