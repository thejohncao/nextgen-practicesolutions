import { useNarrativePlan } from '../context/NarrativePlanContext';
import { FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExportPage() {
  const { patient, plan, phaseGroups, totalFeeCents } = useNarrativePlan();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-[var(--narrative-text)] text-center mb-8">
        Treatment Storybook
      </h2>

      {/* Preview */}
      <div className="rounded-2xl border border-[var(--narrative-border)] bg-white p-8 mb-6">
        <div className="text-center mb-6 pb-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Treatment Summary
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Prepared for {patient?.first_name} {patient?.last_name}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date().toLocaleDateString()} &middot; {plan?.provider_name}
          </p>
        </div>

        {phaseGroups.filter((g) => g.items.length > 0).map((group) => (
          <div key={group.phase} className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2" style={{ color: group.color }}>
              {group.label}
            </h4>
            <ul className="space-y-1 ml-4">
              {group.items.map((item) => (
                <li key={item.id} className="text-sm text-gray-600">
                  {item.treatment_name}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-6 pt-4 border-t border-gray-100 text-right">
          <p className="text-sm text-gray-500">Total Investment</p>
          <p className="text-2xl font-semibold text-gray-900">
            ${(totalFeeCents / 100).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="text-center">
        <Button className="bg-narrative-gold hover:bg-narrative-gold-light text-white gap-2 narrative-touch">
          <FileDown className="w-4 h-4" />
          Download PDF
        </Button>
        <p className="text-sm text-[var(--narrative-text-secondary)] mt-4">
          Phase 8 will add full PDF generation with html2canvas + jsPDF.
        </p>
      </div>
    </div>
  );
}
