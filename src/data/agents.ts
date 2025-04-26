
import { Calendar, MessageCircle, Headset, ChartLine, Funnel, DollarSign, Handshake, Check, Clipboard, GraduationCap, Play, ListCheck } from 'lucide-react';
import { Agent } from '@/types/agent';

export const agents: Agent[] = [
  {
    name: "Miles",
    title: "AI Front Office Concierge",
    tagline: "Keeps your schedule full, your front office humming, and your patients coming back — all without lifting a finger.",
    color: "blue",
    icon: Calendar,
    description: "Your AI practice management specialist who ensures smooth operations.",
    activities: [
      "Scheduling",
      "Intake Forms",
      "Admin Handoffs",
      "Real-Time Alerts"
    ],
    features: [
      "Smart Calendar Automation - Fill scheduling gaps automatically and keep your calendar optimized",
      "AI Receptionist Bot - Handle calls, texts, and scheduling conversations without human intervention",
      "Recall and Reactivation Engine - Bring back overdue and inactive patients automatically",
      "New Patient Digital Intake Forms - Streamline patient onboarding with customizable digital forms",
      "Live Two-Way Patient Messaging - Communicate instantly with patients via SMS and email from one dashboard",
      "No-Show Rescue Automations - Reach out automatically after missed appointments to rebook quickly",
      "Daily Operational KPI Dashboards - Track front office performance with real-time analytics"
    ],
    tools: [
      { name: "Calendar", icon: Calendar, description: "Smart Scheduling" },
      { name: "Messaging", icon: MessageCircle, description: "Patient Communication" },
      { name: "Support", icon: Headset, description: "24/7 AI Reception" },
      { name: "Analytics", icon: ChartLine, description: "Performance Tracking" }
    ]
  },
  {
    name: "Giselle",
    title: "AI Lead Nurturer",
    tagline: "Turns leads into loyal patients by nurturing every opportunity from first click to lifelong care.",
    color: "green",
    icon: Funnel,
    description: "Your AI growth specialist focused on attracting and converting new patients.",
    activities: [
      "Lead Generation",
      "Follow-ups",
      "Reactivation",
      "Referrals"
    ],
    features: [
      "Lead Capture Funnels - Automate lead generation with customizable funnels for every campaign",
      "Automated Follow-Up Sequences - Nurture leads across email, SMS, and voice without manual effort",
      "Patient Reactivation Campaigns - Re-engage past patients and missed opportunities with personalized outreach",
      "Referral Growth Engine - Encourage existing patients to bring in new ones through automated referral prompts",
      "Paid Ads Lead Pipeline Integrations - Capture and nurture leads from Facebook, Google, and Instagram ads automatically",
      "Membership Growth Automation - Sell and manage in-house membership plans without the paperwork"
    ],
    tools: [
      { name: "Funnels", icon: Funnel, description: "Lead Generation" },
      { name: "Growth", icon: ChartLine, description: "Growth Analytics" },
      { name: "Payments", icon: DollarSign, description: "Payment Processing" },
      { name: "Partnerships", icon: Handshake, description: "Referral System" }
    ]
  },
  {
    name: "Devon",
    title: "AI Treatment Closer",
    tagline: "Boosts case acceptance, financing approvals, and post-consult follow-up — helping more patients say 'yes' to better care.",
    color: "purple",
    icon: Handshake,
    description: "Your AI treatment acceptance specialist who helps convert consultations into care.",
    activities: [
      "Treatment Planning",
      "Case Acceptance",
      "Financing",
      "Education"
    ],
    features: [
      "Consultation Day Prep Automation - Prepare patients for treatment presentations with reminders and educational content",
      "Financing Offer Integrations - Show financing options automatically and increase case acceptance rates",
      "Post-Consult Follow-Up Campaigns - Send personalized follow-ups after every treatment consultation",
      "Abandoned Treatment Reactivation - Rescue unclosed treatment plans with targeted reactivation campaigns",
      "Membership Retention Automations - Keep members active and renewing with proactive engagement sequences",
      "Patient Education Drip Campaigns - Educate patients over time about their treatment needs, increasing acceptance"
    ],
    tools: [
      { name: "Planning", icon: Clipboard, description: "Treatment Planning" },
      { name: "Verify", icon: Check, description: "Acceptance Tracking" },
      { name: "Finance", icon: DollarSign, description: "Payment Options" },
      { name: "Education", icon: Play, description: "Patient Education" }
    ]
  },
  {
    name: "Alma",
    title: "AI Training Assistant",
    tagline: "Empowers your team with onboarding checklists, training videos, and best practices — ensuring smooth growth from day one.",
    color: "gold",
    icon: GraduationCap,
    description: "Your AI training director who ensures consistent, high-quality care delivery.",
    activities: [
      "Onboarding",
      "Training",
      "Compliance",
      "Best Practices"
    ],
    features: [
      "New Hire Onboarding Checklists - Streamline employee onboarding with step-by-step task management",
      "SOP Library Access - Give your team instant access to updated office protocols and playbooks",
      "Training Video Portal - Centralize video training for consistent, scalable education",
      "Continuing Education Reminders - Automatically remind team members to complete required CE credits",
      "Front Desk Communication Scripts - Equip your team with proven scripts for handling calls, objections, and scheduling",
      "Best Practices Playbooks - Offer reference guides for daily operations, emergencies, and patient experience"
    ],
    tools: [
      { name: "Education", icon: GraduationCap, description: "Team Training" },
      { name: "Tasks", icon: ListCheck, description: "Onboarding Tasks" },
      { name: "Library", icon: Clipboard, description: "SOP Library" },
      { name: "Support", icon: Headset, description: "24/7 Support" }
    ]
  }
];
