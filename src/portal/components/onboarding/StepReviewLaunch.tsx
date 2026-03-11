import { usePractice } from '../../context/PracticeContext';
import { giselleAssets, milesWorkflows, devonTools, academyPrograms, sopLibrary, rolePaths } from '../../data/mock';
import { Rocket, TrendingUp, Settings2, GraduationCap, BookOpen } from 'lucide-react';

export default function StepReviewLaunch() {
  const { activePractice, getItemEnabled, getAlmaItemEnabled } = usePractice();

  const giselleCount = giselleAssets.filter((a) => getItemEnabled('giselle', a.id)).length;
  const milesCount = milesWorkflows.filter((w) => getItemEnabled('miles', w.id)).length;
  const devonCount = devonTools.filter((t) => getItemEnabled('devon', t.id)).length;
  const almaProgCount = academyPrograms.filter((p) => getAlmaItemEnabled('programs', p.id)).length;
  const almaModCount = rolePaths.flatMap((r) => r.modules).filter((m) => getAlmaItemEnabled('rolePaths', m.id)).length;
  const almaSopCount = sopLibrary.filter((s) => getAlmaItemEnabled('sops', s.id)).length;

  const pillars = [
    { name: 'Giselle — Growth', icon: TrendingUp, color: 'text-emerald-400', count: giselleCount, total: giselleAssets.length },
    { name: 'Miles — Management', icon: Settings2, color: 'text-rose-400', count: milesCount, total: milesWorkflows.length },
    { name: 'Devon — Development', icon: GraduationCap, color: 'text-indigo-400', count: devonCount, total: devonTools.length },
    { name: 'Alma — Academy', icon: BookOpen, color: 'text-amber-400', count: almaProgCount + almaModCount + almaSopCount, total: academyPrograms.length + rolePaths.flatMap((r) => r.modules).length + sopLibrary.length },
  ];

  const totalActive = pillars.reduce((s, p) => s + p.count, 0);
  const totalAll = pillars.reduce((s, p) => s + p.total, 0);

  return (
    <div>
      <h2 className="text-lg font-bold text-[#F9FAFB] mb-1">Review & Launch</h2>
      <p className="text-sm text-[#6B7280] mb-6">
        Here's a summary of {activePractice.name}'s onboarding audit.
      </p>

      <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-[#F9FAFB]">Overall Activation</span>
          <span className="text-sm text-[#F5A623] font-semibold">{totalActive} / {totalAll}</span>
        </div>

        {/* Progress bar */}
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
