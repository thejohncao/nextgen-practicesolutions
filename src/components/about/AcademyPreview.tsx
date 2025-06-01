
import React from 'react';
import { Card } from '@/components/ui/card';
import FadeInSection from '@/components/ui/fade-in-section';
import { BookOpen, Target, Crown, Check } from 'lucide-react';

const AcademyPreview = () => {
  const tracks = [
    {
      title: "Foundation",
      description: "Scheduling, intake, communication, office systems",
      icon: BookOpen,
      color: "text-blue-400"
    },
    {
      title: "Growth",
      description: "Treatment presentation, objection handling, patient financing",
      icon: Target,
      color: "text-green-400"
    },
    {
      title: "Leadership",
      description: "Team management, reporting, AI integration",
      icon: Crown,
      color: "text-nextgen-purple"
    }
  ];

  const certifications = [
    "CareCredit, Cherry, and Sunbit financing platforms",
    "Treatment planning + closing",
    "GoHighLevel automation workflows",
    "Communication scripts and real-world SOPs"
  ];

  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
              What You'll Learn Inside the Academy
            </h2>
          </div>
        </FadeInSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certification Tracks */}
          <FadeInSection>
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Certification Tracks</h3>
              <div className="space-y-6">
                {tracks.map((track, index) => (
                  <div key={track.title} className="flex items-start space-x-4">
                    <track.icon className={`w-8 h-8 mt-1 ${track.color}`} />
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{track.title}</h4>
                      <p className="text-white/70">{track.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeInSection>

          {/* Certifications */}
          <FadeInSection delay={0.2}>
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6">You'll Get Certified In</h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-white/70">{cert}</p>
                  </div>
                ))}
              </div>
            </Card>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default AcademyPreview;
