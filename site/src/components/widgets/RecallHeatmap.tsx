"use client";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weeks = ["W1", "W2", "W3", "W4"];

// Sample data: number of overdue patients per week
const heatmapData: number[][] = [
  [4, 3, 5, 2],  // Jan
  [6, 4, 3, 7],  // Feb
  [3, 2, 4, 3],  // Mar
  [5, 8, 6, 4],  // Apr
  [2, 3, 2, 1],  // May
  [4, 5, 7, 6],  // Jun
  [8, 6, 5, 3],  // Jul
  [3, 4, 2, 5],  // Aug
  [6, 7, 8, 9],  // Sep
  [4, 3, 5, 2],  // Oct
  [7, 5, 4, 6],  // Nov
  [3, 2, 4, 3],  // Dec
];

function getCellColor(value: number): string {
  if (value <= 2) return "bg-[var(--color-success)]/30";
  if (value <= 4) return "bg-[var(--color-success)]/60";
  if (value <= 6) return "bg-[var(--color-warning)]/50";
  if (value <= 8) return "bg-[var(--color-warning)]/80";
  return "bg-[var(--color-error)]/70";
}

const stats = [
  { label: "Total Overdue", value: "127", desc: "patients need recall" },
  { label: "30-Day Overdue", value: "43", desc: "first contact priority" },
  { label: "90+ Days Overdue", value: "18", desc: "reactivation needed" },
  { label: "Recall Rate", value: "78%", desc: "compliance this quarter" },
];

export function RecallHeatmap() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-4"
          >
            <p className="text-2xl font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
              {stat.value}
            </p>
            <p className="text-xs font-medium text-[var(--color-text-secondary)]">{stat.label}</p>
            <p className="text-[11px] text-[var(--color-text-tertiary)]">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-5 overflow-x-auto">
        <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
          Overdue Patients by Week
        </h3>
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="grid grid-cols-[60px_repeat(12,1fr)] gap-1 mb-1">
            <div />
            {months.map((m) => (
              <div key={m} className="text-center text-[10px] font-medium text-[var(--color-text-tertiary)]">
                {m}
              </div>
            ))}
          </div>
          {/* Rows */}
          {weeks.map((week, wi) => (
            <div key={week} className="grid grid-cols-[60px_repeat(12,1fr)] gap-1 mb-1">
              <div className="text-[11px] text-[var(--color-text-tertiary)] flex items-center">{week}</div>
              {months.map((_, mi) => {
                const val = heatmapData[mi][wi];
                return (
                  <div
                    key={mi}
                    className={`h-8 rounded ${getCellColor(val)} flex items-center justify-center text-[10px] font-medium text-[var(--color-text-primary)]`}
                    title={`${months[mi]} ${week}: ${val} overdue`}
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 text-[10px] text-[var(--color-text-tertiary)]">
          <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-[var(--color-success)]/30" /> 0-2</span>
          <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-[var(--color-success)]/60" /> 3-4</span>
          <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-[var(--color-warning)]/50" /> 5-6</span>
          <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-[var(--color-warning)]/80" /> 7-8</span>
          <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-[var(--color-error)]/70" /> 9+</span>
        </div>
      </div>
    </div>
  );
}
