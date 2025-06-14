import React from "react";
import AgentCardGrid from "../components/AgentCardGrid";

const agents = [
  { id: "miles", name: "Miles", desc: "Practice operations & scheduling", color: "blue-500" },
  { id: "giselle", name: "Giselle", desc: "Growth & marketing automation", color: "green-500" },
  { id: "devon", name: "Devon", desc: "Sales, follow-ups, acceptance", color: "purple-500" },
  { id: "alma", name: "Alma", desc: "Team training & SOPs", color: "yellow-500" },
];

const AgentBoardroom = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black/50 py-8">
    <h2 className="text-3xl font-bold text-white mb-6">Executive AI Agents</h2>
    <AgentCardGrid
      onCardAction={() => {
        // TODO: Open agent modal (connect when ready)
        // alert("Agent modal coming soon!");
      }}
    />
  </div>
);

export default AgentBoardroom;
