import Tooth, { type ToothStatus } from './Tooth';
import { UPPER_TEETH, LOWER_TEETH } from './toothData';
import type { NarrativePlanItem, Phase } from '../../types';

interface ToothChartProps {
  selectedTooth: number | null;
  onSelectTooth: (toothNumber: number) => void;
  items: NarrativePlanItem[];
}

const PHASE_COLORS: Record<Phase, string> = {
  1: '#E85D5D',
  2: '#B68D40',
  3: '#8B8B8B',
};

export default function ToothChart({ selectedTooth, onSelectTooth, items }: ToothChartProps) {
  function getToothStatus(toothNumber: number): { status: ToothStatus; phaseColor?: string } {
    const toothItems = items.filter((item) => item.tooth_number === toothNumber);
    if (toothItems.length > 0) {
      const primaryPhase = toothItems[0].phase as Phase;
      return { status: 'in-plan', phaseColor: PHASE_COLORS[primaryPhase] };
    }
    return { status: 'healthy' };
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Quadrant labels */}
      <div className="w-full flex justify-between text-xs text-[var(--narrative-text-secondary)] px-2">
        <span>Upper Right</span>
        <span>Upper Left</span>
      </div>

      {/* Upper arch */}
      <div className="flex items-end justify-center gap-1 md:gap-1.5">
        {UPPER_TEETH.map((tooth) => {
          const { status, phaseColor } = getToothStatus(tooth.number);
          return (
            <Tooth
              key={tooth.number}
              tooth={tooth}
              status={status}
              phaseColor={phaseColor}
              isSelected={selectedTooth === tooth.number}
              onTap={onSelectTooth}
            />
          );
        })}
      </div>

      {/* Midline divider */}
      <div className="w-full max-w-md h-px bg-[var(--narrative-border)]" />

      {/* Lower arch */}
      <div className="flex items-start justify-center gap-1 md:gap-1.5">
        {LOWER_TEETH.map((tooth) => {
          const { status, phaseColor } = getToothStatus(tooth.number);
          return (
            <Tooth
              key={tooth.number}
              tooth={tooth}
              status={status}
              phaseColor={phaseColor}
              isSelected={selectedTooth === tooth.number}
              onTap={onSelectTooth}
            />
          );
        })}
      </div>

      {/* Quadrant labels */}
      <div className="w-full flex justify-between text-xs text-[var(--narrative-text-secondary)] px-2">
        <span>Lower Left</span>
        <span>Lower Right</span>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-[var(--narrative-text-secondary)]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#D1D5DB]" />
          <span>Healthy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#E85D5D]" />
          <span>Phase 1</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#B68D40]" />
          <span>Phase 2</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#8B8B8B]" />
          <span>Phase 3</span>
        </div>
      </div>
    </div>
  );
}
