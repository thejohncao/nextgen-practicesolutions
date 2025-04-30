
import React from 'react';
import { agents } from '@/data/agents';
import { agentResults } from '@/data/agentResults';
import CarouselContainer from './CarouselContainer';
import SectionHeader from './SectionHeader';

// Group results by agent name
const groupedResults = agentResults.reduce((acc, result) => {
  const agent = result.agentName.toLowerCase();
  if (!acc[agent]) {
    acc[agent] = [];
  }
  acc[agent].push(result);
  return acc;
}, {} as Record<string, typeof agentResults>);

const MarqueeResultsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-nextgen-dark">
      <div className="container mx-auto">
        <SectionHeader
          title="Real Results Your AI Team Delivers" 
          subtitle="While you focus on patient care, your AI executive team drives practice growth."
        />
        
        <div className="mt-12">
          {agents.map((agent, index) => {
            // Get results for this agent or an empty array
            const agentResultsData = groupedResults[agent.name.toLowerCase()] || [];
            
            return (
              <div key={agent.name} className="mb-12 last:mb-0">
                <CarouselContainer 
                  agentName={agent.name} 
                  agentRole={agent.title} 
                  agentColor={agent.color}
                  results={agentResultsData} 
                  direction={index % 2 === 0 ? 'ltr' : 'rtl'}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MarqueeResultsSection;
