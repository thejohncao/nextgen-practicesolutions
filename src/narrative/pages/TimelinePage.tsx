import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNarrativePlan } from '../context/NarrativePlanContext';
import { toast } from 'sonner';

export default function TimelinePage() {
  const { phaseGroups, updateItem } = useNarrativePlan();
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();

  const phaseMeta = {
    1: { label: 'Phase 1 — Urgent', description: 'Treatment needed now to prevent further damage', icon: '🔴' },
    2: { label: 'Phase 2 — Important', description: 'Recommended treatment within the next few months', icon: '🟡' },
    3: { label: 'Phase 3 — Maintenance', description: 'Ongoing care to maintain your dental health', icon: '⚪' },
  } as const;

  async function handleDateChange(itemId: string, date: string) {
    try {
      await updateItem(itemId, { phase_date: date || null });
    } catch {
      toast.error('Failed to update date');
    }
  }

  function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-xl font-semibold text-[var(--narrative-text)] mb-2">
        Treatment Timeline
      </h2>
      <p className="text-sm text-[var(--narrative-text-secondary)] mb-8">
        Your treatment is organized into phases based on priority. Set target dates for each phase.
      </p>

      <div className="space-y-6">
        {phaseGroups.map((group) => {
          const meta = phaseMeta[group.phase as keyof typeof phaseMeta];
          return (
            <div
              key={group.phase}
              className="rounded-2xl border border-[var(--narrative-border)] bg-[var(--narrative-surface)] overflow-hidden"
            >
              {/* Phase Header */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ borderLeft: `4px solid ${group.color}` }}
              >
                <div>
                  <h3 className="text-lg font-medium text-[var(--narrative-text)]">
                    {meta.label}
                  </h3>
                  <p className="text-sm text-[var(--narrative-text-secondary)] mt-0.5">
                    {meta.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--narrative-text-secondary)]" />
                  <Input
                    type="date"
                    className="w-40 h-9 text-sm"
                    value={group.items[0]?.phase_date || ''}
                    onChange={(e) => {
                      // Update all items in this phase
                      group.items.forEach((item) => {
                        handleDateChange(item.id, e.target.value);
                      });
                    }}
                  />
                </div>
              </div>

              {/* Treatments */}
              <div className="px-6 pb-4">
                {group.items.length === 0 ? (
                  <p className="text-sm text-[var(--narrative-text-secondary)] py-4">
                    No treatments in this phase
                  </p>
                ) : (
                  <ul className="divide-y divide-[var(--narrative-border)]">
                    {group.items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          {item.tooth_number && (
                            <span
                              className="w-7 h-7 rounded-lg text-[11px] font-bold flex items-center justify-center text-white flex-shrink-0"
                              style={{ backgroundColor: group.color }}
                            >
                              {item.tooth_number}
                            </span>
                          )}
                          <div>
                            <p className="text-sm font-medium text-[var(--narrative-text)]">
                              {item.treatment_name}
                            </p>
                            <p className="text-xs text-[var(--narrative-text-secondary)]">
                              {item.diagnosis}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-[var(--narrative-text-secondary)]">
                          {formatDuration(item.duration_minutes)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Phase Totals */}
                {group.items.length > 0 && (
                  <div className="flex justify-between items-center pt-3 mt-1 border-t border-[var(--narrative-border)]">
                    <span className="text-sm text-[var(--narrative-text-secondary)]">
                      {formatDuration(group.totalDurationMinutes)} total
                    </span>
                    <span className="text-sm font-semibold text-[var(--narrative-text)]">
                      ${(group.totalFeeCents / 100).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button
          variant="ghost"
          onClick={() => navigate(`/narrative/${planId}/build`)}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Builder
        </Button>
        <Button
          onClick={() => navigate(`/narrative/${planId}/present`)}
          className="bg-narrative-gold hover:bg-narrative-gold-light text-white gap-2"
        >
          Continue to Presentation
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
