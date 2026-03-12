import { useNarrativePlan } from '../context/NarrativePlanContext';

export default function CheckoutPage() {
  const { totalFeeCents, patient } = useNarrativePlan();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 text-center">
      <h2 className="text-2xl font-semibold text-[var(--narrative-text)] mb-2">
        Your Investment
      </h2>
      <p className="text-[var(--narrative-text-secondary)] mb-8">
        Treatment plan for {patient?.first_name} {patient?.last_name}
      </p>

      <div className="rounded-2xl border border-[var(--narrative-border)] bg-[var(--narrative-surface)] p-8 mb-8">
        <p className="text-sm text-[var(--narrative-text-secondary)] mb-2">Total Treatment Fee</p>
        <p className="text-5xl font-semibold text-[var(--narrative-text)]">
          ${(totalFeeCents / 100).toLocaleString()}
        </p>
      </div>

      <p className="text-sm text-[var(--narrative-text-secondary)]">
        Phase 6 will add the full pricing waterfall, membership discounts, and financing options.
      </p>
    </div>
  );
}
