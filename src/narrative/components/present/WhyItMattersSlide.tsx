import { motion } from 'framer-motion';
import type { NarrativePlanItem } from '../../types';

interface WhyItMattersSlideProps {
  items: NarrativePlanItem[];
}

// Map common diagnoses to consequence descriptions
function getConsequence(diagnosis: string): string {
  const lower = diagnosis.toLowerCase();
  if (lower.includes('caries') || lower.includes('decay')) {
    return 'Without treatment, decay continues to spread deeper into the tooth. What starts as a small filling can become a root canal — or even tooth loss.';
  }
  if (lower.includes('pulpitis') || lower.includes('nerve')) {
    return 'An inflamed nerve will not heal on its own. Delaying treatment risks infection spreading to the surrounding bone.';
  }
  if (lower.includes('fracture') || lower.includes('crack')) {
    return 'A fractured tooth weakens with every bite. Without protection, the crack can extend below the gumline — making the tooth unrestorable.';
  }
  if (lower.includes('periodon') || lower.includes('bone loss')) {
    return 'Bone loss is irreversible. Early intervention preserves the bone you have. Waiting means more complex — and more expensive — treatment later.';
  }
  if (lower.includes('abscess') || lower.includes('infection')) {
    return 'Dental infections can spread to other parts of the body. Prompt treatment eliminates the infection and preserves the tooth.';
  }
  if (lower.includes('missing') || lower.includes('extraction')) {
    return 'A missing tooth causes neighboring teeth to shift, changes your bite, and accelerates bone loss in the area.';
  }
  if (lower.includes('impacted')) {
    return 'Impacted teeth can develop cysts, damage adjacent teeth, and cause chronic discomfort if left untreated.';
  }
  if (lower.includes('gingivitis')) {
    return 'Gingivitis is reversible with proper care. Left untreated, it progresses to periodontitis — which is not.';
  }
  return 'Dental conditions rarely improve on their own. Early treatment is simpler, less invasive, and more predictable.';
}

export default function WhyItMattersSlide({ items }: WhyItMattersSlideProps) {
  // Deduplicate by diagnosis
  const uniqueDiagnoses = Array.from(
    new Map(items.map((item) => [item.diagnosis, item])).values()
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-narrative-gold text-sm tracking-[0.2em] uppercase mb-4"
      >
        Understanding Your Health
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-display text-5xl md:text-6xl font-light text-narrative-present-text text-center mb-16"
      >
        Why This Matters
      </motion.h1>

      <div className="max-w-2xl w-full space-y-10">
        {uniqueDiagnoses.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + idx * 0.2 }}
          >
            <h3 className="text-lg text-narrative-gold font-medium mb-2">
              {item.diagnosis}
            </h3>
            <p className="text-lg text-narrative-present-text/70 font-light leading-relaxed">
              {getConsequence(item.diagnosis)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
