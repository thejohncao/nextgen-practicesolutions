import type { MembershipTier, MembershipTierConfig } from '../types';

export const MEMBERSHIP_TIERS: MembershipTierConfig[] = [
  {
    tier: 'glow',
    name: 'Glow',
    monthlyPriceCents: 9900,
    discountPercent: 10,
    annualAllowanceCents: 120000,
  },
  {
    tier: 'luminate',
    name: 'Luminate',
    monthlyPriceCents: 19900,
    discountPercent: 15,
    annualAllowanceCents: 240000,
  },
  {
    tier: 'radiate',
    name: 'Radiate',
    monthlyPriceCents: 29900,
    discountPercent: 20,
    annualAllowanceCents: 360000,
  },
];

export function getMembershipTier(tier: MembershipTier): MembershipTierConfig {
  return MEMBERSHIP_TIERS.find((t) => t.tier === tier) || MEMBERSHIP_TIERS[0];
}
