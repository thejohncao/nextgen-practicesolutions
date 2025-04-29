
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('connected-team');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Reorder agents to match patient journey
  const orderedAgents = [...agents].sort((a, b) => {
    const order = { 'Giselle': 1, 'Miles': 2, 'Devon': 3, 'Alma': 4 };
    return order[a.name] - order[b.name];
  });

  // Define positions for each agent in the diamond layout
  const positions = [
    { top: '10%', left: '65%' }, // Giselle - top right
    { top: '65%', left: '75%' }, // Miles - bottom right
    { top: '65%', left: '25%' }, // Devon - bottom left
    { top: '10%', left: '35%' }, // Alma - top left 
  ];

  return (
    <section id="connected-team" className="py-20 bg-gradient-to-b from-nextgen-dark/90 to-nextgen-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeader />

        <div className={`relative h-[600px] mx-auto max-w-5xl transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Background effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1)_0,transparent_70%)]"></div>
          
          {/* SVG connecting lines */}
          <ConnectingLines isVisible={isVisible} />

          {/* Central glow */}
          <CentralGlow isVisible={isVisible} />

          {/* Agent Orbs */}
          <AgentOrbsDisplay 
            orderedAgents={orderedAgents}
            positions={positions}
            isVisible={isVisible}
          />

          {/* Integration Icon Clusters */}
          <IntegrationIconClusters isVisible={isVisible} />
        </div>

        {/* CTA Button */}
        <SectionCTA />
      </div>
    </section>
  );
};

export default ConnectedAITeamSection;
