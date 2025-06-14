
import React from "react";

const AgentsDirectory = () => {
  // Directory listing of agents. Links will route to /o/app/agents/{agent}
  const agents = [
    { id: "miles", name: "Miles", desc: "Practice operations & scheduling assistant" },
    { id: "giselle", name: "Giselle", desc: "Growth & marketing automation" },
    { id: "devon", name: "Devon", desc: "Sales, follow-ups, case acceptance" },
    { id: "alma", name: "Alma", desc: "Team training, onboarding, SOP builder" },
  ];

  return (
    <div className="max-w-2xl mx-auto py-16">
      <h1 className="text-2xl font-bold mb-8">Agent Directory</h1>
      <div className="flex flex-col gap-4">
        {agents.map(agent => (
          <a
            key={agent.id}
            href={`/o/app/agents/${agent.id}`}
            className="rounded-xl glass-card border-l-4 pl-6 py-4 hover:scale-105 transition-transform"
            style={{
              borderColor:
                agent.id === "miles"
                  ? "#4A8CFF"
                  : agent.id === "giselle"
                  ? "#3FC6A0"
                  : agent.id === "devon"
                  ? "#8B5CF6"
                  : "#F59E0B",
            }}
          >
            <div className="font-semibold text-lg">{agent.name}</div>
            <div className="text-muted-foreground">{agent.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
};
export default AgentsDirectory;
