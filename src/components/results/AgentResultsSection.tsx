
import React from 'react';
import { agents } from '@/data/agents';
import { agentResults } from '@/data/agentResults';
import SectionHeader from './SectionHeader';
import VerticalSlider from './VerticalSlider';
import { getAgentResult } from '@/lib/utils';

const groupedResults = agentResults.reduce((acc, result) => {
  const agent = result.agentName.toLowerCase();
  if (!acc[agent]) {
    acc[agent] = [];
  }
  acc[agent].push(result);
  return acc;
}, {} as Record<string, typeof agentResults>);

const AgentResultsSection = () => {
  return (
    <section className="py-20 bg-nextgen-dark text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Real Results from Your AI Team"
          subtitle="While you focus on patient care, your team delivers measurable wins across your practice."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {agents.map((agent) => {
            // Get results for this agent or an empty array
            const agentResultsData = groupedResults[agent.name.toLowerCase()] || [];
            
            return (
              <div key={agent.name} className="h-[500px] md:h-[600px]">
                <VerticalSlider 
                  agentName={agent.name} 
                  results={agentResultsData}
                  agentRole={agent.title}
                  agentColor={agent.color}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgentResultsSection;
