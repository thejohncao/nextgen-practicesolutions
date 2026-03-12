import { usePractice } from '../../context/PracticeContext';
import { giselleAssets, milesWorkflows, devonTools, academyPrograms, sopLibrary, rolePaths } from '../../data/mock';
import { GROWTH_KPIS, MANAGEMENT_KPIS, DEVELOPMENT_KPIS } from '../../data/kpiDefinitions';
import { pillarScore, healthScore, scoreGrade, gradeColor } from '../../utils/kpiScoring';
import { Rocket, TrendingUp, Settings2, GraduationCap, BookOpen, Activity } from 'lucide-react';

export default function StepReviewLaunch() {
  const { activePractice, getItemEnabled, getAlmaItemEnabled, onboardingState } = usePractice();

  const giselleCount = giselleAssets.filter((a) => getItemEnabled('giselle', a.id)).length;
  const milesCount = milesWorkflows.filter((w) => getItemEnabled('miles', w.id)).length;
  const devonCount = devonTools.filter((t) => getItemEnabled('devon', t.id)).length;
  const almaProgCount = academyPrograms.filter((p) => getAlmaItemEnabled('programs', p.id)).length;
  const almaModCount = rolePaths.flatMap((r) => r.modules).filter((m) => getAlmaItemEnabled('rolePaths', m.id)).length;
  const almaSopCount = sopLibrary.filter((s) => getAlmaItemEnabled('sops', s.id)).length;

  const allKpis = onboardingState?.kpis ?? {};
  const growthScore = pillarScore(GROWTH_KPIS, allKpis);
  const mgmtScore = pillarScore(MANAGEMENT_KPIS, allKpis);
  const devScore = pillarScore(DEVELOPMENT_KPIS, allKpis);
  const overall = healthScore([growthScore, mgmtScore, devScore]);

  const growthFilled = GROWTH_KPIS.filter(d => allKpis[d.id]?.current != null).length;
  const mgmtFilled = MANAGEMENT_KPIS.filter(d => allKpis[d.id]?.current != null).length;
  const devFilled = DEVELOPMENT_KPIS.filter(d => allKpis[d.id]?.current != null).length;

  const pillars = [
    { name: 'Giselle — Growth', icon: TrendingUp, color: 'text-emerald-400', count: giselleCount, total: giselleAssets.length, score: growthScore, kpiFilled: growthFilled, kpiTotal: GROWTH_KPIS.length },
    { name: 'Miles — Management', icon: Settings2, color: 'text-rose-400', count: milesCount, total: milesWorkflows.length, score: mgmtScore, kpiFilled: mgmtFilled, kpiTotal: MANAGEMENT_KPIS.length },
    { name: 'Devon — Development', icon: GraduationCap, color: 'text-indigo-400', count: devonCount, total: devonTools.length, score: devScore, kpiFilled: devFilled, kpiTotal: DEVELOPMENT_KPIS.length },
    { name: 'Alma — Academy', icon: BookOpen, color: 'text-amber-400', count: almaProgCount + almaModCount + almaSopCount, total: academyPrograms.length + rolePaths.flatMap((r) => r.modules).length + sopLibrary.length, score: null, kpiFilled: 0, kpiTotal: 0 },
  ];

  const totalActive = pillars.reduce((s, p) => s + p.count, 0);
  const totalAll = pillars.reduce((s, p) => s + p.total, 0);

  return (
    <div>
      <h2 className="text-lg font-bold text-[#F9FAFB] mb-1">Review & Launch</h2>
      <p className="text-sm text-[#6B7280] mb-6">
        Here's a summary of {activePractice.name}'s onboarding audit.
      </p>

      {/* Practice Health Score */}
      {overall !== null && (
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[#F5A623]" />
            <span className="text-sm font-semibold text-[#F9FAFB]">Practice Health Score</span>
          </div>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span
              className="text-4xl font-bold"
              style={{ color: gradeColor(scoreGrade(overall)) }}
            >
              {Math.round(overall)}
            </span>
            <span
              className="text-xl font-bold px-3 py-1 rounded-lg"
              style={{
                color: gradeColor(scoreGrade(overall)),
                backgroundColor: gradeColor(scoreGrade(overall)) + '18',
              }}
            >
              {scoreGrade(overall)}
            </span>
          </div>
          <div className="space-y-2">
            {pillars.filter(p => p.score !== null).map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p.icon className={`w-4 h-4 ${p.color}`} />
                  <span className="text-sm text-[#E5E7EB]">{p.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6B7280]">{p.kpiFilled}/{p.kpiTotal} KPIs</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: gradeColor(scoreGrade(p.score!)) }}
                  >
                    {Math.round(p.score!)} ({scoreGrade(p.score!)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No KPIs entered yet */}
      {overall === null && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-amber-300">
            No KPI baselines entered yet. Go back to the pillar steps to enter your current metrics.
          </p>
        </div>
      )}

      {/* Systems activation summary */}
      <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-[#F9FAFB]">Systems Activation</span>
          <span className="text-sm text-[#F5A623] font-semibold">{totalActive} / {totalAll}</span>
        </div>

        <div className="w-full h-2 rounded-full bg-white/[0.06] mb-6">
          <div
            className="h-2 rounded-full bg-[#F5A623] transition-all duration-500"
            style={{ width: `${totalAll > 0 ? (totalActive / totalAll) * 100 : 0}%` }}
          />
        </div>

        <div className="space-y-3">
          {pillars.map((p) => (
            <div key={p.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p.icon className={`w-4 h-4 ${p.color}`} />
                <span className="text-sm text-[#F9FAFB]">{p.name}</span>
              </div>
              <span className="text-xs text-[#6B7280] font-medium">{p.count} / {p.total}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-xl p-5 text-center">
        <Rocket className="w-8 h-8 text-[#F5A623] mx-auto mb-3" />
        <p className="text-sm text-[#9CA3AF]">
          You can always update these settings from each pillar page. Click <strong className="text-[#F9FAFB]">Launch Practice</strong> below to enter your portal.
        </p>
      </div>
    </div>
  );
}
