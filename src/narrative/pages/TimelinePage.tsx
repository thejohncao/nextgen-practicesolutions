import { useNarrativePlan } from '../context/NarrativePlanContext';

export default function TimelinePage() {
  const { phaseGroups } = useNarrativePlan();

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-xl font-semibold text-[var(--narrative-text)] mb-6">
        Treatment Timeline
      </h2>
      <div className="space-y-6">
        {phaseGroups.map((group) => (
          <div
            key={group.phase}
            className="rounded-xl border border-[var(--narrative-border)] bg-[var(--narrative-surface)] p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: group.color }}
              />
              <h3 className="text-lg font-medium text-[var(--narrative-text)]">
                {group.label}
              </h3>
              <span className="text-xs px-2 py-1 rounded-full bg-black/5 text-[var(--narrative-text-secondary)] capitalize">
                {group.priority}
              </span>
            </div>
            {group.items.length === 0 ? (
              <p className="text-sm text-[var(--narrative-text-secondary)]">No treatments in this phase</p>
            ) : (
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {item.tooth_number && (
                        <span className="w-6 h-6 rounded bg-black/5 text-xs flex items-center justify-center font-medium">
                          {item.tooth_number}
                        </span>
                      )}
                      <span className="text-[var(--narrative-text)]">{item.treatment_name}</span>
                    </div>
                    <span className="text-[var(--narrative-text-secondary)]">
                      {item.duration_minutes}min
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-[var(--narrative-border)]">
              <span className="text-xs text-[var(--narrative-text-secondary)]">
                {group.totalDurationMinutes}min total
              </span>
              <span className="text-sm font-medium text-[var(--narrative-text)]">
                ${(group.totalFeeCents / 100).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
