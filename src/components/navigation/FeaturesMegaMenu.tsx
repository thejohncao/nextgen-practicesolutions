
import React from 'react';
import { BarChart3, Calendar, MessageSquare, Users, TrendingUp, FileText, ZapIcon, Rocket, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const automationFeatures = [
  {
    title: "Smart Calendar Automation",
    description: "Auto-fill your schedule and maximize production",
    icon: Calendar
  },
  {
    title: "AI Receptionist Bot",
    description: "24/7 intelligent patient communication",
    icon: MessageSquare
  },
  {
    title: "Recall and Reactivation Engine",
    description: "Bring back dormant patients automatically",
    icon: Rocket
  },
  {
    title: "New Patient Digital Intake Forms",
    description: "Streamline your patient onboarding process",
    icon: FileText
  },
  {
    title: "Two-Way Patient Messaging",
    description: "Seamless patient communication platform",
    icon: MessageSquare
  },
  {
    title: "No-Show Rescue Automations",
    description: "Recover lost appointments instantly",
    icon: Shield
  },
  {
    title: "Daily Operational KPI Dashboards",
    description: "Track your practice performance in real-time",
    icon: BarChart3
  }
];

const growthFeatures = [
  {
    title: "Lead Capture Funnels",
    description: "Convert website visitors into patients",
    icon: Users
  },
  {
    title: "Automated Follow-Up Sequences",
    description: "Never miss a follow-up opportunity",
    icon: ZapIcon
  },
  {
    title: "Membership Growth Automation",
    description: "Scale your membership program effortlessly",
    icon: TrendingUp
  },
  {
    title: "Consultation Day Prep Automation",
    description: "Perfect preparation for every consultation",
    icon: Calendar
  },
  {
    title: "Financing Offer Integrations",
    description: "Seamless payment solutions for patients",
    icon: FileText
  },
  {
    title: "Post-Consult Follow-Up Campaigns",
    description: "Nurture leads after consultations",
    icon: MessageSquare
  }
];

const FeaturesMegaMenu = () => {
  return (
    <div className="fixed left-0 right-0 top-16 z-50 animate-fade-in-up">
      <div className="mx-auto max-w-[800px] px-4">
        <div className="overflow-hidden rounded-xl bg-[rgba(17,19,33,0.98)] backdrop-blur-md shadow-[0_15px_40px_-15px_rgba(0,0,0,0.3)] border border-white/[0.03]">
          <div className="p-6 md:p-8">
            <p className="text-sm text-white/60 mb-6">
              Explore the full suite of AI-powered tools designed to automate, grow, and optimize your practice operations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.04]">
              {/* Automation Features Column */}
              <div className="space-y-6 md:pr-8">
                <h3 className="font-heading text-lg font-semibold text-white/90">
                  Automation Features
                </h3>
                <div className="space-y-5">
                  {automationFeatures.map((feature) => (
                    <a 
                      key={feature.title}
                      href={`/features#${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group flex items-start gap-4 transition-all duration-200 hover:translate-x-1"
                    >
                      <div className={cn(
                        "mt-1 rounded-lg p-2 transition-colors",
                        "bg-white/5 group-hover:bg-white/10"
                      )}>
                        <feature.icon className="h-5 w-5 text-nextgen-purple" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                          {feature.title}
                        </h4>
                        <p className="mt-1 text-sm text-white/60 group-hover:text-white/70 transition-colors">
                          {feature.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Growth Features Column */}
              <div className="space-y-6 pt-6 md:pt-0 md:pl-8">
                <h3 className="font-heading text-lg font-semibold text-white/90">
                  Practice Growth Features
                </h3>
                <div className="space-y-5">
                  {growthFeatures.map((feature) => (
                    <a 
                      key={feature.title}
                      href={`/features#${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group flex items-start gap-4 transition-all duration-200 hover:translate-x-1"
                    >
                      <div className={cn(
                        "mt-1 rounded-lg p-2 transition-colors",
                        "bg-white/5 group-hover:bg-white/10"
                      )}>
                        <feature.icon className="h-5 w-5 text-nextgen-purple" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
                          {feature.title}
                        </h4>
                        <p className="mt-1 text-sm text-white/60 group-hover:text-white/70 transition-colors">
                          {feature.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesMegaMenu;
