
import React from 'react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const WhatYoullLearnSection = () => {
  const tracks = [
    {
      title: "Patient Journey Systems",
      description: "Master the end-to-end patient lifecycle using automation and AI"
    },
    {
      title: "Front Office Operations",
      description: "Build scalable front office systems with SOPs and workflows"
    },
    {
      title: "Treatment Coordination",
      description: "Guide patients from consult to case acceptance with proven frameworks"
    },
    {
      title: "Practice Leadership",
      description: "Lead a modern team with scalable, data-backed systems"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-transparent">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              What You'll Learn
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our Academy covers everything from basic operations to advanced AI integration and practice leadership.
            </p>
          </div>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tracks.map((track, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={0.1 + index * 0.1}>
              <Card className="glass-card h-full hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-nextgen-purple/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-nextgen-purple" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {track.title}
                      </h3>
                      <p className="text-white/70">
                        {track.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollRevealWrapper>
          ))}
        </div>

        <ScrollRevealWrapper animation="fade-up" delay={0.5}>
          <div className="text-center mt-12">
            <Button asChild className="bg-nextgen-purple hover:bg-nextgen-purple/90">
              <Link to="/academy">Explore the Academy</Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default WhatYoullLearnSection;
