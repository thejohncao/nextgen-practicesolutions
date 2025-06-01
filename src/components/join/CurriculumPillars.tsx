
import React from 'react';
import { Users, Settings, TrendingUp, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CurriculumPillars = () => {
  const pillars = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Patient Journey Systems",
      description: "Master the end-to-end patient lifecycle using automation and AI—from first touch to lifelong retention.",
      modules: ["Welcome to AI Dentistry", "Mapping Patient Journey", "Lead Conversion Systems", "Missed Call Rescue"],
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Front Office Operations",
      description: "Build scalable front office systems with SOPs, scripts, and automation-ready workflows.",
      modules: ["Front Desk Foundations", "New Patient Workflows", "AI Conversation Mapping", "Performance Metrics"],
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Treatment Coordination",
      description: "Guide patients from consult to case acceptance using frameworks that convert and scale.",
      modules: ["Psychology of Yes", "YES Framework", "Financial Conversations", "Follow-Up Protocols"],
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: "Practice Leadership",
      description: "Lead a modern team with scalable, data-backed systems and AI integration.",
      modules: ["Operational Leverage", "Team Culture & Vision", "Retention Systems", "NextGen Stack"],
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            What You'll Learn
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Our comprehensive curriculum covers everything you need to run a modern, AI-powered dental practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {pillars.map((pillar, index) => (
            <Card key={index} className="glass-card h-full hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full ${pillar.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform ${pillar.color}`}>
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white/50 uppercase tracking-wide">Key Modules:</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {pillar.modules.map((module, idx) => (
                      <div key={idx} className="text-sm text-white/60 flex items-center gap-2">
                        <div className={`w-1 h-1 rounded-full ${pillar.color.replace('text-', 'bg-')}`}></div>
                        {module}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10" asChild>
            <Link to="/academy/curriculum">
              View Full Curriculum
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CurriculumPillars;
