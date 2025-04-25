
import React, { useState } from 'react';
import { 
  Calendar, Mail, MessageSquare, BookOpen,
  Users, Calendar as GoogleCalendar, MessageCircle as Slack, Type,
  Facebook as MetaIcon, Mail as GoogleAds, Type as TypeformIcon,
  MessageSquare as LoomIcon, Calendar as CherryIcon, MessageCircle as StripeIcon, MessageSquare as PodiumIcon,
  BookOpen as NotionIcon, Calendar as AirtableIcon, Calendar as GoogleDriveIcon
} from "lucide-react";

type Tool = {
  name: string;
  icon: React.ElementType;
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
    color: "from-blue-500 to-blue-600",
    description: "Your AI practice management specialist who ensures smooth operations.",
    activities: [
      "Scheduling",
      "Intake Forms",
      "Admin Handoffs",
      "Real-Time Alerts"
    ],
    tools: [
      { name: "GoHighLevel", icon: Calendar },
      { name: "Google Calendar", icon: GoogleCalendar },
      { name: "Slack", icon: Slack },
      { name: "Jotform", icon: Type }
    ]
  },
  {
    name: "Giselle",
    title: "Head of Practice Growth",
    quote: "I attract the right patients and keep them engaged—from the moment they find you, to the moment they book.",
    icon: Mail,
    color: "from-green-500 to-green-600",
    description: "Your AI marketing specialist focused on practice growth.",
    activities: [
      "Ad Funnels",
      "Lead Follow-Up",
      "Campaigns",
      "Referrals"
    ],
    tools: [
      { name: "Meta Ads", icon: MetaIcon },
      { name: "Google Ads", icon: GoogleAds },
      { name: "Typeform", icon: TypeformIcon },
      { name: "GHL", icon: Calendar }
    ]
  },
  {
    name: "Devon",
    title: "Head of Practice Development",
    quote: "I help patients convert with confidence and retain with purpose—so you're not just closing more treatment, you're building lifelong loyalty.",
    icon: MessageSquare,
    color: "from-purple-500 to-purple-600",
    description: "Your AI engagement specialist for patient conversion and retention.",
    activities: [
      "Treatment Planning",
      "Objection Handling",
      "Financing",
      "Recall"
    ],
    tools: [
      { name: "Loom", icon: LoomIcon },
      { name: "Cherry", icon: CherryIcon },
      { name: "Stripe", icon: StripeIcon },
      { name: "Podium", icon: PodiumIcon }
    ]
  },
  {
    name: "Ava",
    title: "Head of Practice Academy",
    quote: "I train your team and optimize your systems to deliver consistent, high-performance care.",
    icon: BookOpen,
    color: "from-amber-500 to-amber-600",
    description: "Your AI analyst for team training and system optimization.",
    activities: [
      "SOPs",
      "Sales Scripting",
      "KPI Coaching",
      "Team Onboarding"
    ],
    tools: [
      { name: "Notion", icon: NotionIcon },
      { name: "Airtable", icon: AirtableIcon },
      { name: "GHL Academy", icon: BookOpen },
      { name: "Google Drive", icon: GoogleDriveIcon }
    ]
  }
];

const AITeamSection = () => {
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);

  return (
    <section id="ai-team" className="section-padding py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Users className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">AI Team</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Meet Your New AI Team Members
          </h2>
          
          <p className="text-lg text-white/70">
            Our AI agents work together to handle critical aspects of your practice operations,
            freeing your staff to focus on what matters most.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <div 
                key={agent.name}
                className="glass-card rounded-xl p-6 transition-all duration-300 hover:bg-white/10 cursor-pointer group"
                onMouseEnter={() => setActiveAgent(agent)}
                onMouseLeave={() => setActiveAgent(null)}
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg p-3 bg-gradient-to-br ${agent.color} flex-shrink-0`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xl font-heading font-semibold text-white flex items-center gap-2">
                      {agent.name}
                      <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/60">
                        {agent.title}
                      </span>
                    </h4>
                    
                    <p className="text-white/70 italic">{agent.quote}</p>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${
                      activeAgent?.name === agent.name ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-4 space-y-4">
                        <div>
                          <h5 className="text-sm font-medium text-white/80 mb-2">Key Activities:</h5>
                          <ul className="grid grid-cols-2 gap-2">
                            {agent.activities.map((activity, i) => (
                              <li key={i} className="flex items-center text-white/70 text-sm">
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${agent.color} mr-2`}></div>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-white/80 mb-2">Tools:</h5>
                          <div className="flex flex-wrap gap-2">
                            {agent.tools.map((tool, i) => (
                              <div key={i} className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-md">
                                <tool.icon className="h-4 w-4 text-white/60" />
                                <span className="text-xs text-white/60">{tool.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AITeamSection;
