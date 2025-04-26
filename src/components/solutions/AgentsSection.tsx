
import React from 'react';
import { Calendar, MessageSquare, Headphones, TrendingUp, BarChart, DollarSign, Handshake, ClipboardCheck, ClipboardList, GraduationCap, Play, CheckSquare } from 'lucide-react';
import AgentCard from './AgentCard';

const agents = [
  {
    name: "Miles",
    title: "AI Front Office Concierge",
    description: "Miles keeps your schedule full, your front office humming, and your patients coming back — all without lifting a finger.",
    icon: Calendar,
    color: "blue",
    features: [
      "Smart Calendar Automation",
      "AI Receptionist Bot",
      "Recall and Reactivation Engine",
      "New Patient Digital Intake Forms",
      "Live Two-Way Patient Messaging",
      "No-Show Rescue Automations",
      "Daily Operational KPI Dashboards"
    ]
  },
  {
    name: "Giselle",
    title: "AI Lead Nurturer",
    description: "Giselle turns leads into loyal patients by nurturing every opportunity from first click to lifelong care.",
    icon: TrendingUp,
    color: "green",
    features: [
      "Lead Capture Funnels",
      "Automated Follow-Up Sequences",
      "Patient Reactivation Campaigns",
      "Referral Growth Engine",
      "Paid Ads Lead Pipeline Integrations",
      "Membership Growth Automation"
    ]
  },
  {
    name: "Devon",
    title: "AI Treatment Closer",
    description: "Devon boosts case acceptance, financing approvals, and post-consult follow-up — helping more patients say 'yes' to better care.",
    icon: Handshake,
    color: "purple",
    features: [
      "Consultation Day Prep Automation",
      "Financing Offer Integrations",
      "Post-Consult Follow-Up Campaigns",
      "Abandoned Treatment Reactivation",
      "Membership Retention Automations",
      "Patient Education Drip Campaigns"
    ]
  },
  {
    name: "Alma",
    title: "AI Training Assistant",
    description: "Alma empowers your team with onboarding checklists, training videos, and best practices — ensuring smooth growth from day one.",
    icon: GraduationCap,
    color: "red",
    features: [
      "New Hire Onboarding Checklists",
      "SOP Library Access",
      "Training Video Portal",
      "Continuing Education Reminders",
      "Front Desk Communication Scripts",
      "Best Practices Playbooks"
    ]
  }
];

const AgentsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agents.map((agent) => (
            <AgentCard key={agent.name} {...agent} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
