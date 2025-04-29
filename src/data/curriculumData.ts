
import { type Module } from "../components/academy/curriculum/TrackDetail";

// This represents the raw JSON structure for curriculum data
interface RawCurriculumData {
  [trackName: string]: {
    module_number: number;
    title: string;
    description: string;
    type: string;
  }[];
}

// Track overviews aren't in the JSON, so we maintain them separately
const trackOverviews: Record<string, string> = {
  "AI-Powered Patient Journey Systems": 
    "Master the end-to-end patient lifecycle using automation and AI — from first touch to lifelong retention.",
  "Front Office & Operational Systems": 
    "Build scalable front office systems — with SOPs, scripts, and automation-ready workflows.",
  "Treatment Coordination Mastery": 
    "Guide patients from consult to case acceptance using frameworks that convert and scale.",
  "Growth-Driven Practice Leadership": 
    "Lead a modern team with scalable, data-backed systems."
};

// Color mappings for tracks
const trackColors: Record<string, string> = {
  "AI-Powered Patient Journey Systems": "bg-nextgen-blue/10 border-nextgen-blue/30",
  "Front Office & Operational Systems": "bg-nextgen-purple/10 border-nextgen-purple/30",
  "Treatment Coordination Mastery": "bg-[#ff7e5e]/10 border-[#ff7e5e]/30",
  "Growth-Driven Practice Leadership": "bg-[#62E891]/10 border-[#62E891]/30"
};

// Raw curriculum data as would be imported from JSON
const rawCurriculumData: RawCurriculumData = {
  "AI-Powered Patient Journey Systems": [
    {
      module_number: 1,
      title: "Welcome to AI Dentistry",
      description: "Understand how AI is transforming the dental front office and why this shift matters now.",
      type: "Lesson"
    },
    {
      module_number: 2,
      title: "Mapping the Patient Journey",
      description: "Break down every touchpoint from awareness to recall.",
      type: "Lesson"
    },
    {
      module_number: 3,
      title: "Lead Conversion Systems",
      description: "Learn how Giselle automates follow-up and books leads 24/7.",
      type: "Lesson"
    },
    {
      module_number: 4,
      title: "Missed Call Rescue",
      description: "Train on how Miles captures lost revenue from unanswered calls.",
      type: "Lesson"
    },
    {
      module_number: 5,
      title: "Assessment: Patient Journey Strategy",
      description: "Scenario-based quiz covering automations and patient communication logic.",
      type: "Quiz"
    }
  ],
  "Front Office & Operational Systems": [
    {
      module_number: 1,
      title: "Front Desk Foundations",
      description: "Structure the perfect day using blocks, buffers, and booking logic.",
      type: "Lesson"
    },
    {
      module_number: 2,
      title: "Handling New Patients with Confidence",
      description: "Scripted workflows for inbound calls, pricing objections, and follow-up.",
      type: "Lesson"
    },
    {
      module_number: 3,
      title: "AI-Powered Conversation Mapping",
      description: "Practice real-time messaging logic using Miles & Devon roleplay.",
      type: "Lesson"
    },
    {
      module_number: 4,
      title: "Metrics That Matter",
      description: "Track conversion %, show rate, and source performance.",
      type: "Lesson"
    },
    {
      module_number: 5,
      title: "Assessment: Operational Mastery",
      description: "Quiz covering SOP logic and performance benchmarks.",
      type: "Quiz"
    }
  ],
  "Treatment Coordination Mastery": [
    {
      module_number: 1,
      title: "The Psychology of Yes",
      description: "Understand the emotional drivers behind patient acceptance.",
      type: "Lesson"
    },
    {
      module_number: 2,
      title: "The YES Framework",
      description: "Present cases using the You → Emotion → Solution model.",
      type: "Lesson"
    },
    {
      module_number: 3,
      title: "Financial Conversations",
      description: "Practice pricing, insurance, and financing scripts.",
      type: "Lesson"
    },
    {
      module_number: 4,
      title: "Follow-Up Protocols",
      description: "Set up Devon-led workflows that close consults asynchronously.",
      type: "Lesson"
    },
    {
      module_number: 5,
      title: "Assessment: TC Roleplay Simulation",
      description: "Roleplay quiz with objections, re-engagement, and offer framing.",
      type: "Quiz"
    }
  ],
  "Growth-Driven Practice Leadership": [
    {
      module_number: 1,
      title: "Operational Leverage 101",
      description: "What scaling looks like in an AI-powered practice.",
      type: "Lesson"
    },
    {
      module_number: 2,
      title: "Team Culture & Vision",
      description: "Onboarding, expectations, and mission-building systems.",
      type: "Lesson"
    },
    {
      module_number: 3,
      title: "Retention & Referral Systems",
      description: "Automate recalls and loyalty campaigns.",
      type: "Lesson"
    },
    {
      module_number: 4,
      title: "The NextGen Stack",
      description: "Deep dive into tools powering Miles, Giselle, Devon, and Alma.",
      type: "Lesson"
    },
    {
      module_number: 5,
      title: "Final Certification Quiz",
      description: "Integrated exam across all four tracks.",
      type: "Quiz"
    }
  ]
};

// Transform the raw data into the format expected by our components
export interface TrackData {
  id: string;
  title: string;
  overview: string;
  modules: Module[];
  accentColor: string;
}

export const transformCurriculumData = (): TrackData[] => {
  return Object.entries(rawCurriculumData).map(([trackName, modules], index) => {
    const trackNumber = index + 1;
    const id = `track${trackNumber}`;
    const title = `Track ${trackNumber}: ${trackName}`;
    
    return {
      id,
      title,
      overview: trackOverviews[trackName] || "",
      modules: modules.map(module => ({
        title: module.title,
        description: module.description,
        type: module.type,
        number: module.module_number
      })),
      accentColor: trackColors[trackName] || ""
    };
  });
};

// Export the transformed data for use in components
export const curriculumTracks = transformCurriculumData();
