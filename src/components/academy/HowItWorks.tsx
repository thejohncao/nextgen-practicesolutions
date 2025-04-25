
import React from 'react';
import { Video, Book, Download, Check, User } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <div 
    className="relative flex flex-col items-center text-center p-6 glass-card transform transition-all duration-500 hover:bg-white/10"
    style={{ animationDelay: `${delay * 100}ms` }}
  >
    <div className="rounded-full bg-nextgen-purple/20 p-4 mb-4">
      <Icon className="h-6 w-6 text-nextgen-purple" />
    </div>
    <h3 className="text-lg font-heading font-semibold mb-2 text-white">{title}</h3>
    <p className="text-white/70 text-sm">{description}</p>
  </div>
);

const HowItWorks = () => {
  const features = [
    {
      icon: Video,
      title: "Self-paced learning",
      description: "Complete modules on your own schedule, perfect for busy dental practices"
    },
    {
      icon: User,
      title: "Real-world roleplay scenarios",
      description: "Practice with realistic patient interactions in a risk-free environment"
    },
    {
      icon: Download,
      title: "Downloadable SOPs and scripts",
      description: "Ready-to-use templates for immediate implementation in your practice"
    },
    {
      icon: Check,
      title: "Certification quizzes",
      description: "Verify knowledge and earn professional certificates for your team"
    },
    {
      icon: Book,
      title: "Lifetime access",
      description: "Revisit materials anytime with unlimited access for Blaze clients"
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-gradient">
            How It Works
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
        
        {/* Process steps with connecting lines */}
        <div className="hidden md:flex justify-between max-w-4xl mx-auto mt-8">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-nextgen-purple/30 to-transparent my-4"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
