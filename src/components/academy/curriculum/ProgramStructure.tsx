
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Compass, HeadphonesIcon, Presentation, BarChart } from "lucide-react";
import ScrollRevealWrapper from '../../animation/ScrollRevealWrapper';
import { cn } from '@/lib/utils';

interface TrackCard {
  title: string;
  icon: React.ElementType;
  color: string;
  href: string;
}

const ProgramStructure = () => {
  const tracks: TrackCard[] = [
    {
      title: "Patient Journey Systems",
      icon: Compass,
      color: "bg-nextgen-blue/20 text-nextgen-blue",
      href: "#track1"
    },
    {
      title: "Front Office Operations",
      icon: HeadphonesIcon,
      color: "bg-nextgen-purple/20 text-nextgen-purple",
      href: "#track2"
    },
    {
      title: "Treatment Coordination",
      icon: Presentation,
      color: "bg-[#ff7e5e]/20 text-[#ff7e5e]",
      href: "#track3"
    },
    {
      title: "Practice Leadership",
      icon: BarChart,
      color: "bg-[#62E891]/20 text-[#62E891]",
      href: "#track4"
    }
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up" className="text-center mb-16">
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto italic">
            The NextGen curriculum is divided into four core tracks — each focused on real-world mastery 
            of a different part of the modern dental practice.
          </p>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {tracks.map((track, index) => (
            <ScrollRevealWrapper 
              key={index} 
              animation="fade-up" 
              delay={0.1 * (index + 1)}
            >
              <a href={track.href} className="block h-full">
                <Card className="bg-white/5 border-white/10 h-full hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={cn("rounded-full p-4 mb-4", track.color)}>
                      <track.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-white">{track.title}</h3>
                  </CardContent>
                </Card>
              </a>
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramStructure;
