
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            What You'll Learn
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Master the essential skills to run a modern, AI-powered dental practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tracks.map((track, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={index * 0.1}>
              <Card className="glass-card border-nextgen-purple/20 bg-black/20 backdrop-blur-xl h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-nextgen-purple/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-6 w-6 text-nextgen-purple" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {track.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {track.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollRevealWrapper>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-nextgen-purple hover:bg-nextgen-purple/90">
            <Link to="/academy">
              Explore the Academy
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhatYoullLearnSection;
