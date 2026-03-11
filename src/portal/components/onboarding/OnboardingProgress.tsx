import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  label: string;
  accent?: string;
}

const STEPS: Step[] = [
  { label: 'Practice Info' },
  { label: 'Giselle — Growth', accent: 'text-emerald-400' },
  { label: 'Miles — Management', accent: 'text-rose-400' },
  { label: 'Devon — Development', accent: 'text-indigo-400' },
  { label: 'Alma — Academy', accent: 'text-amber-400' },
  { label: 'Review & Launch' },
];

export default function OnboardingProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="space-y-1">
      <h2 className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-4">Onboarding Steps</h2>
      {STEPS.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <div key={i} className="flex items-center gap-3 py-2">
            {done ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : active ? (
              <div className="w-5 h-5 rounded-full border-2 border-[#F5A623] flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#F5A623]" />
              </div>
            ) : (
              <Circle className="w-5 h-5 text-[#3A3B45] flex-shrink-0" />
            )}
            <span
              className={cn(
                'text-sm font-medium transition',
                done ? 'text-[#9CA3AF]' : active ? 'text-[#F9FAFB]' : 'text-[#4B5563]',
                active && step.accent
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
