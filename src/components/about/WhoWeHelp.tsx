
import React from 'react';
import { Card } from '@/components/ui/card';
import FadeInSection from '@/components/ui/fade-in-section';
import { Building2, GraduationCap, Users } from 'lucide-react';

const WhoWeHelp = () => {
  const audiences = [
    {
      title: "Doctors & Practice Owners",
      description: "Hire plug-and-play front office pros, increase case acceptance, and reduce overhead.",
      icon: Building2,
      color: "text-blue-400"
    },
    {
      title: "Current Treatment Coordinators",
      description: "Get certified, master patient financing, and learn to close high-ticket treatment.",
      icon: GraduationCap,
      color: "text-green-400"
    },
    {
      title: "Aspiring Dental Professionals",
      description: "Start your new career with real-world training, certification, and job placement.",
      icon: Users,
      color: "text-purple-400"
    }
  ];

  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
              Who We Support
            </h2>
          </div>
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <FadeInSection key={audience.title} delay={0.2 * index}>
              <Card className="glass-card p-6 h-full hover:bg-white/10 transition-all duration-300">
                <div className="text-center">
                  <audience.icon className={`w-12 h-12 mx-auto mb-4 ${audience.color}`} />
                  <h3 className="text-xl font-bold text-white mb-4">
                    {audience.title}
                  </h3>
                  <p className="text-white/70">
                    {audience.description}
                  </p>
                </div>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
