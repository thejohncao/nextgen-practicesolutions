"use client";

import { Zap, Clock, MessageSquare, Phone } from "lucide-react";

const recentLeads = [
  { name: "Maria C.", source: "Google Ads", responseTime: "24s", channel: "SMS", status: "Booked" },
  { name: "James T.", source: "Website Form", responseTime: "38s", channel: "SMS + Email", status: "Contacted" },
  { name: "Sarah L.", source: "Facebook", responseTime: "15s", channel: "SMS", status: "Booked" },
  { name: "David M.", source: "Referral Form", responseTime: "42s", channel: "Email", status: "Contacted" },
  { name: "Lisa K.", source: "Google Ads", responseTime: "31s", channel: "SMS", status: "Booked" },
];

const stats = [
  { label: "Avg Response Time", value: "38s", icon: Clock, color: "#1D9E75" },
  { label: "Leads This Month", value: "47", icon: Zap, color: "#378ADD" },
  { label: "SMS Sent", value: "142", icon: MessageSquare, color: "#7F77DD" },
  { label: "Calls Made", value: "38", icon: Phone, color: "#D4537E" },
];

export function SpeedToLead() {
  return (
    <div className="space-y-6">
      {/* Hero stat */}
      <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-8 text-center">
        <p className="text-6xl font-normal text-[var(--color-success)]" style={{ fontFamily: "var(--font-display)" }}>
          38<span className="text-3xl">s</span>
        </p>
        <p className="mt-2 text-lg text-[var(--color-text-secondary)]">Average lead response time</p>
        <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">Industry average: 47 hours</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-4"
            >
              <Icon className="mb-2 h-5 w-5" style={{ color: stat.color }} />
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
                {stat.value}
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Leads */}
      <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--color-border-primary)]">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
            Recent Lead Responses
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border-primary)]">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">Lead</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">Source</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">Response</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">Channel</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.name} className="border-b border-[var(--color-border-primary)] last:border-0">
                  <td className="px-5 py-3 text-sm text-[var(--color-text-primary)]">{lead.name}</td>
                  <td className="px-5 py-3 text-sm text-[var(--color-text-secondary)]">{lead.source}</td>
                  <td className="px-5 py-3 text-sm font-medium text-[var(--color-success)]">{lead.responseTime}</td>
                  <td className="px-5 py-3 text-sm text-[var(--color-text-secondary)]">{lead.channel}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-[5px] px-2 py-0.5 text-[9px] font-semibold ${
                        lead.status === "Booked"
                          ? "bg-[var(--color-success)]/20 text-[var(--color-success)]"
                          : "bg-[var(--color-blue)]/20 text-[var(--color-blue)]"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
