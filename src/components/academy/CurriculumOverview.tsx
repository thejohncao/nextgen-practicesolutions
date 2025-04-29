
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollRevealWrapper from '../animation/ScrollRevealWrapper';

const CurriculumOverview = () => {
  const tracks = [
    "Patient Journey Systems",
    "Front Office Operations",
    "Treatment Coordination",
    "Practice Leadership"
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-nextgen-dark to-nextgen-dark/90">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up" className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="rounded-lg p-4 bg-nextgen-purple/20">
              <BookOpen className="h-8 w-8 text-nextgen-purple" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            What You'll Learn
          </h2>
          
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Explore the 4 certification tracks and 20+ modules built for modern dental teams.
          </p>
        </ScrollRevealWrapper>
        
        <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {tracks.map((track, index) => (
            <ScrollRevealWrapper 
              key={index} 
              animation="fade-up" 
              delay={0.1 * (index + 1)}
              className="glass-card p-6 text-center hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-white font-heading font-medium">{track}</span>
            </ScrollRevealWrapper>
          ))}
        </div>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.6} className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white group"
          >
            <Link to="/academy/curriculum">
              View Full Curriculum
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default CurriculumOverview;
