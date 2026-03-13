"use client";

const metrics = [
  { label: "Monthly Cost", diy: "$0–500", hire: "$4,000–8,000", nextgen: "$2,500–5,000", diyPct: 10, hirePct: 90, nextgenPct: 50 },
  { label: "Speed-to-Lead", diy: "Hours", hire: "Minutes", nextgen: "Seconds", diyPct: 10, hirePct: 40, nextgenPct: 95 },
  { label: "Systems Covered", diy: "1-2", hire: "3-4", nextgen: "All 10", diyPct: 15, hirePct: 35, nextgenPct: 100 },
  { label: "Scalability", diy: "Low", hire: "Medium", nextgen: "High", diyPct: 15, hirePct: 50, nextgenPct: 90 },
  { label: "AI Automation", diy: "None", hire: "None", nextgen: "Full", diyPct: 0, hirePct: 0, nextgenPct: 95 },
  { label: "Data & Reporting", diy: "Manual", hire: "Partial", nextgen: "Real-time", diyPct: 10, hirePct: 40, nextgenPct: 90 },
  { label: "Team Training", diy: "Self-taught", hire: "Limited", nextgen: "AI-guided", diyPct: 10, hirePct: 30, nextgenPct: 85 },
  { label: "Time to Results", diy: "6-12 months", hire: "2-4 months", nextgen: "1-3 weeks", diyPct: 20, hirePct: 50, nextgenPct: 90 },
];

export function CompetitiveComparison() {
  return (
    <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-4 border-b border-[var(--color-border-primary)]">
        <div className="p-4" />
        <div className="p-4 text-center border-l border-[var(--color-border-primary)]">
          <p className="text-sm font-semibold text-[var(--color-text-tertiary)]">DIY</p>
          <p className="text-xs text-[var(--color-text-tertiary)]">Do it yourself</p>
        </div>
        <div className="p-4 text-center border-l border-[var(--color-border-primary)]">
          <p className="text-sm font-semibold text-[var(--color-text-tertiary)]">Hire Staff</p>
          <p className="text-xs text-[var(--color-text-tertiary)]">In-house team</p>
        </div>
        <div className="p-4 text-center border-l border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5">
          <p className="text-sm font-semibold text-[var(--color-accent)]">NextGen</p>
          <p className="text-xs text-[var(--color-text-secondary)]">AI-powered</p>
        </div>
      </div>

      {/* Rows */}
      {metrics.map((metric) => (
        <div key={metric.label} className="grid grid-cols-4 border-b border-[var(--color-border-primary)] last:border-0">
          <div className="p-4">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">{metric.label}</p>
          </div>
          {[
            { value: metric.diy, pct: metric.diyPct, color: "var(--color-text-tertiary)" },
            { value: metric.hire, pct: metric.hirePct, color: "var(--color-blue)" },
            { value: metric.nextgen, pct: metric.nextgenPct, color: "var(--color-accent)" },
          ].map((col, i) => (
            <div
              key={i}
              className={`p-4 border-l ${i === 2 ? "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5" : "border-[var(--color-border-primary)]"}`}
            >
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">{col.value}</p>
              <div className="h-1.5 rounded-full bg-[var(--color-bg-tertiary)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${col.pct}%`, backgroundColor: col.color }}
                />
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Verdict */}
      <div className="bg-[var(--color-accent)]/5 p-6 text-center border-t border-[var(--color-accent)]/20">
        <p className="text-lg font-normal text-[var(--color-text-primary)]">
          NextGen delivers <span className="text-[var(--color-accent)] font-semibold">10x the systems</span> at a fraction of the cost of hiring.
        </p>
      </div>
    </div>
  );
}
