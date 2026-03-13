"use client";

import { useState } from "react";
import Link from "next/link";

const sliders = [
  { key: "patients", label: "Monthly New Patients", min: 10, max: 200, step: 5, default: 50, format: (v: number) => String(v) },
  { key: "caseValue", label: "Average Case Value ($)", min: 500, max: 10000, step: 100, default: 2500, format: (v: number) => `$${v.toLocaleString()}` },
  { key: "noShowRate", label: "No-Show Rate (%)", min: 0, max: 40, step: 1, default: 15, format: (v: number) => `${v}%` },
  { key: "arLeakage", label: "AR Leakage (%)", min: 0, max: 20, step: 1, default: 8, format: (v: number) => `${v}%` },
];

const pillarBreakdown = [
  { name: "Growth", color: "#1D9E75", desc: "New patients recovered from better acquisition + speed-to-lead" },
  { name: "Management", color: "#7F77DD", desc: "Revenue from reduced no-shows, recalls, and AR collection" },
  { name: "Development", color: "#D85A30", desc: "Higher case acceptance and treatment coordinator performance" },
];

export function ROICalculator() {
  const [values, setValues] = useState<Record<string, number>>({
    patients: 50,
    caseValue: 2500,
    noShowRate: 15,
    arLeakage: 8,
  });

  const handleChange = (key: string, val: number) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  // Revenue recovery estimates
  const growthRecovery = Math.round(values.patients * 0.15 * values.caseValue);
  const managementRecovery = Math.round(
    (values.patients * values.caseValue * (values.noShowRate / 100) * 0.4) +
    (values.patients * values.caseValue * (values.arLeakage / 100) * 0.6)
  );
  const developmentRecovery = Math.round(values.patients * values.caseValue * 0.12);
  const annualTotal = (growthRecovery + managementRecovery + developmentRecovery) * 12;
  const monthlyTotal = growthRecovery + managementRecovery + developmentRecovery;

  const pillarValues = [growthRecovery, managementRecovery, developmentRecovery];
  const maxPillar = Math.max(...pillarValues);

  const fmtCurrency = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-8">
      {/* Sliders */}
      <div className="grid gap-6 md:grid-cols-2">
        {sliders.map((s) => (
          <div key={s.key}>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-[var(--color-text-secondary)]">{s.label}</label>
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">{s.format(values[s.key])}</span>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={values[s.key]}
              onChange={(e) => handleChange(s.key, Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--color-accent) ${((values[s.key] - s.min) / (s.max - s.min)) * 100}%, var(--color-bg-tertiary) ${((values[s.key] - s.min) / (s.max - s.min)) * 100}%)`,
              }}
            />
            <div className="flex justify-between mt-1 text-[10px] text-[var(--color-text-tertiary)]">
              <span>{s.format(s.min)}</span>
              <span>{s.format(s.max)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-6">
        <h3 className="text-lg font-normal text-[var(--color-text-primary)] mb-6">Revenue Recovery Breakdown</h3>

        <div className="space-y-4 mb-6">
          {pillarBreakdown.map((pillar, i) => (
            <div key={pillar.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium" style={{ color: pillar.color }}>{pillar.name}</span>
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {fmtCurrency(pillarValues[i])}/mo
                </span>
              </div>
              <div className="h-3 rounded-full bg-[var(--color-bg-tertiary)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${maxPillar > 0 ? (pillarValues[i] / maxPillar) * 100 : 0}%`,
                    backgroundColor: pillar.color,
                  }}
                />
              </div>
              <p className="mt-1 text-[11px] text-[var(--color-text-tertiary)]">{pillar.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-3 border-t border-[var(--color-border-primary)] pt-6">
          <div className="text-center">
            <p className="text-3xl font-normal text-[var(--color-accent)]" style={{ fontFamily: "var(--font-display)" }}>
              {fmtCurrency(monthlyTotal)}
            </p>
            <p className="text-xs text-[var(--color-text-tertiary)]">Monthly impact</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-normal text-[var(--color-accent)]" style={{ fontFamily: "var(--font-display)" }}>
              {fmtCurrency(annualTotal)}
            </p>
            <p className="text-xs text-[var(--color-text-tertiary)]">Annual total</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-normal text-[var(--color-success)]" style={{ fontFamily: "var(--font-display)" }}>
              {monthlyTotal > 0 ? `+${Math.round((annualTotal / (values.patients * values.caseValue * 12)) * 100)}%` : "0%"}
            </p>
            <p className="text-xs text-[var(--color-text-tertiary)]">Revenue lift</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/book"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-accent)] px-8 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Get Your Custom ROI Report &rarr;
        </Link>
      </div>
    </div>
  );
}
