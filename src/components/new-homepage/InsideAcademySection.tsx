import React from 'react';
import { Building2, Trophy, Crown } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InsideAcademySection = () => {
  const tracks = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Foundation",
      description: "Master the essentials of front office operations, including scheduling and patient communication.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Growth",
      description: "Enhance your skills in treatment presentation and patient financing to drive case acceptance.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: <Crown className="h-6 w-6" />,
      title: "Leadership",
      description: "Develop leadership capabilities and proficiency in AI tools to manage and train teams effectively.",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
            Inside the Academy
          </h2>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tracks.map((track, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={0.1 + index * 0.1}>
              <Card className="glass-card h-full hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${track.bgColor} mb-4 ${track.color}`}>
                    {track.icon}
                  </div>
                  <CardTitle className="text-xl text-white">
                    {track.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-white/70 text-center leading-relaxed">
                    {track.description}
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

export default InsideAcademySection;
