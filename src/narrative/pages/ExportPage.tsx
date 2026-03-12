import { useRef, useState } from 'react';
import { FileDown, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNarrativePlan } from '../context/NarrativePlanContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

export default function ExportPage() {
  const { patient, plan, phaseGroups, totalFeeCents } = useNarrativePlan();
  const navigate = useNavigate();
  const previewRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  async function handleDownloadPDF() {
    if (!previewRef.current) return;
    setGenerating(true);

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#FFFFFF',
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      const patientName = patient
        ? `${patient.first_name}_${patient.last_name}`
        : 'patient';
      pdf.save(`Narrative_${patientName}_${new Date().toISOString().split('T')[0]}.pdf`);

      toast.success('PDF downloaded');
    } catch (err) {
      console.error('PDF generation failed:', err);
      toast.error('Failed to generate PDF');
    } finally {
      setGenerating(false);
    }
  }

  const patientName = patient
    ? `${patient.first_name} ${patient.last_name}`
    : 'Patient';

  const statusLabel = plan?.status === 'accepted' ? 'Accepted' : plan?.status === 'scheduled' ? 'Scheduled' : plan?.status || 'Draft';

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold text-[var(--narrative-text)] text-center mb-8">
        Treatment Storybook
      </h2>

      {/* Printable Preview */}
      <div
        ref={previewRef}
        className="rounded-2xl border border-[var(--narrative-border)] bg-white overflow-hidden mb-6"
      >
        {/* Header Band */}
        <div className="bg-[#1A1A1A] text-white px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-light" style={{ fontFamily: 'Georgia, serif' }}>
                Treatment Summary
              </h3>
              <p className="text-sm text-white/60 mt-1">
                Prepared by {plan?.provider_name || 'Your Provider'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-light text-[#B68D40]" style={{ fontFamily: 'Georgia, serif' }}>
                Narrative
              </p>
              <p className="text-xs text-white/40">NextGen Practice Solutions</p>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Patient</p>
            <p className="text-lg font-medium text-gray-900">{patientName}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Date</p>
            <p className="text-sm font-medium text-gray-700">
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-sm font-medium text-gray-700 capitalize">{statusLabel}</p>
          </div>
        </div>

        {/* Treatment Phases */}
        <div className="px-8 py-6">
          {phaseGroups.filter((g) => g.items.length > 0).map((group) => (
            <div key={group.phase} className="mb-6 last:mb-0">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: group.color }}
                />
                <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                  {group.label} — {group.priority}
                </h4>
              </div>

              <table className="w-full text-sm">
                <tbody>
                  {group.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 text-gray-700">
                        {item.treatment_name}
                        {item.tooth_number && (
                          <span className="text-gray-400 ml-2">#{item.tooth_number}</span>
                        )}
                      </td>
                      <td className="py-2 text-gray-500 text-right w-20">
                        {formatDuration(item.duration_minutes)}
                      </td>
                      <td className="py-2 text-gray-800 text-right font-medium w-24">
                        ${(item.fee_cents / 100).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-500">
                  Phase subtotal: ${(group.totalFeeCents / 100).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="px-8 py-5 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Treatment Investment</span>
            <span className="text-2xl font-semibold text-gray-900">
              ${(totalFeeCents / 100).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 text-center">
          <p className="text-xs text-gray-400">
            This treatment summary is for informational purposes. Fees are estimates and may vary.
            Please contact our office with any questions.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={handleDownloadPDF}
          disabled={generating}
          className="bg-narrative-gold hover:bg-narrative-gold-light text-white gap-2 narrative-touch"
        >
          {generating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FileDown className="w-4 h-4" />
          )}
          {generating ? 'Generating...' : 'Download PDF'}
        </Button>
      </div>
    </div>
  );
}
