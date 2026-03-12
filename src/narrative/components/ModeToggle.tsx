import { cn } from '@/lib/utils';
import type { NarrativeMode } from '../types';

interface ModeToggleProps {
  mode: NarrativeMode;
  onToggle: (mode: NarrativeMode) => void;
}

export default function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <div className="flex items-center bg-black/10 rounded-full p-1 narrative-touch">
      <button
        onClick={() => onToggle('build')}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 min-w-[80px]',
          mode === 'build'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        Build
      </button>
      <button
        onClick={() => onToggle('present')}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 min-w-[80px]',
          mode === 'present'
            ? 'bg-narrative-gold text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        Present
      </button>
    </div>
  );
}
