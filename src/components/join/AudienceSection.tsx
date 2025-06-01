
import React from 'react';
import { Stethoscope, GraduationCap, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AudienceSection = () => {
  const audiences = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "Doctors & Owners",
      description: "Hire certified front office pros, increase treatment acceptance, reduce overhead.",
      benefits: [
        "Ready-to-hire certified staff",
        "Proven revenue growth systems",
        "Reduced training overhead"
      ],
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Current Coordinators",
      description: "Upskill in financing, case presentation, and leadership.",
      benefits: [
        "Advanced financing expertise",
        "Leadership development",
        "Career advancement opportunities"
      ],
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Aspiring Dental Professionals",
      description: "Start a new career with job-ready training and placement support.",
      benefits: [
        "No experience required",
        "Job placement assistance",
        "Industry-recognized certification"
      ],
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <section className="py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Who We Help
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Whether you're hiring, growing, or starting your dental career—we have the right path for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {audiences.map((audience, index) => (
            <Card key={index} className="glass-card h-full hover:shadow-lg transition-all duration-300 group hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${audience.bgColor} mb-6 group-hover:scale-110 transition-transform ${audience.color}`}>
                  {audience.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {audience.title}
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  {audience.description}
                </p>
                <ul className="space-y-2 text-sm text-white/60">
                  {audience.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${audience.color.replace('text-', 'bg-')}`}></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
