import { useNavigate } from 'react-router-dom';
import { useNarrativePlan } from '../context/NarrativePlanContext';

export default function DecisionPage() {
  const navigate = useNavigate();
  const { plan } = useNarrativePlan();

  const decisions = [
    {
      key: 'start_today',
      title: "I'm Ready",
      subtitle: "Let's Start Today",
      color: 'bg-green-500',
    },
    {
      key: 'schedule_later',
      title: "I'd Like to Schedule",
      subtitle: 'Pick a date that works',
      color: 'bg-narrative-gold',
    },
    {
      key: 'think_about_it',
      title: 'I Need to Think',
      subtitle: "I'll get back to you",
      color: 'bg-gray-400',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-[var(--narrative-text)] text-center mb-2">
        Your Decision
      </h2>
      <p className="text-[var(--narrative-text-secondary)] text-center mb-10">
        How would you like to proceed?
      </p>

      <div className="grid grid-cols-3 gap-6">
        {decisions.map((d) => (
          <button
            key={d.key}
            className="p-8 rounded-2xl border-2 border-[var(--narrative-border)] bg-[var(--narrative-surface)] hover:border-narrative-gold transition-all text-center narrative-touch"
          >
            <div className={`w-4 h-4 rounded-full ${d.color} mx-auto mb-4`} />
            <h3 className="text-lg font-medium text-[var(--narrative-text)] mb-1">
              {d.title}
            </h3>
            <p className="text-sm text-[var(--narrative-text-secondary)]">
              {d.subtitle}
            </p>
          </button>
        ))}
      </div>

      <p className="text-sm text-[var(--narrative-text-secondary)] text-center mt-10">
        Phase 7 will add signature capture and status updates.
      </p>
    </div>
  );
}
