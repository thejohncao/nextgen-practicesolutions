
import React from 'react';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RainbowButton from '@/components/ui/rainbow-button';

const JobBoard = () => {
  const jobs = [
    {
      company: "Bespoke Dental Group",
      position: "Senior Treatment Coordinator",
      location: "Austin, TX",
      type: "Full-Time",
      salary: "$65K - $85K",
      tags: ["Immediate Start", "Benefits", "Growth Opportunity"],
      description: "Lead treatment coordination for our flagship location using NextGen methodologies."
    },
    {
      company: "BrightSmile Partners",
      position: "Front Office Manager",
      location: "Remote",
      type: "Remote",
      salary: "$55K - $70K",
      tags: ["Remote", "Flexible Hours", "AI Experience"],
      description: "Manage virtual front office operations across multiple practice locations."
    },
    {
      company: "Pearl Dental Excellence",
      position: "Treatment Coordinator",
      location: "Phoenix, AZ",
      type: "Full-Time",
      salary: "$50K - $65K",
      tags: ["Entry Level", "Training Provided", "Career Growth"],
      description: "Perfect for new graduates looking to apply NextGen training in a supportive environment."
    }
  ];

  const stats = [
    { number: "500+", label: "Graduates Placed" },
    { number: "95%", label: "Job Placement Rate" },
    { number: "$62K", label: "Average Starting Salary" },
    { number: "30+", label: "Partner Practices" }
  ];

  return (
    <section className="py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Who's Hiring Our Graduates
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Exclusive opportunities from our partner practice network—available only to certified graduates.
          </p>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          {jobs.map((job, index) => (
            <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {job.position}
                    </h3>
                    <p className="text-nextgen-purple font-medium">
                      {job.company}
                    </p>
                  </div>
                  <Briefcase className="h-5 w-5 text-white/40" />
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.type}
                  </div>
                </div>

                <div className="text-lg font-semibold text-white mb-3">
                  {job.salary}
                </div>

                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-nextgen-purple/20 text-nextgen-purple border-nextgen-purple/30">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="text-center">
                  <button className="w-full py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                    Apply Now
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Placement Stats */}
        <div className="bg-gradient-to-r from-nextgen-purple/10 to-nextgen-blue/10 border border-white/10 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <RainbowButton size="lg" asChild>
            <Link to="#enrollment" className="inline-flex items-center">
              Join the Academy
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </RainbowButton>
          
          <Link 
            to="/academy" 
            className="px-6 py-3 border border-white/20 bg-white/5 text-white rounded-full hover:bg-white/10 transition-colors text-center"
          >
            See Placement Network
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobBoard;
