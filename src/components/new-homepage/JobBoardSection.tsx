
import React from 'react';
import { MapPin, Building, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const JobBoardSection = () => {
  const jobListings = [
    {
      icon: <Building className="h-5 w-5" />,
      company: "Bespoke Dental Studios",
      location: "Costa Mesa, CA",
      position: "Treatment Coordinator",
      description: "Trained in CareCredit + Cherry",
      badge: "Full-Time"
    },
    {
      icon: <Users className="h-5 w-5" />,
      company: "BrightSmile Ortho",
      location: "San Diego, CA", 
      position: "Front Desk Admin",
      description: "NextGen Certified, Full-Time",
      badge: "Immediate Start"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      company: "Pearl Dental Group",
      location: "Remote",
      position: "Virtual Treatment Closer",
      description: "Trained in GHL + AI tools",
      badge: "Remote"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gradient">
            Who's Hiring Our Graduates?
          </h2>
          <p className="text-center text-white/70 mb-12 max-w-3xl mx-auto">
            Join a network of practices already looking for certified, AI-ready dental professionals.
          </p>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {jobListings.map((job, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={0.1 + index * 0.1}>
              <Card className="glass-card h-full hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-nextgen-purple">
                      {job.icon}
                      <span className="text-sm font-medium">{job.company}</span>
                    </div>
                    <span className="text-xs bg-nextgen-purple/20 text-nextgen-purple px-2 py-1 rounded-full">
                      {job.badge}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-white">
                    {job.position}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-1 text-white/60 text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <p className="text-white/70 text-sm">
                    {job.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollRevealWrapper>
          ))}
        </div>

        <ScrollRevealWrapper animation="fade-up" delay={0.4}>
          <div className="text-center space-x-4">
            <Button size="lg" asChild>
              <Link to="/academy">
                Join the Academy
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border border-white/20 bg-white/5 text-white hover:bg-white/10"
              asChild
            >
              <Link to="/academy">
                See Placement Network
              </Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default JobBoardSection;
