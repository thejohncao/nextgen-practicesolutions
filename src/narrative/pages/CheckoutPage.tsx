import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Sparkles, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNarrativePlan } from '../context/NarrativePlanContext';
import { calculatePricing, FINANCING_OPTIONS, calculateMonthlyPayment, formatCents } from '../lib/pricing';
import { MEMBERSHIP_TIERS } from '../lib/membership';
import type { MembershipTier } from '../types';

export default function CheckoutPage() {
  const { totalFeeCents, patient } = useNarrativePlan();
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();

  const isInsured = patient?.insurance_status === 'insured';
  const isMembership = patient?.insurance_status === 'membership';

  const [insuranceEstimate, setInsuranceEstimate] = useState(isInsured ? 40 : 0);
  const [selectedTier, setSelectedTier] = useState<MembershipTier | null>(
    isMembership ? (patient?.membership_tier || 'glow') : null
  );
  const [selectedFinancing, setSelectedFinancing] = useState(12);

  const pricing = useMemo(
    () =>
      calculatePricing({
        totalFeeCents,
        insuranceEstimatePercent: insuranceEstimate,
        membershipTier: selectedTier,
        financingTermMonths: selectedFinancing,
      }),
    [totalFeeCents, insuranceEstimate, selectedTier, selectedFinancing]
  );

  const waterfallSteps = [
    {
      label: 'Treatment Investment',
      amount: pricing.fullFeeCents,
      color: 'text-[var(--narrative-text)]',
      isDeduction: false,
    },
    ...(pricing.insuranceEstimateCents > 0
      ? [{
          label: 'Insurance Estimate',
          amount: pricing.insuranceEstimateCents,
          color: 'text-green-600',
          isDeduction: true,
        }]
      : []),
    ...(pricing.membershipDiscountCents > 0
      ? [{
          label: `Membership Discount (${selectedTier})`,
          amount: pricing.membershipDiscountCents,
          color: 'text-narrative-gold',
          isDeduction: true,
        }]
      : []),
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold text-[var(--narrative-text)] text-center mb-2">
        Your Investment
      </h2>
      <p className="text-sm text-[var(--narrative-text-secondary)] text-center mb-10">
        A clear breakdown of your treatment costs
      </p>

      {/* Pricing Waterfall */}
      <div className="rounded-2xl border border-[var(--narrative-border)] bg-[var(--narrative-surface)] p-8 mb-8">
        <div className="space-y-4">
          {waterfallSteps.map((step, idx) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="flex items-center justify-between py-2"
            >
              <span className="text-sm text-[var(--narrative-text-secondary)]">{step.label}</span>
              <span className={cn('text-lg font-medium', step.color)}>
                {step.isDeduction ? '−' : ''}{formatCents(step.amount)}
              </span>
            </motion.div>
          ))}

          {/* Divider */}
          <div className="border-t-2 border-[var(--narrative-border)]" />

          {/* Patient Responsibility */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between py-2"
          >
            <span className="text-base font-semibold text-[var(--narrative-text)]">
              Your Responsibility
            </span>
            <span className="text-3xl font-bold text-[var(--narrative-text)]">
              {formatCents(pricing.patientResponsibilityCents)}
            </span>
          </motion.div>

          {/* Monthly Payment */}
          {pricing.monthlyPaymentCents > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center py-2"
            >
              <span className="text-sm text-[var(--narrative-text-secondary)]">
                As low as{' '}
              </span>
              <span className="text-xl font-semibold text-narrative-gold">
                {formatCents(pricing.monthlyPaymentCents)}/mo
              </span>
            </motion.div>
          )}
        </div>

        {/* Insurance Slider */}
        {isInsured && (
          <div className="mt-6 pt-4 border-t border-[var(--narrative-border)]">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-[var(--narrative-text)]">Insurance Coverage Estimate</span>
            </div>
            <input
              type="range"
              min={0}
              max={80}
              step={5}
              value={insuranceEstimate}
              onChange={(e) => setInsuranceEstimate(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-xs text-[var(--narrative-text-secondary)]">
              <span>0%</span>
              <span className="font-medium">{insuranceEstimate}%</span>
              <span>80%</span>
            </div>
          </div>
        )}
      </div>

      {/* Membership Selector (for non-insured patients) */}
      {!isInsured && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-narrative-gold" />
            <h3 className="text-base font-semibold text-[var(--narrative-text)]">
              Membership Plans
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {MEMBERSHIP_TIERS.map((tier) => (
              <button
                key={tier.tier}
                onClick={() => setSelectedTier(selectedTier === tier.tier ? null : tier.tier)}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all narrative-touch',
                  selectedTier === tier.tier
                    ? 'border-narrative-gold bg-narrative-gold/5'
                    : 'border-[var(--narrative-border)] hover:border-narrative-gold/40'
                )}
              >
                <span className="block text-sm font-semibold text-[var(--narrative-text)]">
                  {tier.name}
                </span>
                <span className="block text-lg font-bold text-narrative-gold mt-1">
                  {formatCents(tier.monthlyPriceCents)}/mo
                </span>
                <span className="block text-xs text-[var(--narrative-text-secondary)] mt-1">
                  {tier.discountPercent}% off treatment
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Financing Options */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-4 h-4 text-[var(--narrative-text-secondary)]" />
          <h3 className="text-base font-semibold text-[var(--narrative-text)]">
            Financing Options
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FINANCING_OPTIONS.map((option) => {
            const monthly = calculateMonthlyPayment(
              pricing.patientResponsibilityCents,
              option.termMonths,
              option.aprPercent
            );
            return (
              <button
                key={option.name}
                onClick={() => setSelectedFinancing(option.termMonths)}
                className={cn(
                  'p-3 rounded-xl border-2 text-center transition-all narrative-touch',
                  selectedFinancing === option.termMonths
                    ? 'border-narrative-gold bg-narrative-gold/5'
                    : 'border-[var(--narrative-border)] hover:border-narrative-gold/40'
                )}
              >
                <span className="block text-xs text-[var(--narrative-text-secondary)]">
                  {option.name}
                </span>
                <span className="block text-lg font-bold text-[var(--narrative-text)] mt-1">
                  {formatCents(monthly)}/mo
                </span>
                {option.aprPercent > 0 && (
                  <span className="block text-[10px] text-[var(--narrative-text-secondary)]">
                    {option.aprPercent}% APR
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue */}
      <div className="text-center">
        <Button
          onClick={() => navigate(`/narrative/${planId}/commit`)}
          className="bg-narrative-gold hover:bg-narrative-gold-light text-white gap-2 h-12 px-8 text-base"
        >
          Continue to Decision
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
