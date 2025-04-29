
import React from 'react';
import { Video, User, Download, Check, Book, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ScrollRevealWrapper from '../../animation/ScrollRevealWrapper';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay }) => (
  <ScrollRevealWrapper animation="fade-up" delay={delay} className="h-full">
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="rounded-full bg-nextgen-purple/20 p-4 mb-4">
          <Icon className="h-6 w-6 text-nextgen-purple" />
        </div>
        <h3 className="text-lg font-heading font-semibold mb-2 text-white">{title}</h3>
        <p className="text-white/70 text-sm">{description}</p>
      </CardContent>
    </Card>
  </ScrollRevealWrapper>
);

const LearningFeatures = () => {
  const features = [
    {
      icon: Video,
      title: "Self-Paced Video Training",
      description: "Learn at your own schedule with comprehensive video modules"
    },
    {
      icon: User,
      title: "AI Roleplay Simulations",
      description: "Practice with realistic patient interactions in a risk-free environment"
    },
    {
      icon: Download,
      title: "Ready-to-Use Templates & SOPs",
      description: "Access ready-to-use scripts and frameworks for your practice"
    },
    {
      icon: Check,
      title: "Module Quizzes",
      description: "Verify knowledge and earn professional certificates for your team"
    },
    {
      icon: Book,
      title: "Progress Tracking",
      description: "Monitor your team's learning journey and milestones"
    },
    {
      icon: Clock,
      title: "Lifetime Access",
      description: "Revisit materials anytime with unlimited access for Blaze members"
    }
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-nextgen-dark to-nextgen-dark/95">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gradient">
            Built for Real Practice Teams
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
    </section>
  );
};

export default LearningFeatures;
