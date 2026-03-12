export interface KPIDefinition {
  id: string;
  label: string;
  unit: string;
  benchmarkFloor: number;
  benchmarkTop: number;
  inverted?: boolean;
}

export const GROWTH_KPIS: KPIDefinition[] = [
  { id: 'new_patients_per_month', label: 'New Patients / Month', unit: 'count', benchmarkFloor: 15, benchmarkTop: 50 },
  { id: 'cost_per_acquisition', label: 'Cost per Acquisition', unit: '$', benchmarkFloor: 300, benchmarkTop: 75, inverted: true },
  { id: 'google_ads_roas', label: 'Google Ads ROAS', unit: 'x', benchmarkFloor: 2, benchmarkTop: 8 },
  { id: 'meta_ads_roas', label: 'Meta Ads ROAS', unit: 'x', benchmarkFloor: 1.5, benchmarkTop: 6 },
  { id: 'website_conversion_rate', label: 'Website Conversion Rate', unit: '%', benchmarkFloor: 2, benchmarkTop: 8 },
  { id: 'google_reviews_count', label: 'Google Reviews', unit: 'count', benchmarkFloor: 50, benchmarkTop: 300 },
  { id: 'google_star_rating', label: 'Google Star Rating', unit: 'stars', benchmarkFloor: 3.5, benchmarkTop: 4.9 },
  { id: 'referral_percentage', label: 'Referral %', unit: '%', benchmarkFloor: 10, benchmarkTop: 40 },
  { id: 'social_followers', label: 'Social Followers', unit: 'count', benchmarkFloor: 500, benchmarkTop: 5000 },
  { id: 'email_open_rate', label: 'Email Open Rate', unit: '%', benchmarkFloor: 15, benchmarkTop: 35 },
  { id: 'monthly_marketing_spend', label: 'Monthly Marketing Spend', unit: '$', benchmarkFloor: 1000, benchmarkTop: 10000 },
];

export const MANAGEMENT_KPIS: KPIDefinition[] = [
  { id: 'speed_to_lead', label: 'Speed to Lead', unit: 'min', benchmarkFloor: 60, benchmarkTop: 5, inverted: true },
  { id: 'answer_rate', label: 'Phone Answer Rate', unit: '%', benchmarkFloor: 60, benchmarkTop: 95 },
  { id: 'booking_rate', label: 'Booking Rate', unit: '%', benchmarkFloor: 40, benchmarkTop: 80 },
  { id: 'no_show_rate', label: 'No-Show Rate', unit: '%', benchmarkFloor: 15, benchmarkTop: 3, inverted: true },
  { id: 'cancellation_rate', label: 'Cancellation Rate', unit: '%', benchmarkFloor: 12, benchmarkTop: 3, inverted: true },
  { id: 'recall_rate', label: 'Recall / Reappointment Rate', unit: '%', benchmarkFloor: 60, benchmarkTop: 92 },
  { id: 'patient_retention_rate', label: 'Patient Retention Rate', unit: '%', benchmarkFloor: 70, benchmarkTop: 95 },
  { id: 'active_patients', label: 'Active Patient Count', unit: 'count', benchmarkFloor: 800, benchmarkTop: 2500 },
  { id: 'monthly_collections', label: 'Monthly Collections', unit: '$', benchmarkFloor: 80000, benchmarkTop: 250000 },
  { id: 'production_per_visit', label: 'Production per Visit', unit: '$', benchmarkFloor: 250, benchmarkTop: 600 },
  { id: 'overhead_percentage', label: 'Overhead %', unit: '%', benchmarkFloor: 70, benchmarkTop: 55, inverted: true },
  { id: 'collections_ratio', label: 'Collections Ratio', unit: '%', benchmarkFloor: 90, benchmarkTop: 99 },
  { id: 'days_in_ar', label: 'Days in A/R', unit: 'days', benchmarkFloor: 45, benchmarkTop: 14, inverted: true },
  { id: 'schedule_utilization', label: 'Schedule Utilization', unit: '%', benchmarkFloor: 70, benchmarkTop: 95 },
  { id: 'hygiene_reappointment', label: 'Hygiene Reappointment %', unit: '%', benchmarkFloor: 75, benchmarkTop: 95 },
  { id: 'treatment_plan_count', label: 'Unscheduled Treatment Plans', unit: 'count', benchmarkFloor: 200, benchmarkTop: 50, inverted: true },
  { id: 'average_wait_time', label: 'Average Wait Time', unit: 'min', benchmarkFloor: 20, benchmarkTop: 5, inverted: true },
];

export const DEVELOPMENT_KPIS: KPIDefinition[] = [
  { id: 'case_acceptance_rate', label: 'Case Acceptance Rate', unit: '%', benchmarkFloor: 40, benchmarkTop: 85 },
  { id: 'average_case_value', label: 'Average Case Value', unit: '$', benchmarkFloor: 800, benchmarkTop: 3000 },
  { id: 'treatment_presented', label: 'Treatment Presented / Month', unit: '$', benchmarkFloor: 100000, benchmarkTop: 400000 },
  { id: 'pending_treatment_value', label: 'Pending Treatment Value', unit: '$', benchmarkFloor: 200000, benchmarkTop: 1000000 },
  { id: 'follow_up_rate', label: 'Follow-Up Contact Rate', unit: '%', benchmarkFloor: 30, benchmarkTop: 80 },
  { id: 'financing_utilization', label: 'Financing Utilization', unit: '%', benchmarkFloor: 10, benchmarkTop: 40 },
  { id: 'restorative_per_hygiene', label: 'Restorative per Hygiene Visit', unit: '$', benchmarkFloor: 100, benchmarkTop: 350 },
  { id: 'same_day_treatment', label: 'Same-Day Treatment %', unit: '%', benchmarkFloor: 15, benchmarkTop: 45 },
];

export const ALL_KPIS = {
  growth: GROWTH_KPIS,
  management: MANAGEMENT_KPIS,
  development: DEVELOPMENT_KPIS,
} as const;
