import { useNarrativePlan } from '../context/NarrativePlanContext';

export default function PresentPage() {
  const { patient, phaseGroups } = useNarrativePlan();

  const patientName = patient
    ? `${patient.first_name} ${patient.last_name}`
    : 'Patient';

  return (
    <div className="min-h-screen flex items-center justify-center bg-narrative-present-bg text-narrative-present-text">
      <div className="text-center max-w-2xl px-8">
        <h1 className="font-display text-4xl font-light mb-4">
          {patientName}
        </h1>
        <p className="text-narrative-gold text-lg mb-12">Your Treatment Journey</p>

        <div className="text-left space-y-8">
          {phaseGroups.filter(g => g.items.length > 0).map((group) => (
            <div key={group.phase}>
              <h2
                className="font-display text-2xl font-light mb-3"
                style={{ color: group.color }}
              >
                {group.label}
              </h2>
              <ul className="space-y-2 ml-4">
                {group.items.map((item) => (
                  <li key={item.id} className="text-lg text-narrative-present-text/80">
                    {item.treatment_name}
                    {item.tooth_number && (
                      <span className="text-sm text-narrative-present-text/40 ml-2">
                        Tooth #{item.tooth_number}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-sm text-narrative-present-text/30 mt-16">
          Presentation mode — Phase 5 will add full cinematic slides
        </p>
      </div>
    </div>
  );
}
