
import React from 'react';
import { User, UserPlus, BarChart3, GraduationCap } from 'lucide-react';
import StickyScroll from '../motion/StickyScroll';
import { agents } from '@/data/agents';
import AgentAvatar from '../AgentAvatar';
import PatientJourneyTimeline from '../journey/PatientJourneyTimeline';

const DemoStickyScroll = () => {
  // Demo items based on the patient journey stages
  const demoItems = [
    {
      title: "Attract & Engage",
      description: "Your AI Growth Agent launches, nurtures, and books leads 24/7 — no human chasing required.",
      stageLabel: "Stage 1",
      agent: "Giselle",
      agentRole: "Growth Strategist",
      agentColor: "green",
      icon: <UserPlus className="h-6 w-6 text-green-500" />
    },
    {
      title: "Onboard & Convert",
      description: "Your AI Front Desk books, confirms, reschedules, and answers patient FAQs across text, chat, and calls.",
      stageLabel: "Stage 2",
      agent: "Miles", 
      agentRole: "Practice Manager",
      agentColor: "blue",
      icon: <User className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Retain & Grow",
      description: "Your AI Treatment Closer reactivates unscheduled cases and increases case acceptance — automatically.",
      stageLabel: "Stage 3", 
      agent: "Devon",
      agentRole: "Patient Experience Coach",
      agentColor: "purple",
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />
    },
    {
      title: "Train & Scale",
      description: "Your AI Academy Assistant trains your real team with SOPs, scripts, and AI support — so you can scale.",
      stageLabel: "Stage 4",
      agent: "Alma",
      agentRole: "Academy Director",
      agentColor: "gold", 
      icon: <GraduationCap className="h-6 w-6 text-amber-500" />
    }
  ];

  return (
    <section id="demo" className="bg-nextgen-dark">
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gradient">
          Built to Run the Full Patient Journey
        </h2>
        <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">
          Your all-in-one AI team, trained to run your practice from first click to lifetime loyalty.
        </p>
      </div>

      {/* Replace StickyScroll with the PatientJourneyTimeline component */}
      <PatientJourneyTimeline />
      
      <div className="container mx-auto px-4 py-12 text-center">
        <a href="#team" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <span>Meet Your AI Team</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default DemoStickyScroll;
