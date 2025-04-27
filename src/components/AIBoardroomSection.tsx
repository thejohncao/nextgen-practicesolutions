
import React from 'react';
import { Button } from '@/components/ui/button';
import AgentChatAvatar from './AgentChatAvatar';

const AIBoardroomSection = () => {
  const scrollToTeam = () => {
    const teamSection = document.getElementById('ai-team');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="ai-boardroom" className="section-padding py-20 bg-[#F1F3F6] dark:bg-nextgen-dark/70">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-nextgen-dark dark:text-white">
            Lead Your Practice Like a CEO — Instantly
          </h2>
          <p className="text-lg text-nextgen-dark/70 dark:text-white/70 max-w-3xl mx-auto">
            The NextGen AI Boardroom™ turns your practice into a command center.
            Set your goal — your AI Executive Team plans, launches, and grows your practice automatically.
          </p>
        </div>

        {/* Chat Interaction Demo */}
        <div className="glass-card bg-white dark:bg-white/5 mb-14">
          {/* CEO Message */}
          <div className="p-6 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-start space-x-4 justify-end">
              <div className="flex-1 max-w-[80%]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-nextgen-purple/10 flex items-center justify-center text-xs">
                    <span className="text-nextgen-purple font-medium">CEO</span>
                  </div>
                  <span className="text-sm text-nextgen-dark/60 dark:text-white/60">You</span>
                </div>
                <p className="bg-nextgen-purple/10 dark:bg-nextgen-purple/20 p-4 rounded-2xl text-nextgen-dark dark:text-white">
                  "Team, I want to add 10 new veneer cases this month."
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-white/10 space-y-8">
            {/* AI Agent Responses */}
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AgentChatAvatar agent="miles" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-nextgen-dark/60 dark:text-white/60 mb-1 block">Practice Management</span>
                  <p className="bg-blue-500/10 dark:bg-blue-500/20 p-4 rounded-2xl text-nextgen-dark dark:text-white">
                    "Opening 15 additional consult slots. Front desk team prepared."
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AgentChatAvatar agent="giselle" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-nextgen-dark/60 dark:text-white/60 mb-1 block">Patient Acquisition</span>
                  <p className="bg-green-500/10 dark:bg-green-500/20 p-4 rounded-2xl text-nextgen-dark dark:text-white">
                    "Launching rapid Facebook and Google Ads campaigns. Activating lead nurturing sequences."
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AgentChatAvatar agent="devon" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-nextgen-dark/60 dark:text-white/60 mb-1 block">Treatment Acceptance</span>
                  <p className="bg-purple-500/10 dark:bg-purple-500/20 p-4 rounded-2xl text-nextgen-dark dark:text-white">
                    "Optimizing closing scripts for Smile Preview consultations. Reactivating abandoned veneer leads."
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AgentChatAvatar agent="alma" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-nextgen-dark/60 dark:text-white/60 mb-1 block">Training & SOP Management</span>
                  <p className="bg-amber-500/10 dark:bg-amber-500/20 p-4 rounded-2xl text-nextgen-dark dark:text-white">
                    "Mini-training scheduled tomorrow to coach front desk on the Smile Preview pitch."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            onClick={scrollToTeam}
            className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-medium py-3 px-8 rounded-lg text-lg"
          >
            Activate Your AI Boardroom™
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIBoardroomSection;
