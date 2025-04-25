
import React from 'react';
import { Book, Check, Calendar, Download, User } from "lucide-react";

const TrainingCard = ({ title, icon: Icon, description, className = "" }) => (
  <div className={`glass-card p-6 hover:bg-white/10 transition-all duration-300 group ${className}`}>
    <div className="rounded-lg p-3 bg-nextgen-purple/20 w-fit mb-4">
      <Icon className="h-5 w-5 text-nextgen-purple" />
    </div>
    <h3 className="text-xl font-heading font-semibold mb-3 text-white group-hover:text-nextgen-purple transition-colors">{title}</h3>
    <p className="text-white/70 text-sm">{description}</p>
  </div>
);

const WhatYouGet = () => {
  const trainingTracks = [
    {
      title: "Front Desk Systems Training",
      icon: User,
      description: "Master scheduling, call handling, and new patient conversions"
    },
    {
      title: "Treatment Coordinator Certification",
      icon: Check,
      description: "Close cases confidently with ethical, patient-centered communication"
    },
    {
      title: "Lead Nurturing Mastery",
      icon: Calendar,
      description: "Turn every inquiry into booked appointments with proven follow-up sequences"
    },
    {
      title: "Objection Handling & Closing",
      icon: Book,
      description: "Turn hesitations into scheduled treatment with real-world scripts"
    },
    {
      title: "Leadership Playbooks",
      icon: User,
      description: "Scale your practice with proven KPI, huddle, and meeting frameworks"
    },
    {
      title: "Bonus Tools + Collateral",
      icon: Download,
      description: "Access ready-to-deploy scripts, templates, and SOPs"
    },
  ];

  return (
    <section className="py-20 bg-nextgen-dark/80 relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-nextgen-purple/3 -z-10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-nextgen-blue/3 -z-10 blur-3xl rounded-full"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-gradient">
            What You'll Get
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Each course includes videos, scripts, roleplays, quizzes, and plug-and-play templates your team can implement immediately.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingTracks.map((track, index) => (
            <TrainingCard
              key={index}
              title={track.title}
              icon={track.icon}
              description={track.description}
              className={`transform transition-transform duration-300 hover:-translate-y-2`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
