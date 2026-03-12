import { usePractice } from '../../context/PracticeContext';
import type { KPIDefinition } from '../../data/kpiDefinitions';
import { scoreKPI, pillarScore, scoreGrade, gradeColor } from '../../utils/kpiScoring';

interface Props {
  kpis: KPIDefinition[];
  pillarLabel: string;
  color: string;
}

const COLOR_MAP: Record<string, { border: string; text: string; bg: string }> = {
  emerald: { border: 'border-emerald-500/20', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  rose:    { border: 'border-rose-500/20',    text: 'text-rose-400',    bg: 'bg-rose-500/10' },
  indigo:  { border: 'border-indigo-500/20',  text: 'text-indigo-400',  bg: 'bg-indigo-500/10' },
};

function unitSuffix(unit: string): string {
  if (unit === '%') return '%';
  if (unit === '$') return '$';
  if (unit === 'min') return 'min';
  if (unit === 'days') return 'days';
  if (unit === 'wks') return 'wks';
  if (unit === 'hrs') return 'hrs';
  if (unit === '/10') return '/10';
  if (unit === '★') return '★';
  return '';
}

export default function KPIEntrySection({ kpis, pillarLabel, color }: Props) {
  const { setKPI, getKPI, onboardingState } = usePractice();
  const colors = COLOR_MAP[color] ?? COLOR_MAP.emerald;

  const allKpiData = onboardingState?.kpis ?? {};
  const score = pillarScore(kpis, allKpiData);
  const filledCount = kpis.filter(d => allKpiData[d.id]?.current != null).length;

  const handleChange = (kpiId: string, field: 'current' | 'target', raw: string) => {
    const trimmed = raw.trim();
    if (trimmed === '') {
      setKPI(kpiId, field, null);
    } else {
      const num = parseFloat(trimmed);
      if (!isNaN(num)) setKPI(kpiId, field, num);
    }
  };

  const inputClass =
    'w-full px-3 py-2 rounded-md bg-[#0E1720] border border-white/[0.08] text-sm text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-white/20 transition';

  return (
    <div className="mt-8">
      {/* Section divider */}
      <div className="border-t border-white/[0.06] mb-6" />

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-xs font-semibold ${colors.text} uppercase tracking-wider`}>
          {pillarLabel} KPI Baseline
        </h3>
        <span className={`text-xs font-semibold ${colors.text} uppercase tracking-wider`}>
          {filledCount}/{kpis.length} Entered
        </span>
      </div>
      <p className="text-xs text-[#6B7280] mb-4">Current metrics and 6-month targets</p>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_140px_140px] gap-3 mb-2 px-1">
        <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">KPI</span>
        <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Current (Month 0)</span>
        <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Target (Month 6)</span>
      </div>

      {/* KPI rows */}
      <div className="space-y-0">
        {kpis.map((def, idx) => {
          const entry = getKPI(def.id);
          const kpiScore = scoreKPI(def, entry.current);
          const suffix = unitSuffix(def.unit);

          return (
            <div key={def.id}>
              {idx > 0 && <div className="border-t border-white/[0.04]" />}
              <div className="grid grid-cols-[1fr_140px_140px] gap-3 py-3 px-1 items-center">
                {/* Column 1: KPI name + benchmarks */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#E5E7EB] font-medium">{def.label}</span>
                    {kpiScore !== null && (
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                        style={{
                          color: gradeColor(scoreGrade(kpiScore)),
                          backgroundColor: gradeColor(scoreGrade(kpiScore)) + '18',
                        }}
                      >
                        {Math.round(kpiScore)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-[#F59E0B]">AVG: {def.benchAvg}</span>
                    <span className="text-[10px] text-[#10B981]">TOP: {def.benchTop}</span>
                  </div>
                </div>

                {/* Column 2: Current input */}
                <div className="relative">
                  <input
                    type="number"
                    value={entry.current ?? ''}
                    onChange={(e) => handleChange(def.id, 'current', e.target.value)}
                    placeholder="—"
                    className={inputClass}
                  />
                  {suffix && (
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#6B7280] pointer-events-none">
                      {suffix}
                    </span>
                  )}
                </div>

                {/* Column 3: Target input */}
                <div className="relative">
                  <input
                    type="number"
                    value={entry.target ?? ''}
                    onChange={(e) => handleChange(def.id, 'target', e.target.value)}
                    placeholder="—"
                    className={inputClass}
                  />
                  {suffix && (
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#6B7280] pointer-events-none">
                      {suffix}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pillar score summary */}
      {score !== null && (
        <div className={`mt-4 rounded-lg ${colors.bg} border ${colors.border} px-4 py-3 flex items-center justify-between`}>
          <span className={`text-sm font-medium ${colors.text}`}>{pillarLabel} Score</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold" style={{ color: gradeColor(scoreGrade(score)) }}>
              {Math.round(score)}
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                color: gradeColor(scoreGrade(score)),
                backgroundColor: gradeColor(scoreGrade(score)) + '18',
              }}
            >
              {scoreGrade(score)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
