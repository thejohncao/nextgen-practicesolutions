
import React from 'react';
import { Building2, Trophy, Crown, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CertificationTracks = () => {
  const tracks = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Foundation Track",
      subtitle: "Learn scheduling, communication, and intake workflows",
      skills: [
        "Patient intake optimization",
        "Scheduling best practices", 
        "Basic communication protocols",
        "Front desk fundamentals"
      ],
      badge: "Certified Front Office Professional",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Growth Track",
      subtitle: "Master treatment planning, financing tools, and case acceptance",
      skills: [
        "Treatment plan presentation",
        "CareCredit & financing options",
        "Objection handling techniques",
        "Case acceptance optimization"
      ],
      badge: "Certified Treatment Coordinator",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      icon: <Crown className="h-6 w-6" />,
      title: "Leadership Track",
      subtitle: "Train in performance tracking, AI operations, and team coaching",
      skills: [
        "Team performance metrics",
        "AI tool implementation",
        "Leadership development",
        "Practice optimization"
      ],
      badge: "Executive Practice Operator",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30"
    }
  ];

  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Certification Tracks
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Stackable certifications that build your expertise and advance your career step by step.
          </p>
        </div>

        {/* Timeline Visual */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative">
            {/* Progress line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tracks.map((track, index) => (
                <div key={index} className="relative">
                  {/* Progress dot */}
                  <div className={`absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${track.bgColor} border-2 ${track.borderColor} z-10 hidden md:flex items-center justify-center`}>
                    <div className={`w-3 h-3 rounded-full ${track.color.replace('text-', 'bg-')}`}></div>
                  </div>
                  
                  <Card className={`glass-card h-full hover:shadow-lg transition-all duration-300 border ${track.borderColor} mt-24 md:mt-32`}>
                    <CardContent className="p-8 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${track.bgColor} mb-6 ${track.color}`}>
                        {track.icon}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {track.title}
                      </h3>
                      
                      <p className="text-white/70 mb-6 text-sm leading-relaxed">
                        {track.subtitle}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        {track.skills.map((skill, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-white/60">
                            <CheckCircle className={`h-4 w-4 ${track.color} flex-shrink-0`} />
                            {skill}
                          </div>
                        ))}
                      </div>
                      
                      <div className={`inline-flex items-center gap-2 ${track.bgColor} border ${track.borderColor} rounded-full px-4 py-2`}>
                        <div className={`w-2 h-2 rounded-full ${track.color.replace('text-', 'bg-')}`}></div>
                        <span className="text-xs font-medium text-white">{track.badge}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/60 text-sm mb-4">
            Complete all three tracks to earn the prestigious <span className="text-amber-400 font-semibold">Executive Operator Badge</span>
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-400/20 border border-amber-400/30 rounded-full px-6 py-3">
            <Crown className="h-5 w-5 text-amber-400" />
            <span className="text-sm font-medium text-white">Honor Designation • LinkedIn Badge • Priority Access</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationTracks;
