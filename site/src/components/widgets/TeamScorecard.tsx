"use client";

const teamMembers = [
  {
    name: "Jessica M.",
    role: "Treatment Coordinator",
    kpis: [
      { metric: "Case Acceptance", value: "72%", target: "70%", status: "above" },
      { metric: "Avg Case Value", value: "$2,840", target: "$2,500", status: "above" },
      { metric: "Follow-Up Rate", value: "88%", target: "90%", status: "below" },
    ],
    coaching: "Great case acceptance this week. Focus on same-day follow-ups — you're at 88% vs 90% target.",
  },
  {
    name: "Maria L.",
    role: "Front Desk",
    kpis: [
      { metric: "Answer Rate", value: "94%", target: "95%", status: "below" },
      { metric: "Booking Rate", value: "67%", target: "60%", status: "above" },
      { metric: "Patient Satisfaction", value: "4.8", target: "4.5", status: "above" },
    ],
    coaching: "Booking rate is excellent at 67%. Let's work on catching more calls — consider using AI Front Desk for overflow.",
  },
  {
    name: "David R.",
    role: "Hygienist",
    kpis: [
      { metric: "Perio Diagnosis", value: "34%", target: "30%", status: "above" },
      { metric: "Fluoride Acceptance", value: "61%", target: "50%", status: "above" },
      { metric: "Reappoint Rate", value: "82%", target: "85%", status: "below" },
    ],
    coaching: "Strong clinical metrics. Reappoint rate is slightly below target — try confirming next visit before patient leaves the chair.",
  },
  {
    name: "Sarah K.",
    role: "Office Manager",
    kpis: [
      { metric: "Collection Rate", value: "96%", target: "95%", status: "above" },
      { metric: "AR > 90 Days", value: "$12K", target: "$15K", status: "above" },
      { metric: "Claims Submitted", value: "142", target: "130", status: "above" },
    ],
    coaching: "Outstanding collections this month. AR is well within target. Keep up the daily claims submission rhythm.",
  },
];

export function TeamScorecard() {
  return (
    <div className="space-y-4">
      {teamMembers.map((member) => (
        <div
          key={member.name}
          className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
                {member.name}
              </h3>
              <p className="text-xs text-[var(--color-text-tertiary)]">{member.role}</p>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {member.kpis.map((kpi) => (
              <div key={kpi.metric} className="rounded-lg bg-[var(--color-bg-tertiary)] p-3">
                <p className="text-[11px] text-[var(--color-text-tertiary)] mb-1">{kpi.metric}</p>
                <p className="text-lg font-semibold text-[var(--color-text-primary)]">{kpi.value}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      kpi.status === "above" ? "bg-[var(--color-success)]" : "bg-[var(--color-warning)]"
                    }`}
                  />
                  <span className="text-[10px] text-[var(--color-text-tertiary)]">
                    Target: {kpi.target}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Coaching Note */}
          <div className="rounded-lg bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/10 p-3">
            <p className="text-xs font-semibold text-[var(--color-accent)] mb-1">Coaching Note</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{member.coaching}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
