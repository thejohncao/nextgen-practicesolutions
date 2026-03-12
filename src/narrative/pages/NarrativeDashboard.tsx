import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Clock, Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { seedNarrativeData } from '../lib/seed';
import type { NarrativePlan, NarrativePatient } from '../types';
import '../styles/narrative.css';

interface PlanWithPatient extends NarrativePlan {
  narrative_patients: NarrativePatient;
}

export default function NarrativeDashboard() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PlanWithPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  async function fetchPlans() {
    try {
      const { data, error } = await supabase
        .from('narrative_plans' as any)
        .select('*, narrative_patients(*)')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setPlans((data || []) as unknown as PlanWithPatient[]);
    } catch (err) {
      console.error('Failed to fetch plans:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  async function handleSeed() {
    setSeeding(true);
    const result = await seedNarrativeData();
    if (result.success) {
      toast.success(result.message);
      fetchPlans();
    } else {
      toast.error(result.message);
    }
    setSeeding(false);
  }

  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-600',
    presented: 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700',
    declined: 'bg-red-100 text-red-700',
    scheduled: 'bg-amber-100 text-amber-700',
    thinking: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="narrative-root min-h-screen" data-narrative-mode="build">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--narrative-text)]">
              Narrative
            </h1>
            <p className="text-sm text-[var(--narrative-text-secondary)] mt-1">
              Treatment acceptance, reimagined
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleSeed}
              disabled={seeding}
              className="gap-2 border-[var(--narrative-border)] text-[var(--narrative-text-secondary)] hover:text-[var(--narrative-text)]"
            >
              <Database className="w-4 h-4" />
              {seeding ? 'Seeding...' : 'Seed Data'}
            </Button>
            <Button
              onClick={() => navigate('/narrative/new')}
              className="bg-narrative-gold hover:bg-narrative-gold-light text-white gap-2 narrative-touch"
            >
              <Plus className="w-4 h-4" />
              New Plan
            </Button>
          </div>
        </div>

        {/* Plan List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-[var(--narrative-border)] animate-pulse" />
            ))}
          </div>
        ) : plans.length === 0 ? (
          <Card className="p-12 text-center border-dashed border-2 border-[var(--narrative-border)] bg-transparent">
            <FileText className="w-12 h-12 mx-auto mb-4 text-[var(--narrative-text-secondary)] opacity-40" />
            <h2 className="text-lg font-medium text-[var(--narrative-text)] mb-2">
              No treatment plans yet
            </h2>
            <p className="text-sm text-[var(--narrative-text-secondary)] mb-6">
              Create your first patient treatment plan to get started.
            </p>
            <Button
              onClick={() => navigate('/narrative/new')}
              className="bg-narrative-gold hover:bg-narrative-gold-light text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              Create First Plan
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {plans.map((plan) => {
              const patient = plan.narrative_patients;
              const patientName = patient
                ? `${patient.first_name} ${patient.last_name}`
                : 'Unknown Patient';

              return (
                <Card
                  key={plan.id}
                  onClick={() => navigate(`/narrative/${plan.id}/build`)}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow border-[var(--narrative-border)] bg-[var(--narrative-surface)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-narrative-gold/10 flex items-center justify-center">
                        <span className="text-narrative-gold font-semibold text-sm">
                          {patient?.first_name?.[0]}{patient?.last_name?.[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-[var(--narrative-text)]">
                          {patientName}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-[var(--narrative-text-secondary)]">
                          <Clock className="w-3 h-3" />
                          {new Date(plan.created_at).toLocaleDateString()}
                          <span>&middot;</span>
                          {plan.provider_name}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        statusColors[plan.status] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {plan.status}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
