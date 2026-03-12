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

function formatUnit(unit: string): string {
  if (unit === '$') return '$';
  if (unit === '%') return '%';
  if (unit === 'x') return 'x';
  return '';
}

function formatBenchmark(value: number, unit: string): string {
  if (unit === '$' && value >= 1000) {
    return '$' + (value >= 1000000 ? (value / 1000000).toFixed(1) + 'M' : (value / 1000).toFixed(0) + 'k');
  }
  if (unit === '$') return '$' + value;
  return value + (unit === '%' ? '%' : unit === 'x' ? 'x' : unit === 'min' ? ' min' : unit === 'days' ? ' days' : unit === 'stars' ? '★' : '');
}

export default function KPIEntrySection({ kpis, pillarLabel, color }: Props) {
  const { setKPI, getKPI, onboardingState } = usePractice();
  const colors = COLOR_MAP[color] ?? COLOR_MAP.emerald;

  const allKpiData = onboardingState?.kpis ?? {};
  const score = pillarScore(kpis, allKpiData);
  const filledCount = kpis.filter(d => allKpiData[d.id]?.current !== null && allKpiData[d.id]?.current !== undefined).length;

  const handleChange = (kpiId: string, field: 'current' | 'target', raw: string) => {
    const trimmed = raw.trim();
    if (trimmed === '') {
      setKPI(kpiId, field, null);
    } else {
      const num = parseFloat(trimmed);
      if (!isNaN(num)) setKPI(kpiId, field, num);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-semibold ${colors.text} uppercase tracking-wide`}>
          {pillarLabel} KPI Baseline
        </h3>
        <span className="text-xs text-[#6B7280]">
          {filledCount} of {kpis.length} entered
        </span>
      </div>

      <div className="space-y-2">
        {kpis.map((def) => {
          const entry = getKPI(def.id);
          const kpiScore = scoreKPI(def, entry.current);
          const prefix = formatUnit(def.unit);
          return (
            <div
              key={def.id}
              className={`rounded-lg border ${colors.border} bg-white/[0.02] px-4 py-3`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-[#E5E7EB] font-medium">{def.label}</span>
                {kpiScore !== null && (
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      color: gradeColor(scoreGrade(kpiScore)),
                      backgroundColor: gradeColor(scoreGrade(kpiScore)) + '18',
                    }}
                  >
                    {Math.round(kpiScore)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-[10px] text-[#6B7280] uppercase tracking-wide mb-0.5 block">
                    Current
                  </label>
                  <div className="relative">
                    {prefix === '$' && (
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-[#6B7280]">$</span>
                    )}
                    <input
                      type="number"
                      value={entry.current ?? ''}
                      onChange={(e) => handleChange(def.id, 'current', e.target.value)}
                      placeholder="—"
                      className={`w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-2 py-1.5 text-sm text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-white/20 ${prefix === '$' ? 'pl-5' : ''}`}
                    />
                    {prefix && prefix !== '$' && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#6B7280]">
                        {prefix}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-[10px] text-[#6B7280] uppercase tracking-wide mb-0.5 block">
                    Target
                  </label>
                  <div className="relative">
                    {prefix === '$' && (
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-[#6B7280]">$</span>
                    )}
                    <input
                      type="number"
                      value={entry.target ?? ''}
                      onChange={(e) => handleChange(def.id, 'target', e.target.value)}
                      placeholder="—"
                      className={`w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-2 py-1.5 text-sm text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-white/20 ${prefix === '$' ? 'pl-5' : ''}`}
                    />
                    {prefix && prefix !== '$' && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#6B7280]">
                        {prefix}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-[#4B5563] mt-1.5">
                Benchmark: {formatBenchmark(def.benchmarkFloor, def.unit)} (floor) → {formatBenchmark(def.benchmarkTop, def.unit)} (top)
                {def.inverted && ' · Lower is better'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Pillar score summary */}
      {score !== null && (
        <div className={`mt-4 rounded-lg ${colors.bg} border ${colors.border} px-4 py-3 flex items-center justify-between`}>
          <span className={`text-sm font-medium ${colors.text}`}>{pillarLabel} Score</span>
          <div className="flex items-center gap-2">
            <span
              className="text-lg font-bold"
              style={{ color: gradeColor(scoreGrade(score)) }}
            >
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
