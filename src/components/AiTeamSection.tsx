
import React, { useState } from 'react';
import { 
  Calendar, Mail, MessageSquare, BookOpen,
  Users
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';
import AgentAvatar from './AgentAvatar';

type Tool = {
  name: string;
  icon: React.ElementType;
  description?: string;
};

type Agent = {
  name: string;
  title: string;
  quote: string;
  icon: React.ElementType;
  description: string;
  activities: string[];
  tools: Tool[];
  color: string;
};

const agents: Agent[] = [
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

const AITeamSection = () => {
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const isMobile = useIsMobile();

  const getGradientClass = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500/20 to-blue-600/10 border-blue-500/30';
      case 'teal': return 'from-teal-500/20 to-teal-600/10 border-teal-500/30';
      case 'purple': return 'from-nextgen-purple/20 to-nextgen-purple/10 border-nextgen-purple/30';
      case 'gold': return 'from-amber-500/20 to-amber-600/10 border-amber-500/30';
      default: return 'from-nextgen-purple/20 to-nextgen-purple/10 border-nextgen-purple/30';
    }
  };

  return (
    <section id="ai-team" className="section-padding py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Users className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">AI Team</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Meet Your AI Team
          </h2>
          
          <p className="text-base sm:text-lg text-white/70 px-4">
            Each agent leads a department in your practice—working 24/7 to automate your operations, convert more cases, and retain loyal patients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {agents.map((agent, index) => (
            <div 
              key={agent.name}
              className={`glass-card rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-glow bg-gradient-to-br ${getGradientClass(agent.color)} animate-fade-in`}
              style={{ animationDelay: `${index * 200}ms` }}
              onMouseEnter={() => !isMobile && setActiveAgent(agent)}
              onMouseLeave={() => !isMobile && setActiveAgent(null)}
              onClick={() => isMobile && setActiveAgent(activeAgent?.name === agent.name ? null : agent)}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <AgentAvatar 
                    name={agent.name}
                    role={agent.title}
                    color={agent.color}
                  />
                </div>
                
                <div className="space-y-3 flex-1">
                  <div>
                    <p className="text-base sm:text-lg text-white/70 italic mb-2 text-center sm:text-left">{agent.quote}</p>
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    activeAgent?.name === agent.name ? 'max-h-[500px] opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform translate-y-4'
                  }`}>
                    <div className="pt-4 space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-white/80 mb-2">Key Activities:</h5>
                        <ul className="grid grid-cols-2 gap-2">
                          {agent.activities.map((activity, i) => (
                            <li key={i} className="flex items-center text-white/70 text-xs sm:text-sm">
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${getGradientClass(agent.color)} mr-2`}></div>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-white/80 mb-2">Tools:</h5>
                        <div className="flex flex-wrap gap-2">
                          {agent.tools.map((tool, i) => (
                            <TooltipProvider key={i}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-md">
                                    <tool.icon className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
                                    <span className="text-xs text-white/60">{tool.name}</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{tool.name} – {tool.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AITeamSection;
