
import React, { useEffect, useState } from 'react';
import { agents } from '@/data/agents';
import SectionHeader from './ConnectedTeam/SectionHeader';
import ConnectingLines from './ConnectedTeam/ConnectingLines';
import CentralGlow from './ConnectedTeam/CentralGlow';
import AgentOrbsDisplay from './ConnectedTeam/AgentOrbsDisplay';
import IntegrationIconClusters from './ConnectedTeam/IntegrationIconClusters';
import SectionCTA from './ConnectedTeam/SectionCTA';

const ConnectedAITeamSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.2
    });
    
    const section = document.getElementById('connected-team');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  }, []);

  // Reorder agents to match patient journey
  const orderedAgents = [...agents].sort((a, b) => {
    const order = {
      'Giselle': 1,
      'Miles': 2,
      'Devon': 3,
      'Alma': 4
    };
    return order[a.name] - order[b.name];
  });

  // Define positions for each agent in the diamond layout
  const positions = [
    // Giselle - top right
    {
      top: '10%',
      left: '65%'
    },
    // Miles - bottom right
    {
      top: '65%',
      left: '75%'
    },
    // Devon - bottom left
    {
      top: '65%',
      left: '25%'
    },
    // Alma - top left
    {
      top: '10%',
      left: '35%'
    }
  ];
  
  return (
    <section id="connected-team" className="relative py-24 overflow-hidden bg-nextgen-dark text-white">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader 
          title="Experience the Power of Your AI Team"
          subtitle="Watch your AI agents work together to create seamless practice operations"
          isVisible={isVisible}
        />
        
        <div className="relative min-h-[600px] my-12">
          {/* Central glow effect */}
          <CentralGlow isVisible={isVisible} />
          
          {/* Connecting lines between agents */}
          <ConnectingLines isVisible={isVisible} />
          
          {/* Agent orbs positioned in diamond formation */}
          <AgentOrbsDisplay 
            agents={orderedAgents} 
            positions={positions}
            isVisible={isVisible}  
          />
          
          {/* Integration icon clusters */}
          <IntegrationIconClusters isVisible={isVisible} />
        </div>
        
        <SectionCTA 
          buttonText="Book a Demo" 
          description="See the NextGen AI team in action with your practice data" 
          isVisible={isVisible}
        />
      </div>
    </section>
  );
};

export default ConnectedAITeamSection;
