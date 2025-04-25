import { Calendar, Mail, MessageSquare, BookOpen } from "lucide-react";
import { Agent } from "@/types/agent";

export const agents: Agent[] = [
  {
    name: "Miles",
    title: "Head of Practice Management",
    quote: "I activate your systems and onboard every patient with ease—so nothing slips through the cracks, and your team never starts the day in chaos.",
    icon: Calendar,
    color: "blue",
    description: "Your AI practice management specialist who ensures smooth operations.",
    activities: [
      "Scheduling",
      "Intake Forms",
      "Admin Handoffs",
      "Real-Time Alerts"
    ],
    tools: [
      { name: "GoHighLevel", icon: Calendar, description: "CRM Automation" },
      { name: "Google Calendar", icon: Calendar, description: "Appointment Scheduling" },
      { name: "Slack", icon: MessageSquare, description: "Internal Notifications" },
      { name: "Jotform", icon: Mail, description: "Digital Form Creation" }
    ]
  },
  {
    name: "Giselle",
    title: "Head of Practice Growth",
    quote: "I attract the right patients and keep them engaged—from the moment they find you, to the moment they book.",
    icon: Mail,
    color: "teal",
    description: "Your AI marketing specialist focused on practice growth.",
    activities: [
      "Ad Funnels",
      "Lead Follow-Up",
      "Campaigns",
      "Referrals"
    ],
    tools: [
      { name: "Meta Ads", icon: Mail, description: "Social Media Advertising" },
      { name: "Google Ads", icon: Mail, description: "Search Advertising" },
      { name: "Typeform", icon: Mail, description: "Interactive Forms" },
      { name: "GHL", icon: Calendar, description: "Marketing Automation" }
    ]
  },
  {
    name: "Devon",
    title: "Head of Practice Development",
    quote: "I help patients convert with confidence and retain with purpose—so you're not just closing more treatment, you're building lifelong loyalty.",
    icon: MessageSquare,
    color: "purple",
    description: "Your AI engagement specialist for patient conversion and retention.",
    activities: [
      "Treatment Planning",
      "Objection Handling",
      "Financing",
      "Recall"
    ],
    tools: [
      { name: "Loom", icon: MessageSquare, description: "Video Messaging" },
      { name: "Cherry", icon: Calendar, description: "Patient Financing" },
      { name: "Stripe", icon: MessageSquare, description: "Payment Processing" },
      { name: "Podium", icon: MessageSquare, description: "Review Management" }
    ]
  },
  {
    name: "Ava",
    title: "Head of Practice Academy",
    quote: "I train your team and optimize your systems to deliver consistent, high-performance care.",
    icon: BookOpen,
    color: "gold",
    description: "Your AI analyst for team training and system optimization.",
    activities: [
      "SOPs",
      "Sales Scripting",
      "KPI Coaching",
      "Team Onboarding"
    ],
    tools: [
      { name: "Notion", icon: BookOpen, description: "Knowledge Management" },
      { name: "Airtable", icon: Calendar, description: "Process Management" },
      { name: "GHL Academy", icon: BookOpen, description: "Training Platform" },
      { name: "Google Drive", icon: Calendar, description: "Document Storage" }
    ]
  }
];
