
import React from 'react';
import { BookOpen, Bot, TrendingUp } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { Card, CardContent } from '@/components/ui/card';

const WhatWeOfferSection = () => {
  const offerings = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "NextGen Academy",
      description: "Comprehensive training programs for front office roles, including certification and real-world applications.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Assistant Team",
      description: "Automate routine tasks with our suite of AI tools, enhancing efficiency and accuracy.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Practice Growth Engine",
      description: "Implement proven strategies to attract and retain patients, increasing your practice's revenue.",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
            What We Offer
          </h2>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map((offering, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={0.1 + index * 0.1}>
              <Card className="glass-card h-full hover:shadow-lg transition-all duration-300 group hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${offering.bgColor} mb-6 group-hover:scale-110 transition-transform ${offering.color}`}>
                    {offering.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {offering.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {offering.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOfferSection;
