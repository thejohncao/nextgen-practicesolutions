
import React from 'react';
import { Stethoscope, GraduationCap, Briefcase } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { Card, CardContent } from '@/components/ui/card';

const WhoWeHelpSection = () => {
  const audiences = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "Doctors & Practice Owners",
      description: "Streamline operations with AI tools and certified staff to boost profitability.",
      color: "text-blue-500"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Current Treatment Coordinators",
      description: "Advance your career with specialized training in patient financing and AI tools.",
      color: "text-purple-500"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Aspiring Dental Professionals",
      description: "Kickstart your dental career with comprehensive training and job placement support.",
      color: "text-green-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-transparent">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
            Who We Help
          </h2>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={0.1 + index * 0.1}>
              <Card className="glass-card h-full hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4 group-hover:scale-110 transition-transform ${audience.color}`}>
                    {audience.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {audience.title}
                  </h3>
                  <p className="text-white/70">
                    {audience.description}
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

export default WhoWeHelpSection;
