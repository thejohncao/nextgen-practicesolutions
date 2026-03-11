import { usePractice } from '../../context/PracticeContext';
import { milesWorkflows } from '../../data/mock';
import AuditToggleList from './AuditToggleList';

export default function StepMilesAudit() {
  const { getItemEnabled, toggleItem } = usePractice();

  const items = milesWorkflows.map((w) => ({
    id: w.id,
    name: w.name,
    enabled: getItemEnabled('miles', w.id),
  }));

  return (
    <div>
      <h2 className="text-lg font-bold text-rose-400 mb-1">Miles — Practice Management</h2>
      <p className="text-sm text-[#6B7280] mb-6">
        Which operational workflows are currently live at this practice?
      </p>
      <AuditToggleList
        title="Systems / Workflow Status"
        subtitle="Automations, AI systems, and operational processes"
        items={items}
        onToggle={(id) => toggleItem('miles', id)}
        accentColor="bg-rose-400"
      />
    </div>
  );
}
