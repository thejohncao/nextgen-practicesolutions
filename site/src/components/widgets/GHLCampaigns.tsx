"use client";

import { DollarSign, Users, BarChart3, ArrowUpRight } from "lucide-react";

const pipelines = [
  {
    name: "New Patient Acquisition",
    color: "#1D9E75",
    leads: 234,
    conversions: 89,
    revenue: "$142K",
    conversionRate: "38%",
  },
  {
    name: "Recall & Reactivation",
    color: "#378ADD",
    leads: 312,
    conversions: 156,
    revenue: "$198K",
    conversionRate: "50%",
  },
  {
    name: "Case Follow-Up",
    color: "#7F77DD",
    leads: 87,
    conversions: 41,
    revenue: "$124K",
    conversionRate: "47%",
  },
  {
    name: "Review Generation",
    color: "#D4537E",
    leads: 189,
    conversions: 142,
    revenue: "$75K",
    conversionRate: "75%",
  },
];

export function GHLCampaigns() {
  return (
    <div className="space-y-6">
      {/* Hero stat */}
      <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-8 text-center">
        <p className="text-5xl font-normal text-[var(--color-accent)]" style={{ fontFamily: "var(--font-display)" }}>
          $539K
        </p>
        <p className="mt-2 text-lg text-[var(--color-text-secondary)]">Total revenue recovered across all pipelines</p>
        <div className="mt-4 flex items-center justify-center gap-1 text-sm text-[var(--color-success)]">
          <ArrowUpRight className="h-4 w-4" />
          <span>23% increase over last quarter</span>
        </div>
      </div>

      {/* Pipeline Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {pipelines.map((pipeline) => (
          <div
            key={pipeline.name}
            className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-5"
            style={{ borderTopWidth: "3px", borderTopColor: pipeline.color }}
          >
            <h3 className="text-base font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
              {pipeline.name}
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[var(--color-text-tertiary)]" />
                <div>
                  <p className="text-lg font-semibold text-[var(--color-text-primary)]">{pipeline.leads}</p>
                  <p className="text-[11px] text-[var(--color-text-tertiary)]">Leads</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[var(--color-text-tertiary)]" />
                <div>
                  <p className="text-lg font-semibold text-[var(--color-text-primary)]">{pipeline.conversionRate}</p>
                  <p className="text-[11px] text-[var(--color-text-tertiary)]">Conv. Rate</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-[var(--color-text-tertiary)]" />
                <div>
                  <p className="text-lg font-semibold" style={{ color: pipeline.color }}>{pipeline.revenue}</p>
                  <p className="text-[11px] text-[var(--color-text-tertiary)]">Revenue</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-[var(--color-success)]" />
                <div>
                  <p className="text-lg font-semibold text-[var(--color-text-primary)]">{pipeline.conversions}</p>
                  <p className="text-[11px] text-[var(--color-text-tertiary)]">Conversions</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
