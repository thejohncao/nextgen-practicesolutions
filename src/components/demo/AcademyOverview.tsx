
import React from 'react';
import { GraduationCap, Users, Crown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AcademyOverview = () => {
  const tracks = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Foundation",
      description: "Patient communication, scheduling, office systems",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Growth",
      description: "Treatment planning, sales, patient financing",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: "Leadership",
      description: "Team management, AI workflows, coaching",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    }
  ];

  return (
    <section className="py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Train. Certify. Hire. Grow.
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            The only certification built to train and place dental front office pros in AI-powered practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {tracks.map((track, index) => (
            <Card key={index} className="glass-card h-full hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${track.bgColor} mb-6 group-hover:scale-110 transition-transform ${track.color}`}>
                  {track.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {track.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {track.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10" asChild>
            <Link to="/academy">
              Explore the Academy
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AcademyOverview;
