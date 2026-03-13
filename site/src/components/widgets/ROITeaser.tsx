"use client";

import { useState } from "react";
import Link from "next/link";

export function ROITeaser() {
  const [patients, setPatients] = useState(50);

  // Simplified ROI estimate: $3,200 avg revenue per new patient recovered
  const annualRecovery = Math.round(patients * 0.15 * 3200);
  const formatted = annualRecovery.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-8">
      <div className="grid gap-8 lg:grid-cols-2 items-center">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-4">
            How many new patients do you see per month?
          </label>
          <input
            type="range"
            min={10}
            max={200}
            step={5}
            value={patients}
            onChange={(e) => setPatients(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--color-accent) ${((patients - 10) / 190) * 100}%, var(--color-bg-tertiary) ${((patients - 10) / 190) * 100}%)`,
            }}
          />
          <div className="flex justify-between mt-2 text-xs text-[var(--color-text-tertiary)]">
            <span>10</span>
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">{patients} patients/mo</span>
            <span>200</span>
          </div>
        </div>

        <div className="text-center lg:text-left">
          <p className="text-sm text-[var(--color-text-tertiary)] mb-1">Estimated annual revenue recovery</p>
          <p className="text-4xl font-normal text-[var(--color-accent)]" style={{ fontFamily: "var(--font-display)" }}>
            {formatted}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Based on practices like yours
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-flex items-center text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            See the full breakdown &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
