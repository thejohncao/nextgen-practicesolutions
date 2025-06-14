
import React from "react";
import AgentExecutiveCard from "./AgentExecutiveCard";

// For now, fake recent interactions; later plug in context/memory
const agentData = [
  {
    id: "miles",
    name: "Miles",
    tagline: "Your operations, optimized.",
    lastInteraction: `Last asked: "Show me today’s bookings"`,
  },
  {
    id: "giselle",
    name: "Giselle",
    tagline: "Funnels, ads, and patients on demand.",
    lastInteraction: `Last asked: "Run a reactivation blast"`,
  },
  {
    id: "devon",
    name: "Devon",
    tagline: "Your best closer, always on.",
    lastInteraction: `Last asked: "Show my follow-up queue"`,
  },
  {
    id: "alma",
    name: "Alma",
    tagline: "Train your team. Document your systems.",
    lastInteraction: `Last asked: "Teach onboarding best practices"`,
  },
];

const AgentCardGrid = ({ onCardAction }: { onCardAction?: (id: string) => void }) => {
  return (
    <div className="w-full flex flex-wrap gap-6 justify-center items-center py-4">
      {agentData.map(agent => (
        <AgentExecutiveCard
          key={agent.id}
          id={agent.id as any}
          name={agent.name}
          tagline={agent.tagline}
          lastInteraction={agent.lastInteraction}
          onQuickAction={() => onCardAction && onCardAction(agent.id)}
        />
      ))}
    </div>
  );
};

export default AgentCardGrid;
