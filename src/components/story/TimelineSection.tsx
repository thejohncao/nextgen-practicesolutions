
import React from 'react';
import { Circle } from 'lucide-react';

const timelineData = [
  {
    year: '2022',
    title: 'The Problem',
    description: 'Running a modern dental practice meant juggling 12+ different systems. Staff were overwhelmed, cases fell through cracks, and growth hit a ceiling.',
  },
  {
    year: '2023',
    title: 'The Solution',
    description: 'We built an AI system that could handle everything—from patient communication to treatment planning. One unified system powered by intelligent automation.',
  },
  {
    year: '2024',
    title: 'The Evolution',
    description: 'What started as an internal tool became a movement. Hundreds of practices joined, proving that AI could transform how dental care is delivered.',
  },
  {
    year: '2025',
    title: 'The Future',
    description: "We're setting a new standard for practice management. Join us in building a future where technology empowers exceptional patient care.",
  },
];

const TimelineSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {timelineData.map((item, index) => (
            <div key={item.year} className="relative flex gap-8 mb-12 group">
              {/* Timeline line */}
              {index !== timelineData.length - 1 && (
                <div className="absolute left-[45px] top-16 w-0.5 h-[calc(100%+3rem)] bg-gradient-to-b from-nextgen-purple/50 to-transparent"></div>
              )}
              
              {/* Timeline dot */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center group-hover:animate-pulse-glow">
                  <span className="text-2xl font-bold text-gradient">{item.year}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 glass-card p-8 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <h3 className="text-2xl font-heading font-bold mb-4 text-gradient">
                  {item.title}
                </h3>
                <p className="text-lg text-white/70">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
