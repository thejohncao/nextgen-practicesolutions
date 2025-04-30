
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { agents } from '@/data/agents';
import AgentChatAvatar from '@/components/AgentChatAvatar';

const JourneyComparison = () => {
  const manualSteps = [
    { 
      id: 1, 
      text: 'Patient submits form', 
      icon: '📝',
      iconBg: 'bg-gray-500/30'
    },
    { 
      id: 2, 
      text: 'Receptionist calls back 24 hours later (missed)', 
      icon: '📞',
      iconBg: 'bg-red-500/30',
      isNegative: true
    },
    { 
      id: 3, 
      text: 'No-show for consult', 
      icon: '❌',
      iconBg: 'bg-red-500/30',
      isNegative: true
    },
    { 
      id: 4, 
      text: 'Treatment plan goes cold', 
      icon: '🥶',
      iconBg: 'bg-red-500/30',
      isNegative: true
    },
    { 
      id: 5, 
      text: 'Staff forgets to follow up', 
      icon: '🤷',
      iconBg: 'bg-red-500/30',
      isNegative: true
    },
  ];

  const aiSteps = [
    { 
      id: 1, 
      text: 'Lead submits form → Giselle texts instantly', 
      agent: 'giselle',
      iconBg: 'bg-green-500/30'
    },
    { 
      id: 2, 
      text: 'Patient completes quiz → Books via Miles', 
      agent: 'miles',
      iconBg: 'bg-blue-500/30'
    },
    { 
      id: 3, 
      text: 'Miles confirms & reminds consult', 
      agent: 'miles',
      iconBg: 'bg-blue-500/30'
    },
    { 
      id: 4, 
      text: 'Devon follows up on presented treatment', 
      agent: 'devon',
      iconBg: 'bg-purple-500/30'
    },
    { 
      id: 5, 
      text: 'Alma delivers SOPs to new staff so no one drops the ball', 
      agent: 'alma',
      iconBg: 'bg-amber-500/30'
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Manual Process */}
      <div className="space-y-4">
        <div className="p-4 bg-red-500/10 backdrop-blur-sm rounded-lg mb-6">
          <h3 className="text-2xl font-bold text-white mb-1">Manual Workflow</h3>
          <p className="text-white/70">Fragmented, inconsistent, and prone to human error</p>
        </div>
        
        <div className="space-y-4 relative">
          {/* Vertical line connector */}
          <div className="absolute left-[25px] top-[40px] bottom-[30px] w-[2px] bg-white/10 z-0"></div>
          
          {manualSteps.map((step, index) => (
            <FadeInSection key={step.id} delay={0.1 * index} direction="right">
              <div className={`flex items-start p-4 rounded-lg ${step.isNegative ? 'bg-red-500/5' : 'bg-white/5'} border ${step.isNegative ? 'border-red-500/20' : 'border-white/10'}`}>
                <div className={`flex-shrink-0 h-12 w-12 ${step.iconBg} rounded-full flex items-center justify-center text-xl z-10`}>
                  {step.icon}
                </div>
                <div className="ml-4 flex-grow">
                  <div className="text-lg text-white">{step.text}</div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
      
      {/* AI-Powered Process */}
      <div className="space-y-4">
        <div className="p-4 bg-nextgen-purple/10 backdrop-blur-sm rounded-lg mb-6">
          <h3 className="text-2xl font-bold text-white mb-1">AI-Powered Workflow</h3>
          <p className="text-white/70">Automated, consistent, and always on time</p>
        </div>
        
        <div className="space-y-4 relative">
          {/* Vertical line connector */}
          <div className="absolute left-[25px] top-[40px] bottom-[30px] w-[2px] bg-gradient-to-b from-green-500/30 via-blue-500/30 to-purple-500/30 z-0"></div>
          
          {aiSteps.map((step, index) => (
            <FadeInSection key={step.id} delay={0.2 * index} direction="left">
              <div className={`flex items-start p-4 rounded-lg bg-${step.iconBg.split('-')[1]}-500/5 border border-${step.iconBg.split('-')[1]}-500/20`}>
                <div className="flex-shrink-0 z-10">
                  <AgentChatAvatar agent={step.agent} hideDetails={true} />
                </div>
                <div className="ml-4 flex-grow">
                  <div className="text-lg text-white">{step.text}</div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JourneyComparison;
