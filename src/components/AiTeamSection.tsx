
import React, { useState, useRef } from 'react';
import TimelinePhases from './team/TimelinePhases';
import AgentCarousel from './team/AgentCarousel';
import TeamSectionHeader from './team/TeamSectionHeader';
import TeamCTA from './team/TeamCTA';
import { orderedAgents, teamPhases } from './team/data/TeamPhases';

const AITeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section id="ai-team" className="section-padding py-12 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <TeamSectionHeader />

        <TimelinePhases
          phases={teamPhases}
          activeIndex={activeIndex}
          onPhaseClick={setActiveIndex}
        />

        <AgentCarousel
          agents={orderedAgents}
          phases={teamPhases}
          activeIndex={activeIndex}
          onSlideChange={setActiveIndex}
          carouselRef={carouselRef}
        />

        <TeamCTA />
      </div>
    </section>
  );
};

export default AITeamSection;
