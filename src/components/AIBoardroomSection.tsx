
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Magnet, DollarSign, Book } from 'lucide-react';
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
            Run Your Practice Like a CEO — Meet Your AI Executive Team
          </h2>
          <p className="text-lg text-nextgen-dark/70 dark:text-white/70 max-w-3xl mx-auto">
            Transform goals into execution instantly with the NextGen AI Boardroom™.
            Set your vision — and your AI team takes action across operations, marketing, sales, and training.
          </p>
        </div>

        {/* Chat Interaction Demo */}
        <div className="glass-card bg-white dark:bg-white/5 mb-14">
          <div className="p-6 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-nextgen-purple/10 flex items-center justify-center flex-shrink-0">
                <span className="text-nextgen-purple font-medium">CEO</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-nextgen-dark dark:text-white mb-1">You (CEO)</p>
                <p className="bg-nextgen-purple/10 dark:bg-nextgen-purple/20 p-3 rounded-lg text-nextgen-dark dark:text-white">
                  "Team, I want to add 10 new veneer cases this month."
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-white/10">
            {/* Miles Response */}
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AgentChatAvatar agent="miles" />
                </div>
                <div className="flex-1">
                  <p className="bg-blue-500/10 dark:bg-blue-500/20 p-3 rounded-lg text-nextgen-dark dark:text-white">
                    "Opening 15 additional consult slots. Front desk team alerted."
                  </p>
                </div>
              </div>
            </div>

            {/* Giselle Response */}
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AgentChatAvatar agent="giselle" />
                </div>
                <div className="flex-1">
                  <p className="bg-green-500/10 dark:bg-green-500/20 p-3 rounded-lg text-nextgen-dark dark:text-white">
                    "Launching rapid Facebook and Google campaigns. Activating daily lead nurture sequences."
                  </p>
                </div>
              </div>
            </div>

            {/* Devon Response */}
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AgentChatAvatar agent="devon" />
                </div>
                <div className="flex-1">
                  <p className="bg-purple-500/10 dark:bg-purple-500/20 p-3 rounded-lg text-nextgen-dark dark:text-white">
                    "Optimizing closing scripts for Smile Preview consultations. Reactivating abandoned veneer leads."
                  </p>
                </div>
              </div>
            </div>

            {/* Alma Response */}
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AgentChatAvatar agent="alma" />
                </div>
                <div className="flex-1">
                  <p className="bg-amber-500/10 dark:bg-amber-500/20 p-3 rounded-lg text-nextgen-dark dark:text-white">
                    "Mini-training scheduled tomorrow for front desk to promote the Smile Preview offer."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-xl font-bold text-center mb-10">How It Works (Three Steps)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-nextgen-purple flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h4 className="font-bold mb-2">Set Your Vision</h4>
              <p className="text-nextgen-dark/70 dark:text-white/70">
                Define your goal (new patients, case acceptance, reactivations).
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-nextgen-purple flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h4 className="font-bold mb-2">Command Your Boardroom</h4>
              <p className="text-nextgen-dark/70 dark:text-white/70">
                Type or speak your instruction. Your AI agents respond immediately.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-nextgen-purple flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h4 className="font-bold mb-2">Grow Effortlessly</h4>
              <p className="text-nextgen-dark/70 dark:text-white/70">
                Your AI team executes while you stay focused on leadership.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            onClick={scrollToTeam}
            className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-medium py-2 px-6 rounded-lg"
          >
            Activate Your AI Executive Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIBoardroomSection;
