
import React from 'react';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import AgentAvatar from '../AgentAvatar';

const SolutionsPillars = () => {
  const pillars = [
    {
      title: "Practice Management",
      subtitle: "Run Smoother. Operate Smarter.",
      agent: { name: "Miles", role: "Practice Manager", color: "red" },
      icon: Calendar,
      overview: "Streamline your operations with AI-powered scheduling, front desk automations, KPI tracking, and smart patient communications.",
      services: [
        "AI Receptionist & Scheduling Bot",
        "Missed Call Text + Voicemail Recovery",
        "Hygiene Recall Automation",
        "KPI Dashboard + Reporting",
        "Smart Staff Onboarding Systems"
      ],
      goal: "Keep your practice running like a Fortune 500 company, even if you're solo."
    },
    {
      title: "Practice Growth",
      subtitle: "Fill Your Chairs. Grow Your Revenue.",
      agent: { name: "Nova", role: "Growth Strategist", color: "green" },
      icon: TrendingUp,
      overview: "Multiply new patient leads, reactivate lost opportunities, and grow your patient base with full-funnel digital marketing.",
      services: [
        "Google Ads + Meta Ads Management",
        "Custom Funnel Builds",
        "AI Review & Referral Systems",
        "Reactivation Campaigns",
        "Internal Marketing & Referral Campaigns"
      ],
      goal: "Keep your schedule full with a predictable stream of qualified patients."
    },
    {
      title: "Practice Development",
      subtitle: "Train Your Team. Multiply Your Results.",
      agent: { name: "Devon", role: "Development Director", color: "blue" },
      icon: Users,
      overview: "Build a high-performance team trained to close treatment, reactivate patients, and grow production — without micromanagement.",
      services: [
        "Next-Gen Academy Access",
        "Treatment Coordinator Certification",
        "Sales & Closing Frameworks",
        "Reactivation Systems",
        "Leadership Playbooks"
      ],
      goal: "Turn your staff into a fully trained, high-performing growth team."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className="glass-card p-8 rounded-xl backdrop-blur-xl hover:shadow-[0_0_50px_rgba(155,135,245,0.1)] transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  <AgentAvatar 
                    name={pillar.agent.name}
                    role={pillar.agent.role}
                    color={pillar.agent.color}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
                  <p className="text-white/70">{pillar.subtitle}</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6">{pillar.overview}</p>
              
              <ul className="space-y-3 mb-6">
                {pillar.services.map((service, i) => (
                  <li key={i} className="flex items-start text-sm text-white/70">
                    <pillar.icon className="h-5 w-5 mr-3 text-nextgen-purple flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm font-medium text-white">Goal:</p>
                <p className="text-sm text-white/70">{pillar.goal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsPillars;
