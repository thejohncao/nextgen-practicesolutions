import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { STEPS } from '../types';

export default function NarrativeNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();

  const currentPath = location.pathname.split('/').pop() || '';

  return (
    <nav className="flex items-center gap-1 px-4">
      {STEPS.filter((s) => s.number > 1).map((step, idx) => {
        const isActive = currentPath === step.path;
        const stepPath = `/narrative/${planId}/${step.path}`;

        return (
          <div key={step.number} className="flex items-center">
            {idx > 0 && (
              <div className="w-8 h-px bg-[var(--narrative-border)] mx-1" />
            )}
            <button
              onClick={() => navigate(stepPath)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all narrative-touch',
                isActive
                  ? 'bg-narrative-gold/10 text-narrative-gold font-medium'
                  : 'text-[var(--narrative-text-secondary)] hover:text-[var(--narrative-text)]'
              )}
            >
              <span
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
                  isActive
                    ? 'bg-narrative-gold text-white'
                    : 'bg-[var(--narrative-border)] text-[var(--narrative-text-secondary)]'
                )}
              >
                {step.number}
              </span>
              <span className="hidden md:inline">{step.label}</span>
            </button>
          </div>
        );
      })}
    </nav>
  );
}
