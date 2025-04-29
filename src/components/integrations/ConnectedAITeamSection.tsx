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
  const positions = [{
    top: '10%',
    left: '65%'
  },
  // Giselle - top right
  {
    top: '65%',
    left: '75%'
  },
  // Miles - bottom right
  {
    top: '65%',
    left: '25%'
  },
  // Devon - bottom left
  {
    top: '10%',
    left: '35%'
  } // Alma - top left 
  ];
  return;
};
export default ConnectedAITeamSection;