"use client";

import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, AlertCircle } from "lucide-react";

const kpis = [
  { label: "New Patients", value: "47", change: "+12%", trend: "up", icon: Users },
  { label: "Production", value: "$182K", change: "+8%", trend: "up", icon: DollarSign },
  { label: "Collection Rate", value: "96.4%", change: "+2.1%", trend: "up", icon: DollarSign },
  { label: "Case Acceptance", value: "68%", change: "+14%", trend: "up", icon: TrendingUp },
  { label: "Hygiene Fill Rate", value: "91%", change: "-3%", trend: "down", icon: Calendar },
  { label: "Avg Response Time", value: "38s", change: "-52%", trend: "up", icon: TrendingDown },
];

const alerts = [
  { level: "warning", text: "3 patients overdue for hygiene by 90+ days" },
  { level: "info", text: "Giselle: New patient lead volume up 34% this month" },
  { level: "success", text: "Miles: Speed-to-Lead response averaging 38 seconds" },
];

const pipelineSummary = [
  { stage: "New Leads", count: 23, color: "#378ADD" },
  { stage: "Contacted", count: 18, color: "#1D9E75" },
  { stage: "Booked", count: 12, color: "#7F77DD" },
  { stage: "Closed", count: 8, color: "#BA7517" },
];

export function CommandCenter() {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-[var(--color-text-tertiary)]" />
                <span className="text-[11px] text-[var(--color-text-tertiary)]">{kpi.label}</span>
              </div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
                {kpi.value}
              </p>
              <span
                className={`text-xs font-medium ${
                  kpi.trend === "up" ? "text-[var(--color-success)]" : "text-[var(--color-error)]"
                }`}
              >
                {kpi.change} vs last month
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Alerts */}
        <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-5">
          <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
            Active Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.text} className="flex items-start gap-3 rounded-lg bg-[var(--color-bg-tertiary)] p-3">
                <AlertCircle
                  className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                    alert.level === "warning"
                      ? "text-[var(--color-warning)]"
                      : alert.level === "success"
                        ? "text-[var(--color-success)]"
                        : "text-[var(--color-blue)]"
                  }`}
                />
                <p className="text-sm text-[var(--color-text-secondary)]">{alert.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Summary */}
        <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-5">
          <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
            Pipeline Summary
          </h3>
          <div className="space-y-3">
            {pipelineSummary.map((stage) => (
              <div key={stage.stage} className="flex items-center gap-3">
                <span className="w-20 text-sm text-[var(--color-text-secondary)]">{stage.stage}</span>
                <div className="flex-1 h-6 rounded-full bg-[var(--color-bg-tertiary)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(stage.count / 25) * 100}%`,
                      backgroundColor: stage.color,
                    }}
                  />
                </div>
                <span className="w-8 text-right text-sm font-medium text-[var(--color-text-primary)]">{stage.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
