import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import * as demoStore from '../lib/demoStore';
import type { InsuranceStatus } from '../types';
import '../styles/narrative.css';

export default function NewPlanPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    insuranceStatus: 'self_pay' as InsuranceStatus,
  });

  const insuranceOptions: { value: InsuranceStatus; label: string; description: string }[] = [
    { value: 'insured', label: 'Insured', description: 'Has dental insurance' },
    { value: 'self_pay', label: 'Self-Pay', description: 'Paying out of pocket' },
    { value: 'membership', label: 'Membership', description: 'Practice membership plan' },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast.error('First and last name are required');
      return;
    }

    setSubmitting(true);

    try {
      const patient = demoStore.createPatient({
        practice_id: 'demo-practice-001',
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        insurance_status: form.insuranceStatus,
        membership_tier: null,
      });

      const plan = demoStore.createPlan({
        patient_id: patient.id,
        practice_id: 'demo-practice-001',
        provider_name: 'Dr. Kansagra',
        status: 'draft',
        decision_at: null,
        signature_data: null,
        notes: null,
      });

      toast.success('Plan created');
      navigate(`/narrative/${plan.id}/build`);
    } catch (err: any) {
      console.error('Failed to create plan:', err);
      toast.error(err?.message || 'Failed to create plan');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="narrative-root min-h-screen" data-narrative-mode="build">
      <div className="max-w-lg mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/narrative')}
            className="p-2 rounded-lg hover:bg-black/5 transition narrative-touch"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--narrative-text-secondary)]" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-[var(--narrative-text)]">
              New Treatment Plan
            </h1>
            <p className="text-sm text-[var(--narrative-text-secondary)]">
              Step 1: Patient Information
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--narrative-text)] mb-1.5">
                First Name *
              </label>
              <Input
                value={form.firstName}
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                placeholder="John"
                className="h-12 text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--narrative-text)] mb-1.5">
                Last Name *
              </label>
              <Input
                value={form.lastName}
                onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                placeholder="Smith"
                className="h-12 text-base"
                required
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-[var(--narrative-text)] mb-1.5">
              Phone
            </label>
            <Input
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="(555) 123-4567"
              type="tel"
              className="h-12 text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--narrative-text)] mb-1.5">
              Email
            </label>
            <Input
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="john@example.com"
              type="email"
              className="h-12 text-base"
            />
          </div>

          {/* Insurance Status */}
          <div>
            <label className="block text-sm font-medium text-[var(--narrative-text)] mb-3">
              Insurance Status
            </label>
            <div className="grid grid-cols-3 gap-3">
              {insuranceOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, insuranceStatus: option.value }))}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-all narrative-touch',
                    form.insuranceStatus === option.value
                      ? 'border-narrative-gold bg-narrative-gold/5'
                      : 'border-[var(--narrative-border)] hover:border-narrative-gold/40'
                  )}
                >
                  <span className="block text-sm font-medium text-[var(--narrative-text)]">
                    {option.label}
                  </span>
                  <span className="block text-xs text-[var(--narrative-text-secondary)] mt-1">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-12 bg-narrative-gold hover:bg-narrative-gold-light text-white text-base font-medium"
          >
            {submitting ? 'Creating...' : 'Start Treatment Plan'}
          </Button>
        </form>
      </div>
    </div>
  );
}
