import { Calendar, Mail, MessageSquare, BookOpen } from "lucide-react";
import { Agent } from "@/types/agent";

export const agents: Agent[] = [
  {
    name: "Miles",
    title: "Head of Practice Management",
    tagline: "Your automation architect for scheduling, check-ins, and performance.",
    quote: "I activate your systems and onboard every patient with ease—so nothing slips through the cracks, and your team never starts the day in chaos.",
    icon: Calendar,
    color: "red",
    description: "Your AI practice management specialist who ensures smooth operations.",
    activities: [
      "Scheduling",
      "Intake Forms",
      "Admin Handoffs",
      "Real-Time Alerts"
    ],
    features: [
      "Calendar Sync + Auto Confirmation – Prevent cancellations before they happen",
      "No-Show Rescue – Automatically rebooks missed appointments",
      "Digital Check-In Links – Sends patient forms pre-visit",
      "Front Desk AI Assistant – Handles incoming calls & messages",
      "Daily Performance Reporting – Tracks calls, bookings, and revenue"
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
    tagline: "Your marketing engine. Giselle captures leads and fills your calendar.",
    quote: "I attract the right patients and keep them engaged—from the moment they find you, to the moment they book.",
    icon: Mail,
    color: "green",
    description: "Your AI marketing specialist focused on practice growth.",
    activities: [
      "Ad Funnels",
      "Lead Follow-Up",
      "Campaigns",
      "Referrals"
    ],
    features: [
      "Lead Routing & Smart Replies – Qualifies and responds to leads instantly",
      "Follow-Up Sequences – Nurtures prospects at 1, 3, 7, 14 days",
      "Qualification Quiz – Screens patients before booking",
      "Calendar Embed with CTA – Converts leads into appointments",
      "Weekly Promo Blasts – Sends time-sensitive offers"
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
    tagline: "Your treatment closer. Devon tracks cases and drives action.",
    quote: "I help patients convert with confidence and retain with purpose—so you're not just closing more treatment, you're building lifelong loyalty.",
    icon: MessageSquare,
    color: "blue",
    description: "Your AI engagement specialist for patient conversion and retention.",
    activities: [
      "Treatment Planning",
      "Objection Handling",
      "Financing",
      "Recall"
    ],
    features: [
      "Case Pipeline Management – Tracks all open treatment plans",
      "Personalized Loom Videos – Delivers doctor-style case reviews",
      "Financial Options Bot – Explains Cherry, Proceed, and insurance",
      "3-Touch Close Sequence – Closes cases with reminder + video + follow-up",
      "Secure Deposit Page – Sends $49–$99 treatment reservation links",
      "Reactivation Offers – Brings dormant patients back"
    ],
    tools: [
      { name: "Loom", icon: MessageSquare, description: "Video Messaging" },
      { name: "Cherry", icon: Calendar, description: "Patient Financing" },
      { name: "Stripe", icon: MessageSquare, description: "Payment Processing" },
      { name: "Podium", icon: MessageSquare, description: "Review Management" }
    ]
  },
  {
    name: "Alma",
    title: "Head of Practice Academy",
    tagline: "Your training director. Alma equips your team for success.",
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
    features: [
      "Training Portal Setup – Custom onboarding for front desk, TCs, and managers",
      "SOP Builder – Centralized workflows, scripts, and policies",
      "AI Onboarding Coach – Guided training without manual oversight",
      "Certification Tracking – Monitors readiness of staff or contractors",
      "Knowledge Base + Scripts – Quick access to replies and workflows"
    ],
    tools: [
      { name: "Notion", icon: BookOpen, description: "Knowledge Management" },
      { name: "Airtable", icon: Calendar, description: "Process Management" },
      { name: "GHL Academy", icon: BookOpen, description: "Training Platform" },
      { name: "Google Drive", icon: Calendar, description: "Document Storage" }
    ]
  }
];
