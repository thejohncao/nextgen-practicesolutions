
import React from 'react';
import { Quote, Play, TrendingUp, Users, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FounderSection = () => {
  const achievements = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Doubled Collections",
      description: "Built systems that consistently double practice revenue"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Leadership",
      description: "Led growth teams at high-performing dental groups"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Proven Results",
      description: "Successfully scaled methodologies across multiple practices"
    }
  ];

  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                  From Practice Growth Leader to National Educator
                </h2>
                <p className="text-xl text-white/70">
                  Meet Jonathan Cao, the visionary behind NextGen Academy
                </p>
              </div>

              {/* Quote */}
              <Card className="glass-card mb-8">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-nextgen-purple mb-4" />
                  <blockquote className="text-lg text-white/90 leading-relaxed mb-4">
                    "I've seen firsthand how the right systems and training can transform a practice. What took me years to develop and refine, we now teach in weeks. The Academy isn't just about education—it's about empowering every dental professional to achieve excellence."
                  </blockquote>
                  <footer className="text-white/70">
                    <strong className="text-white">Jonathan Cao</strong><br />
                    Founder & CEO, NextGen Practice Solutions
                  </footer>
                </CardContent>
              </Card>

              {/* Credentials */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Track Record:</h3>
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-nextgen-purple/10 flex items-center justify-center text-nextgen-purple">
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{achievement.title}</h4>
                      <p className="text-white/70 text-sm">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video/Image Placeholder */}
            <div className="relative">
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gradient-to-br from-nextgen-purple/20 to-nextgen-blue/20 flex items-center justify-center">
                    {/* Video thumbnail placeholder */}
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                      <p className="text-white/80 font-medium">Watch Jonathan's Message</p>
                      <p className="text-white/60 text-sm">2 min • Academy Introduction</p>
                    </div>
                    
                    {/* Play button overlay */}
                    <button className="absolute inset-0 w-full h-full bg-black/20 hover:bg-black/30 transition-colors group">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-white ml-0.5" />
                      </div>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats overlay */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-nextgen-purple to-nextgen-blue p-4 rounded-xl shadow-xl">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">10x</div>
                  <div className="text-xs opacity-90">Impact Multiplier</div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl shadow-xl">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-xs opacity-90">Lives Changed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-nextgen-purple/10 to-nextgen-blue/10 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                To democratize access to world-class dental practice management education, 
                ensuring every professional has the tools and knowledge to build thriving, 
                AI-enhanced practices that deliver exceptional patient care and sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
