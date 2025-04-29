
import React from 'react';
import Layout from '../components/Layout';
import CurriculumHero from '../components/academy/curriculum/CurriculumHero';
import ProgramStructure from '../components/academy/curriculum/ProgramStructure';
import TrackDetail from '../components/academy/curriculum/TrackDetail';
import LearningFeatures from '../components/academy/curriculum/LearningFeatures';
import CurriculumCTA from '../components/academy/curriculum/CurriculumCTA';
import SectionTransition from '../components/effects/SectionTransition';
import CurriculumModuleExplorer from '../components/academy/curriculum/CurriculumModuleExplorer';

const AcademyCurriculum = () => {
  const track1Modules = [
    {
      title: "Welcome to AI Dentistry",
      description: "Understand how AI is transforming the dental front office and why this shift matters now.",
      type: "Lesson"
    },
    {
      title: "Mapping the Patient Journey",
      description: "Break down every touchpoint from awareness to recall.",
      type: "Lesson"
    },
    {
      title: "Lead Conversion Systems",
      description: "Learn how Giselle automates follow-up and books leads 24/7.",
      type: "Lesson"
    },
    {
      title: "Missed Call Rescue",
      description: "Train on how Miles captures lost revenue from unanswered calls.",
      type: "Lesson"
    },
    {
      title: "Assessment: Patient Journey Strategy",
      description: "Scenario-based quiz covering automations and patient communication logic.",
      type: "Quiz"
    }
  ];
  
  const track2Modules = [
    {
      title: "Front Desk Foundations",
      description: "Structure the perfect day using blocks, buffers, and booking logic.",
      type: "Lesson"
    },
    {
      title: "Handling New Patients with Confidence",
      description: "Scripted workflows for inbound calls, pricing objections, and follow-up.",
      type: "Lesson"
    },
    {
      title: "AI-Powered Conversation Mapping",
      description: "Practice real-time messaging logic using Miles & Devon roleplay.",
      type: "Lesson"
    },
    {
      title: "Metrics That Matter",
      description: "Track conversion %, show rate, and source performance.",
      type: "Lesson"
    },
    {
      title: "Assessment: Operational Mastery",
      description: "Quiz covering SOP logic and performance benchmarks.",
      type: "Quiz"
    }
  ];
  
  const track3Modules = [
    {
      title: "The Psychology of Yes",
      description: "Understand the emotional drivers behind patient acceptance.",
      type: "Lesson"
    },
    {
      title: "The YES Framework",
      description: "Present cases using the You → Emotion → Solution model.",
      type: "Lesson"
    },
    {
      title: "Financial Conversations",
      description: "Practice pricing, insurance, and financing scripts.",
      type: "Lesson"
    },
    {
      title: "Follow-Up Protocols",
      description: "Set up Devon-led workflows that close consults asynchronously.",
      type: "Lesson"
    },
    {
      title: "Assessment: TC Roleplay Simulation",
      description: "Roleplay quiz with objections, re-engagement, and offer framing.",
      type: "Quiz"
    }
  ];
  
  const track4Modules = [
    {
      title: "Operational Leverage 101",
      description: "What scaling looks like in an AI-powered practice.",
      type: "Lesson"
    },
    {
      title: "Team Culture & Vision",
      description: "Onboarding, expectations, and mission-building systems.",
      type: "Lesson"
    },
    {
      title: "Retention & Referral Systems",
      description: "Automate recalls and loyalty campaigns.",
      type: "Lesson"
    },
    {
      title: "The NextGen Stack",
      description: "Deep dive into tools powering Miles, Giselle, Devon, and Alma.",
      type: "Lesson"
    },
    {
      title: "Final Certification Quiz",
      description: "Integrated exam across all four tracks.",
      type: "Quiz"
    }
  ];

  // Data for the accordion explorer
  const allTracks = [
    {
      id: "track1",
      title: "Track 1: AI-Powered Patient Journey Systems",
      modules: track1Modules,
      accentColor: "bg-nextgen-blue/10 border-nextgen-blue/30"
    },
    {
      id: "track2",
      title: "Track 2: Front Office & Operational Systems",
      modules: track2Modules,
      accentColor: "bg-nextgen-purple/10 border-nextgen-purple/30"
    },
    {
      id: "track3",
      title: "Track 3: Treatment Coordination Mastery",
      modules: track3Modules,
      accentColor: "bg-[#ff7e5e]/10 border-[#ff7e5e]/30"
    },
    {
      id: "track4",
      title: "Track 4: Growth-Driven Practice Leadership",
      modules: track4Modules,
      accentColor: "bg-[#62E891]/10 border-[#62E891]/30"
    }
  ];

  return (
    <Layout>
      <CurriculumHero />
      
      <ProgramStructure />
      
      <div className="relative">
        <SectionTransition type="blur" position="top" height={20} />
        <TrackDetail
          id="track1"
          title="Track 1: AI-Powered Patient Journey Systems"
          overview="Master the end-to-end patient lifecycle using automation and AI — from first touch to lifelong retention."
          modules={track1Modules}
          accentColor="bg-nextgen-blue/10 border-nextgen-blue/30"
        />
      </div>
      
      <div className="relative">
        <SectionTransition type="fade" position="top" height={20} />
        <TrackDetail
          id="track2"
          title="Track 2: Front Office & Operational Systems"
          overview="Build scalable front office systems — with SOPs, scripts, and automation-ready workflows."
          modules={track2Modules}
          accentColor="bg-nextgen-purple/10 border-nextgen-purple/30"
        />
      </div>
      
      <div className="relative">
        <SectionTransition type="fade" position="top" height={20} />
        <TrackDetail
          id="track3"
          title="Track 3: Treatment Coordination Mastery"
          overview="Guide patients from consult to case acceptance using frameworks that convert and scale."
          modules={track3Modules}
          accentColor="bg-[#ff7e5e]/10 border-[#ff7e5e]/30"
        />
      </div>
      
      <div className="relative">
        <SectionTransition type="fade" position="top" height={20} />
        <TrackDetail
          id="track4"
          title="Track 4: Growth-Driven Practice Leadership"
          overview="Lead a modern team with scalable, data-backed systems."
          modules={track4Modules}
          accentColor="bg-[#62E891]/10 border-[#62E891]/30"
        />
      </div>

      <div className="relative">
        <SectionTransition type="fade" position="top" height={20} />
        <CurriculumModuleExplorer tracks={allTracks} />
      </div>
      
      <LearningFeatures />
      
      <CurriculumCTA />
    </Layout>
  );
};

export default AcademyCurriculum;
