
import React, { useRef } from 'react';
import { User, UserPlus, BarChart3, GraduationCap } from 'lucide-react';
import StickyScroll from '../motion/StickyScroll';
import { agents } from '@/data/agents';
import AgentAvatar from '../AgentAvatar';
import PatientJourneyTimeline from '../journey/PatientJourneyTimeline';
import HeroVerticalChatPreview from '../hero/HeroVerticalChatPreview';

const DemoStickyScroll = () => {
  // Reference to the team section
  const teamSectionRef = useRef<HTMLDivElement>(null);
  
  // Handle click on the "Meet Your AI Team" button
  const handleTeamButtonClick = () => {
    // Find the team section in the document and scroll to it
    const teamSection = document.getElementById('team');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      <div className="container mx-auto px-4 py-12">
        {/* Hero Vertical Chat Preview */}
        <HeroVerticalChatPreview onTeamButtonClick={handleTeamButtonClick} />
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
