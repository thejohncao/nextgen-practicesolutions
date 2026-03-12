import { motion } from 'framer-motion';
import type { NarrativePlanItem } from '../../types';

interface ConditionSlideProps {
  items: NarrativePlanItem[];
}

export default function ConditionSlide({ items }: ConditionSlideProps) {
  // Group findings by tooth
  const findings = items.reduce<Record<number, NarrativePlanItem[]>>((acc, item) => {
    const tooth = item.tooth_number || 0;
    if (!acc[tooth]) acc[tooth] = [];
    acc[tooth].push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-narrative-gold text-sm tracking-[0.2em] uppercase mb-4"
      >
        Your Dental Health
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-display text-5xl md:text-6xl font-light text-narrative-present-text text-center mb-16"
      >
        Here&rsquo;s What We Found
      </motion.h1>

      <div className="max-w-2xl w-full space-y-6">
        {Object.entries(findings).map(([tooth, toothItems], idx) => (
          <motion.div
            key={tooth}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + idx * 0.15 }}
            className="flex items-start gap-5"
          >
            <div className="w-12 h-12 rounded-xl bg-narrative-present-surface flex items-center justify-center flex-shrink-0 border border-white/5">
              <span className="text-narrative-gold font-display text-lg">
                {Number(tooth) > 0 ? `#${tooth}` : '—'}
              </span>
            </div>
            <div className="pt-1">
              {toothItems.map((item, i) => (
                <div key={item.id} className={i > 0 ? 'mt-2' : ''}>
                  <p className="text-lg text-narrative-present-text font-light">
                    {item.diagnosis}
                  </p>
                  <p className="text-sm text-narrative-present-text/50">
                    {item.treatment_name} recommended
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
