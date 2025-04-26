
import React from 'react';
import { Calendar, TrendingUp, Handshake, GraduationCap } from 'lucide-react';
import { Agent } from '@/types/agent';
import AgentCard from './AgentCard';

const agents: Agent[] = [
  {
    name: "Miles",
    title: "AI Front Office Concierge",
    tagline: "Keeps your schedule full, your front office humming, and your patients coming back — all without lifting a finger.",
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
    tagline: "Turns leads into loyal patients by nurturing every opportunity from first click to lifelong care.",
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
    tagline: "Boosts case acceptance, financing approvals, and post-consult follow-up — helping more patients say 'yes' to better care.",
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
    tagline: "Empowers your team with onboarding checklists, training videos, and best practices — ensuring smooth growth from day one.",
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
          {agents.map((agent, index) => (
            <div 
              key={agent.name}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
            >
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
