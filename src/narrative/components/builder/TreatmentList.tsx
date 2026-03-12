import { Trash2 } from 'lucide-react';
import type { PhaseGroup, NarrativePlanItem } from '../../types';

interface TreatmentListProps {
  phaseGroups: PhaseGroup[];
  totalFeeCents: number;
  onRemoveItem: (id: string) => void;
}

export default function TreatmentList({ phaseGroups, totalFeeCents, onRemoveItem }: TreatmentListProps) {
  const hasItems = phaseGroups.some((g) => g.items.length > 0);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-sm font-semibold text-[var(--narrative-text)] mb-4 px-1">
        Treatment Plan
      </h2>

      {!hasItems ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-[var(--narrative-text-secondary)] text-center px-4">
            Tap a tooth to add treatments
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-5">
          {phaseGroups.map((group) => {
            if (group.items.length === 0) return null;
            return (
              <div key={group.phase}>
                {/* Phase Header */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: group.color }}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wide text-[var(--narrative-text-secondary)]">
                    {group.label} — {group.priority}
                  </span>
                </div>

                {/* Treatment Items */}
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/[0.03] group"
                    >
                      {item.tooth_number && (
                        <span
                          className="w-6 h-6 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0 text-white"
                          style={{ backgroundColor: group.color }}
                        >
                          {item.tooth_number}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--narrative-text)] truncate">
                          {item.treatment_name}
                        </p>
                        <p className="text-[10px] text-[var(--narrative-text-secondary)]">
                          {item.treatment_code} &middot; {item.duration_minutes}min
                        </p>
                      </div>
                      <span className="text-xs font-medium text-[var(--narrative-text)] flex-shrink-0">
                        ${(item.fee_cents / 100).toLocaleString()}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-500 flex-shrink-0"
                        aria-label="Remove treatment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Phase Subtotal */}
                <div className="flex justify-between items-center mt-2 px-3 text-xs">
                  <span className="text-[var(--narrative-text-secondary)]">
                    {group.totalDurationMinutes}min
                  </span>
                  <span className="font-medium text-[var(--narrative-text)]">
                    ${(group.totalFeeCents / 100).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Running Total */}
      {hasItems && (
        <div className="border-t border-[var(--narrative-border)] pt-3 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-[var(--narrative-text)]">Total</span>
            <span className="text-lg font-bold text-[var(--narrative-text)]">
              ${(totalFeeCents / 100).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
