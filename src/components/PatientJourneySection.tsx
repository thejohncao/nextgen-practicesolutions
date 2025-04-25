
import React from 'react';
import { ArrowRight } from "lucide-react";

const stages = [
  {
    name: "Attract & Engage",
    agent: "Giselle",
    color: "from-green-500 to-green-600",
    actions: [
      "Generate online leads",
      "Manage social media",
      "Run targeted ads",
      "Increase website traffic",
      "Boost online reviews"
    ]
  },
  {
    name: "Activate & Onboard",
    agent: "Miles",
    color: "from-blue-500 to-blue-600",
    actions: [
      "Schedule appointments",
      "Send reminders",
      "Verify insurance",
      "Complete paperwork",
      "Welcome new patients"
    ]
  },
  {
    name: "Convert & Retain",
    agent: "Devon",
    color: "from-purple-500 to-purple-600",
    actions: [
      "Follow-up on treatment",
      "Send educational content",
      "Reactivate dormant patients",
      "Build long-term relationships",
      "Generate referrals"
    ]
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
            The Complete Patient Journey
          </h2>
          
          <p className="text-lg text-white/70">
            Our AI team manages every stage of the patient lifecycle, creating a seamless experience
            that converts inquiries into lifelong patients.
          </p>
        </div>
        
        <div className="relative mt-20">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-20 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {stages.map((stage, index) => (
              <div key={stage.name} className="relative">
                {/* Stage Indicator */}
                <div className="hidden md:flex absolute -top-20 left-1/2 transform -translate-x-1/2">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center`}>
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                </div>
                
                <div className="glass-card h-full p-6 md:pt-14">
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
                  
                  <ul className="space-y-2">
                    {stage.actions.map((action, i) => (
                      <li key={i} className="flex items-center text-white/70 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${stage.color} mr-2`}></div>
                        {action}
                      </li>
                    ))}
                  </ul>
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
