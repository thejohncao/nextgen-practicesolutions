
import React from "react";
import { Users, BarChart3, Bot, Building, Star, TrendingUp, Activity } from "lucide-react";
import "../../app/styles/apple-design.css";

const clinics = [
  { location: "LA MedSpa", mrr: "$16,200", credits: 80, growth: "+17%" },
  { location: "SF Glow", mrr: "$9,430", credits: 39, growth: "+8%" },
  { location: "SD Beauty", mrr: "$6,250", credits: 27, growth: "+2%" },
];

const activityLog = [
  { user: "Ana F.", action: "Viewed SOP", time: "6m ago" },
  { user: "Sam R.", action: "Completed task", time: "20m ago" },
  { user: "Rachel P.", action: "Logged in", time: "1h ago" },
];

const AdminDashboard = () => (
  <section className="fade-in apple-card p-8 max-w-6xl mx-auto">
    {/* Key Metrics */}
    <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div className="glass-blur px-5 py-4 rounded-2xl">
        <div className="flex items-center gap-2 mb-1 text-[#00274D] font-semibold">
          <Users className="w-5 h-5" /> Users
        </div>
        <div className="text-3xl font-bold">382</div>
      </div>
      <div className="glass-blur px-5 py-4 rounded-2xl">
        <div className="flex items-center gap-2 mb-1 text-[#00274D] font-semibold">
          <BarChart3 className="w-5 h-5" /> MRR
        </div>
        <div className="text-3xl font-bold">$29,500</div>
      </div>
      <div className="glass-blur px-5 py-4 rounded-2xl">
        <div className="flex items-center gap-2 mb-1 text-[#00274D] font-semibold">
          <Star className="w-5 h-5" /> Redemptions
        </div>
        <div className="text-3xl font-bold">189</div>
      </div>
    </div>
    {/* AI Agent Summary */}
    <div className="mb-8">
      <div className="font-semibold text-apple-header mb-2 flex items-center gap-2">
        <Bot className="w-5 h-5 mr-1 text-apple-detail" />
        AI Agent Summary
      </div>
      <ul>
        <li className="text-apple-detail mb-1"><strong>Miles</strong>: 58 patient bookings (last 30d)</li>
        <li className="text-apple-detail mb-1"><strong>Giselle</strong>: 86 leads captured</li>
        <li className="text-apple-detail mb-1"><strong>Devon</strong>: 42 task automations</li>
        <li className="text-apple-detail mb-1"><strong>Alma</strong>: 14 support sessions</li>
      </ul>
    </div>
    {/* Top Performing Clinics */}
    <div className="mb-8">
      <div className="font-semibold text-apple-header mb-2 flex items-center gap-2">
        <Building className="w-5 h-5 mr-1 text-apple-detail" />
        Top Performing Clinics
      </div>
      <table className="w-full glass-blur rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#F0F8FF] text-[#00274D]">
            <th className="px-4 py-2 text-left font-semibold">Location</th>
            <th className="px-4 py-2 text-left font-semibold">MRR</th>
            <th className="px-4 py-2 text-left font-semibold">Credits Used</th>
            <th className="px-4 py-2 text-left font-semibold">Growth</th>
          </tr>
        </thead>
        <tbody>
          {clinics.map((c) => (
            <tr key={c.location} className="border-t last:border-b text-apple-detail">
              <td className="px-4 py-2">{c.location}</td>
              <td className="px-4 py-2">{c.mrr}</td>
              <td className="px-4 py-2">{c.credits}</td>
              <td className="px-4 py-2">{c.growth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* Team Activity Log */}
    <div>
      <div className="font-semibold text-apple-header mb-2 flex items-center gap-2">
        <Activity className="w-5 h-5 mr-1 text-apple-detail" />
        Team Activity
      </div>
      <ul className="text-apple-detail">
        {activityLog.map((log, idx) => (
          <li key={idx}>
            <span className="font-semibold text-[#00274D]">{log.user}</span>: {log.action}
            <span className="ml-2 text-xs text-apple-subtle">{log.time}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default AdminDashboard;
