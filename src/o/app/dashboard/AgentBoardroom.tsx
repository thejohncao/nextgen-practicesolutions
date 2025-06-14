
import React from "react";

const agents = [
  { id: "miles", name: "Miles", desc: "Practice operations & scheduling", color: "blue-500" },
  { id: "giselle", name: "Giselle", desc: "Growth & marketing automation", color: "green-500" },
  { id: "devon", name: "Devon", desc: "Sales, follow-ups, acceptance", color: "purple-500" },
  { id: "alma", name: "Alma", desc: "Team training & SOPs", color: "yellow-500" },
];

const AgentBoardroom = () => (
  <div className="min-h-screen py-12 flex items-center justify-center bg-black/50">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl px-6">
      {agents.map(agent => (
        <div
          key={agent.id}
          className={`rounded-3xl shadow-md bg-white/10 border-2 border-white/10 hover:scale-105 transition-transform relative flex flex-col items-center justify-between p-8 min-h-[220px] animate-fade-in`}
          style={{ animationDelay: `${agents.indexOf(agent) * 0.1}s` }}
        >
          {/* Placeholder for animated Lottie/Icon */}
          <div className={`w-16 h-16 rounded-full bg-${agent.color}/20 flex items-center justify-center mb-4`}>
            <span className="text-3xl">🤖</span>
          </div>
          <div className="font-bold text-xl">{agent.name}</div>
          <div className="text-sm text-white/80">{agent.desc}</div>
          <button className="mt-4 px-5 py-2 rounded-lg border border-white/10 bg-white/0 hover:bg-white/10 transition text-sm">
            Ask {agent.name}
          </button>
          <div className="absolute bottom-3 left-0 w-full text-center text-xs text-gray-400 pt-3">
            Last Asked: "What are today’s leads?"
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default AgentBoardroom;
