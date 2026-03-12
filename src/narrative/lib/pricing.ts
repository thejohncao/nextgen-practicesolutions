import type { MembershipTier, PricingBreakdown } from '../types';
import { getMembershipTier } from './membership';

interface PricingInput {
  totalFeeCents: number;
  insuranceEstimatePercent: number; // 0-100
  membershipTier: MembershipTier | null;
  financingTermMonths: number; // 0 = no financing
}

export function calculatePricing(input: PricingInput): PricingBreakdown {
  const { totalFeeCents, insuranceEstimatePercent, membershipTier, financingTermMonths } = input;

  // Insurance deduction
  const insuranceEstimateCents = Math.round(totalFeeCents * (insuranceEstimatePercent / 100));

  // After insurance
  const afterInsurance = totalFeeCents - insuranceEstimateCents;

  // Membership discount (applied to patient portion after insurance)
  let membershipDiscountCents = 0;
  if (membershipTier) {
    const tier = getMembershipTier(membershipTier);
    membershipDiscountCents = Math.round(afterInsurance * (tier.discountPercent / 100));
  }

  // Patient responsibility
  const patientResponsibilityCents = afterInsurance - membershipDiscountCents;

  // Monthly payment
  let monthlyPaymentCents = 0;
  if (financingTermMonths > 0 && patientResponsibilityCents > 0) {
    monthlyPaymentCents = Math.ceil(patientResponsibilityCents / financingTermMonths);
  }

  return {
    fullFeeCents: totalFeeCents,
    insuranceEstimateCents,
    membershipDiscountCents,
    patientResponsibilityCents,
    monthlyPaymentCents,
    financingTermMonths,
  };
}

export interface FinancingOption {
  name: string;
  provider: 'carecredit' | 'cherry' | 'in_house';
  termMonths: number;
  aprPercent: number;
}

export const FINANCING_OPTIONS: FinancingOption[] = [
  { name: 'CareCredit 12 mo', provider: 'carecredit', termMonths: 12, aprPercent: 0 },
  { name: 'CareCredit 18 mo', provider: 'carecredit', termMonths: 18, aprPercent: 0 },
  { name: 'CareCredit 24 mo', provider: 'carecredit', termMonths: 24, aprPercent: 14.9 },
  { name: 'Cherry 12 mo', provider: 'cherry', termMonths: 12, aprPercent: 0 },
  { name: 'Cherry 24 mo', provider: 'cherry', termMonths: 24, aprPercent: 9.99 },
  { name: 'In-House 6 mo', provider: 'in_house', termMonths: 6, aprPercent: 0 },
  { name: 'In-House 12 mo', provider: 'in_house', termMonths: 12, aprPercent: 0 },
];

export function calculateMonthlyPayment(
  principalCents: number,
  termMonths: number,
  aprPercent: number
): number {
  if (termMonths <= 0 || principalCents <= 0) return 0;
  if (aprPercent === 0) return Math.ceil(principalCents / termMonths);

  const monthlyRate = aprPercent / 100 / 12;
  const payment =
    (principalCents * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);

  return Math.ceil(payment);
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
