
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
    <section className="py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <ScrollRevealWrapper animation="fade-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-nextgen-purple/20 mb-6">
              <BookOpen className="h-8 w-8 text-nextgen-purple" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              What You'll Learn
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Explore the 4 certification tracks and 20+ modules built for modern dental teams.
            </p>
          </ScrollRevealWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tracks.map((track, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={0.1 + index * 0.1}>
              <Card className="glass-card h-full hover:shadow-lg transition-all duration-300 group hover:scale-105 border border-white/10">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-3 text-white">
                    {track.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {track.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollRevealWrapper>
          ))}
        </div>

        <ScrollRevealWrapper animation="fade-up" delay={0.5}>
          <div className="text-center">
            <Button 
              asChild
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white font-bold px-8"
            >
              <Link to="/academy/curriculum">
                View Full Curriculum →
              </Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default WhatYoullLearnSection;
