import { useNarrativePlan } from '../context/NarrativePlanContext';

export default function PlanBuilderPage() {
  const { items, phaseGroups, totalFeeCents } = useNarrativePlan();

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Main area: Tooth Chart */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center text-[var(--narrative-text-secondary)]">
          <p className="text-lg font-medium mb-2">Tooth Chart</p>
          <p className="text-sm">Phase 3 will add the interactive 32-tooth SVG chart here.</p>
          <p className="text-sm mt-4">{items.length} treatment(s) assigned</p>
        </div>
      </div>

      {/* Right sidebar: Treatment List */}
      <aside className="w-80 border-l border-[var(--narrative-border)] p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold text-[var(--narrative-text)] mb-4">
          Treatment Plan
        </h2>
        {phaseGroups.map((group) => (
          <div key={group.phase} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: group.color }}
              />
              <span className="text-xs font-medium text-[var(--narrative-text)]">
                {group.label} — {group.priority}
              </span>
            </div>
            {group.items.length === 0 ? (
              <p className="text-xs text-[var(--narrative-text-secondary)] pl-5">
                No treatments
              </p>
            ) : (
              <ul className="space-y-1 pl-5">
                {group.items.map((item) => (
                  <li key={item.id} className="text-sm text-[var(--narrative-text)]">
                    #{item.tooth_number} — {item.treatment_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div className="border-t border-[var(--narrative-border)] pt-3 mt-4">
          <div className="flex justify-between text-sm font-medium text-[var(--narrative-text)]">
            <span>Total</span>
            <span>${(totalFeeCents / 100).toLocaleString()}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
