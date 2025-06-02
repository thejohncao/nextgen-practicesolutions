
import React from 'react';
import { Stethoscope, GraduationCap, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WhoWeHelpDemo = () => {
  const personas = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "Doctors & Owners",
      description: "Reduce overhead, increase EBITDA, and finally hire right—with certified coordinators and AI assistants that run 24/7.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Treatment Coordinators",
      description: "Upgrade your skills with certification in patient financing, AI tools, and modern workflows to close more cases with confidence.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Career Changers & Assistants",
      description: "Break into the dental industry with training that guarantees placement and real-world tools used by today's top offices.",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <section id="solution" className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Built for Every Role in the Practice
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {personas.map((persona, index) => (
            <Card key={index} className="glass-card h-full hover:shadow-lg transition-all duration-300 group hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${persona.bgColor} mb-6 group-hover:scale-110 transition-transform ${persona.color}`}>
                  {persona.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {persona.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {persona.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelpDemo;
