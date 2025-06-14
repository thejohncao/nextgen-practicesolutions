
import React from "react";
import { Users, Bot, CheckCircle, ClipboardCheck, User, Star } from "lucide-react";
import "../../app/styles/apple-design.css";

// Demo Data (replace with Supabase queries later)
const todayPatients = [
  { name: "Maria G.", time: "9:15 AM", treatment: "Glow Facial", notes: "Prefers steam" },
  { name: "Evan C.", time: "10:45 AM", treatment: "HydraBoost", notes: "" },
  { name: "Mei L.", time: "1:00 PM", treatment: "LED Refresh", notes: "VIP" },
];

const todos = [
  { task: "DM Maria G. post-facial", done: false },
  { task: "Confirm Evan's booking", done: true },
  { task: "Reply to 2 GHL leads", done: false },
];

const aiAgents = [
  { name: "Miles", icon: Bot },
  { name: "Giselle", icon: User },
  { name: "Devon", icon: User },
  { name: "Alma", icon: User },
];

const StaffDashboard = () => {
  return (
    <section className="fade-in apple-card p-8 max-w-3xl mx-auto">
      {/* Today's Patients */}
      <div className="mb-7">
        <div className="font-semibold text-apple-header mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 mr-2 text-apple-detail" />
          Today’s Patients
        </div>
        <ul className="flex flex-col gap-3">
          {todayPatients.map((p) => (
            <li className="border-l-4 border-[#FFD700] bg-[#F0F8FF] rounded-xl px-4 py-3 flex justify-between items-center" key={p.name}>
              <div>
                <div className="font-bold text-[#00274D]">{p.name}</div>
                <div className="text-xs text-apple-detail">{p.treatment} · {p.time}</div>
                {p.notes && <div className="text-apple-subtle text-xs mt-0.5">{p.notes}</div>}
              </div>
              <div className="ml-4 font-semibold text-[#FFD700]">{p.time}</div>
            </li>
          ))}
        </ul>
      </div>
      {/* Open Tasks */}
      <div className="mb-7">
        <div className="font-semibold text-apple-header mb-2 flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 mr-1 text-apple-detail" />
          Open Tasks
        </div>
        <ul className="flex flex-col gap-2">
          {todos.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <input type="checkbox" checked={item.done} readOnly className="accent-[#FFD700]" />
              <span className={`text-apple-detail ${item.done ? "line-through" : ""}`}>{item.task}</span>
              {item.done && <CheckCircle className="w-4 h-4 text-[#FFD700]" />}
            </li>
          ))}
        </ul>
      </div>
      {/* AI Team Shortcuts */}
      <div className="mb-7">
        <div className="font-semibold text-apple-header mb-2 flex items-center gap-2">
          <Bot className="w-5 h-5 mr-1 text-apple-detail" />
          AI Team Shortcuts
        </div>
        <div className="flex flex-wrap gap-3">
          {aiAgents.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className="flex items-center gap-2 bg-[#FFD700] text-[#00274D] rounded-lg px-4 py-2 shadow font-semibold hover:bg-[#ffd700cc] transition"
              onClick={() => window.dispatchEvent(new CustomEvent("openMiles", { detail: { agent: name.toLowerCase() } }))}
            >
              <Icon className="w-4 h-4" /> {name}
            </button>
          ))}
        </div>
      </div>
      {/* Credit Redemptions */}
      <div className="mb-7">
        <div className="flex items-center gap-2 text-[#00274D]">
          <Star className="w-5 h-5 text-[#FFD700]" />
          <span className="font-semibold">3 patients used credits today</span>
          <span className="ml-3 text-apple-detail">– $750 in care delivered</span>
        </div>
      </div>
      {/* New Leads */}
      <div>
        <div className="font-semibold text-apple-header mb-2 flex items-center gap-2">
          <User className="w-5 h-5 mr-1 text-apple-detail" />
          New Leads
        </div>
        <div className="text-apple-detail">2 new leads on GHL (synced)</div>
      </div>
    </section>
  );
};

export default StaffDashboard;
