import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useNarrativePlan } from '../context/NarrativePlanContext';
import SignaturePad from '../components/decision/SignaturePad';
import type { DecisionType, PlanStatus } from '../types';

export default function DecisionPage() {
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();
  const { updatePlan, patient } = useNarrativePlan();

  const [selected, setSelected] = useState<DecisionType | null>(null);
  const [showSignature, setShowSignature] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const decisions: { key: DecisionType; title: string; subtitle: string; icon: typeof Check; color: string }[] = [
    {
      key: 'start_today',
      title: "I'm Ready",
      subtitle: "Let's Start Today",
      icon: Check,
      color: 'bg-green-500 border-green-500',
    },
    {
      key: 'schedule_later',
      title: "I'd Like to Schedule",
      subtitle: 'Pick a date that works',
      icon: Calendar,
      color: 'bg-narrative-gold border-narrative-gold',
    },
    {
      key: 'think_about_it',
      title: 'I Need to Think',
      subtitle: "I'll get back to you",
      icon: Clock,
      color: 'bg-gray-400 border-gray-400',
    },
  ];

  async function handleDecision(decision: DecisionType) {
    setSelected(decision);

    if (decision === 'start_today') {
      setShowSignature(true);
    } else {
      const statusMap: Record<DecisionType, PlanStatus> = {
        start_today: 'accepted',
        schedule_later: 'scheduled',
        think_about_it: 'thinking',
      };

      try {
        await updatePlan({
          status: statusMap[decision],
          decision_at: new Date().toISOString(),
        });
        setConfirmed(true);
        toast.success('Decision recorded');
      } catch {
        toast.error('Failed to save decision');
      }
    }
  }

  async function handleSign(signatureData: string) {
    try {
      await updatePlan({
        status: 'accepted',
        decision_at: new Date().toISOString(),
        signature_data: signatureData,
      });
      setShowSignature(false);
      setConfirmed(true);
      toast.success('Plan accepted and signed');
    } catch {
      toast.error('Failed to save signature');
    }
  }

  // Confirmed state
  if (confirmed) {
    const statusMessages: Record<DecisionType, { title: string; message: string }> = {
      start_today: {
        title: 'Your Plan is Confirmed',
        message: "Thank you for taking this step toward better dental health. We're excited to get started.",
      },
      schedule_later: {
        title: "We'll Be in Touch",
        message: 'Our team will reach out to find a time that works best for you.',
      },
      think_about_it: {
        title: 'Take Your Time',
        message: "We understand this is an important decision. We'll follow up with you soon.",
      },
    };

    const msg = statusMessages[selected!];

    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-16 h-16 rounded-full bg-narrative-gold mx-auto mb-6 flex items-center justify-center"
        >
          <Check className="w-8 h-8 text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold text-[var(--narrative-text)] mb-3"
        >
          {msg.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[var(--narrative-text-secondary)] mb-8"
        >
          {msg.message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            onClick={() => navigate(`/narrative/${planId}/export`)}
            className="bg-narrative-gold hover:bg-narrative-gold-light text-white gap-2"
          >
            View Your Storybook
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-[var(--narrative-text)] text-center mb-2">
        Your Decision
      </h2>
      <p className="text-[var(--narrative-text-secondary)] text-center mb-10">
        {patient?.first_name}, how would you like to proceed?
      </p>

      <AnimatePresence mode="wait">
        {showSignature ? (
          <motion.div
            key="signature"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-lg mx-auto"
          >
            <SignaturePad
              onSign={handleSign}
              onCancel={() => {
                setShowSignature(false);
                setSelected(null);
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="choices"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-3 gap-6"
          >
            {decisions.map((d) => {
              const Icon = d.icon;
              return (
                <button
                  key={d.key}
                  onClick={() => handleDecision(d.key)}
                  className={cn(
                    'p-8 rounded-2xl border-2 bg-[var(--narrative-surface)] text-center transition-all narrative-touch hover:scale-[1.02] active:scale-[0.98]',
                    selected === d.key ? d.color : 'border-[var(--narrative-border)] hover:border-narrative-gold'
                  )}
                >
                  <div className={cn(
                    'w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center',
                    selected === d.key ? 'bg-white/20' : 'bg-black/5'
                  )}>
                    <Icon className={cn(
                      'w-6 h-6',
                      selected === d.key ? 'text-white' : 'text-[var(--narrative-text-secondary)]'
                    )} />
                  </div>
                  <h3 className={cn(
                    'text-lg font-medium mb-1',
                    selected === d.key ? 'text-white' : 'text-[var(--narrative-text)]'
                  )}>
                    {d.title}
                  </h3>
                  <p className={cn(
                    'text-sm',
                    selected === d.key ? 'text-white/80' : 'text-[var(--narrative-text-secondary)]'
                  )}>
                    {d.subtitle}
                  </p>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
