import { useState, useRef, useEffect } from 'react';
import { usePractice } from '../context/PracticeContext';
import { ChevronDown, Check, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PracticeSwitcher() {
  const { activePractice, allPractices, switchPractice, deletePractice, isDemo } = usePractice();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (allPractices.length <= 1) {
    return (
      <span className="font-semibold text-[#F9FAFB] text-sm">{activePractice.name}</span>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition text-sm"
      >
        <span className="font-semibold text-[#F9FAFB]">{activePractice.name}</span>
        <ChevronDown className={cn('w-4 h-4 text-[#6B7280] transition', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-[#1A1B23] border border-white/[0.08] rounded-xl shadow-2xl py-1 z-50">
          {allPractices.map((p) => {
            const active = p.id === (isDemo ? 'demo' : activePractice.id);
            return (
              <div key={p.id} className="flex items-center">
                <button
                  onClick={() => {
                    switchPractice(p.id);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex-1 flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/[0.06] transition text-left',
                    active ? 'text-[#F9FAFB]' : 'text-[#9CA3AF]'
                  )}
                >
                  {active && <Check className="w-3.5 h-3.5 text-[#F5A623]" />}
                  <span className={cn(!active && 'ml-5.5')}>{p.name}</span>
                </button>
                {p.id !== 'demo' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePractice(p.id);
                    }}
                    className="px-3 py-2 text-[#6B7280] hover:text-red-400 transition"
                    title="Delete practice"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
