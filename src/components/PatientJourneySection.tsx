
import React from 'react';
import { ArrowRight, Calendar, MessageSquare, Facebook } from "lucide-react";

const stages = [
  {
    name: "Attract & Engage",
    agent: "Giselle",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/5",
    activities: ["Ads", "Quizzes", "Lead Follow-up", "Referrals"],
    tools: ["Meta", "Typeform", "GHL"],
    solves: "Low lead conversion"
  },
  {
    name: "Activate & Onboard",
    agent: "Miles",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/5",
    activities: ["Intake Forms", "Check-in", "Admin Handoff"],
    tools: ["GHL Forms", "Slack", "Google Calendar"],
    solves: "Front desk inefficiency"
  },
  {
    name: "Convert & Retain",
    agent: "Devon",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/5",
    activities: ["Treatment Planning", "Financing", "Recall"],
    tools: ["Loom", "Cherry", "Podium", "Stripe"],
    solves: "Lost revenue, poor retention"
  }
];

const PatientJourneySection = () => {
  return (
    <section id="patient-journey" className="section-padding py-20 bg-gradient-to-b from-nextgen-dark to-nextgen-dark/95">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <ArrowRight className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">Patient Journey</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            How the System Works
          </h2>
          
          <p className="text-lg text-white/70">
            From first click to lifelong care—your AI team manages every stage of the patient lifecycle.
          </p>
        </div>
        
        <div className="relative mt-20">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-20 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {stages.map((stage, index) => (
              <div 
                key={stage.name} 
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                {/* Stage Indicator */}
                <div className="hidden md:flex absolute -top-20 left-1/2 transform -translate-x-1/2">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center`}>
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                </div>
                
                <div className={`glass-card h-full p-6 md:pt-14 ${stage.bgColor} backdrop-blur-xl`}>
                  <div className="md:hidden flex items-center mb-4">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center mr-3`}>
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gradient">{stage.name}</h3>
                  </div>
                  
                  <h3 className="hidden md:block text-xl font-heading font-semibold text-gradient mb-2">{stage.name}</h3>
                  
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-4">
                    Managed by <span className="text-white font-medium">{stage.agent}</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm text-white/60 mb-1">Key Activities:</h4>
                    <ul className="space-y-1">
                      {stage.activities.map((activity, i) => (
                        <li key={i} className="flex items-center text-white/80 text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${stage.color} mr-2`}></div>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm text-white/60 mb-1">Tools Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {stage.tools.map((tool, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded-md text-white/70">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-white/60 mb-1">What It Solves:</h4>
                    <p className="text-sm text-white/80">{stage.solves}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientJourneySection;
