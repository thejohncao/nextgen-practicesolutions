import { motion } from 'framer-motion';
import type { PhaseGroup } from '../../types';

interface TreatmentSlideProps {
  phaseGroups: PhaseGroup[];
  totalFeeCents: number;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} minutes`;
  if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  return `${hours}h ${mins}m`;
}

export default function TreatmentSlide({ phaseGroups, totalFeeCents }: TreatmentSlideProps) {
  const activePhases = phaseGroups.filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-narrative-gold text-sm tracking-[0.2em] uppercase mb-4"
      >
        Your Personalized Plan
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-display text-5xl md:text-6xl font-light text-narrative-present-text text-center mb-16"
      >
        Your Treatment Journey
      </motion.h1>

      <div className="max-w-3xl w-full space-y-8">
        {activePhases.map((group, idx) => (
          <motion.div
            key={group.phase}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + idx * 0.2 }}
            className="relative pl-8"
          >
            {/* Timeline line */}
            {idx < activePhases.length - 1 && (
              <div
                className="absolute left-[11px] top-8 bottom-0 w-px"
                style={{ backgroundColor: `${group.color}40` }}
              />
            )}

            {/* Timeline dot */}
            <div
              className="absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: group.color }}
            >
              <span className="text-[10px] font-bold text-white">{group.phase}</span>
            </div>

            <div>
              <div className="flex items-baseline gap-3 mb-3">
                <h3
                  className="font-display text-2xl font-light"
                  style={{ color: group.color }}
                >
                  {group.label}
                </h3>
                <span className="text-sm text-narrative-present-text/40 capitalize">
                  {group.priority}
                </span>
              </div>

              <ul className="space-y-2 mb-3">
                {group.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <span className="text-lg text-narrative-present-text/80 font-light">
                      {item.treatment_name}
                    </span>
                    {item.tooth_number && (
                      <span className="text-sm text-narrative-present-text/30">
                        Tooth #{item.tooth_number}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 text-sm text-narrative-present-text/40">
                <span>{formatDuration(group.totalDurationMinutes)}</span>
                <span>&middot;</span>
                <span>${(group.totalFeeCents / 100).toLocaleString()}</span>
                {group.date && (
                  <>
                    <span>&middot;</span>
                    <span>{new Date(group.date).toLocaleDateString()}</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <p className="text-sm text-narrative-present-text/40 mb-1">Total Investment</p>
        <p className="font-display text-4xl text-narrative-gold font-light">
          ${(totalFeeCents / 100).toLocaleString()}
        </p>
      </motion.div>
    </div>
  );
}
