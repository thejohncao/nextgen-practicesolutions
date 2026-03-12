import { cn } from '@/lib/utils';
import type { ToothInfo } from './toothData';
import type { Phase } from '../../types';

export type ToothStatus = 'healthy' | 'watch' | 'diagnosed' | 'in-plan';

interface ToothProps {
  tooth: ToothInfo;
  status: ToothStatus;
  phaseColor?: string;
  isSelected: boolean;
  onTap: (toothNumber: number) => void;
}

// Simplified SVG paths for tooth shapes by type
function getToothPath(type: ToothInfo['type'], arch: ToothInfo['arch']): string {
  if (type === 'molar') {
    return arch === 'upper'
      ? 'M8 4 C8 2 12 0 16 0 C20 0 24 2 24 4 L26 22 C26 26 22 28 16 28 C10 28 6 26 6 22 Z'
      : 'M6 6 C6 2 10 0 16 0 C22 0 26 2 26 6 L24 24 C24 26 20 28 16 28 C12 28 8 26 8 24 Z';
  }
  if (type === 'premolar') {
    return arch === 'upper'
      ? 'M10 4 C10 2 12 0 16 0 C20 0 22 2 22 4 L23 22 C23 26 20 28 16 28 C12 28 9 26 9 22 Z'
      : 'M9 6 C9 2 12 0 16 0 C20 0 23 2 23 6 L22 22 C22 26 20 28 16 28 C12 28 10 26 10 22 Z';
  }
  // anterior
  return arch === 'upper'
    ? 'M11 4 C11 1 13 0 16 0 C19 0 21 1 21 4 L22 22 C22 26 20 28 16 28 C12 28 10 26 10 22 Z'
    : 'M10 6 C10 2 13 0 16 0 C19 0 22 2 22 6 L21 22 C21 26 19 28 16 28 C13 28 11 26 11 22 Z';
}

const STATUS_COLORS: Record<ToothStatus, string> = {
  healthy: '#D1D5DB',
  watch: '#F59E0B',
  diagnosed: '#E85D5D',
  'in-plan': '#B68D40',
};

export default function Tooth({ tooth, status, phaseColor, isSelected, onTap }: ToothProps) {
  const fillColor = status === 'in-plan' && phaseColor ? phaseColor : STATUS_COLORS[status];

  return (
    <button
      onClick={() => onTap(tooth.number)}
      className="flex flex-col items-center gap-1 group outline-none narrative-touch"
      aria-label={`Tooth ${tooth.number}: ${tooth.name}`}
    >
      <svg
        viewBox="0 0 32 28"
        className={cn(
          'w-8 h-7 md:w-10 md:h-9 transition-all duration-200',
          isSelected && 'scale-110',
          'group-hover:scale-105 group-active:scale-95'
        )}
      >
        <path
          d={getToothPath(tooth.type, tooth.arch)}
          fill={fillColor}
          stroke={isSelected ? '#B68D40' : 'transparent'}
          strokeWidth={isSelected ? 2 : 0}
          className="transition-colors duration-200"
        />
      </svg>
      <span
        className={cn(
          'text-[10px] font-medium transition-colors',
          isSelected ? 'text-narrative-gold' : 'text-[var(--narrative-text-secondary)]'
        )}
      >
        {tooth.number}
      </span>
    </button>
  );
}
