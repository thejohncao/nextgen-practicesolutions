import { usePractice } from '../../context/PracticeContext';
import { academyPrograms, rolePaths, sopLibrary } from '../../data/mock';
import AuditToggleList from './AuditToggleList';

export default function StepAlmaAudit() {
  const { getAlmaItemEnabled, toggleAlmaItem } = usePractice();

  const programItems = academyPrograms.map((p) => ({
    id: p.id,
    name: p.name,
    enabled: getAlmaItemEnabled('programs', p.id),
  }));

  const moduleItems = rolePaths.flatMap((rp) =>
    rp.modules.map((m) => ({
      id: m.id,
      name: `${rp.role}: ${m.name}`,
      enabled: getAlmaItemEnabled('rolePaths', m.id),
    }))
  );

  const sopItems = sopLibrary.map((s) => ({
    id: s.id,
    name: s.title,
    enabled: getAlmaItemEnabled('sops', s.id),
  }));

  return (
    <div>
      <h2 className="text-lg font-bold text-amber-400 mb-1">Alma — Practice Academy</h2>
      <p className="text-sm text-[#6B7280] mb-6">
        Set up training programs, learning paths, and SOPs for the team.
      </p>
      <div className="space-y-4">
        <AuditToggleList
          title="Training Programs"
          subtitle="Active training programs and certifications"
          items={programItems}
          onToggle={(id) => toggleAlmaItem('programs', id)}
          accentColor="bg-amber-400"
        />
        <AuditToggleList
          title="Role Learning Modules"
          subtitle="Per-role training modules"
          items={moduleItems}
          onToggle={(id) => toggleAlmaItem('rolePaths', id)}
          accentColor="bg-amber-400"
        />
        <AuditToggleList
          title="SOP Library"
          subtitle="Standard operating procedures"
          items={sopItems}
          onToggle={(id) => toggleAlmaItem('sops', id)}
          accentColor="bg-amber-400"
        />
      </div>
    </div>
  );
}
