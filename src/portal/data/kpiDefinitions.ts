export interface KPIDefinition {
  id: string;
  label: string;
  unit: string;
  benchAvg: string;
  benchTop: string;
  floor: number;
  top: number;
  inverted?: boolean;
}

export const GROWTH_KPIS: KPIDefinition[] = [
  { id: 'new_patient_leads', label: 'New Patient Leads / Month', unit: '#', benchAvg: '20–30', benchTop: '50–80+', floor: 25, top: 65 },
  { id: 'lead_to_appt_rate', label: 'Lead-to-Appointment Rate', unit: '%', benchAvg: '30–40%', benchTop: '60–70%', floor: 35, top: 65 },
  { id: 'new_patients_booked', label: 'New Patients Booked / Month', unit: '#', benchAvg: '15–25', benchTop: '40–65', floor: 20, top: 52 },
  { id: 'new_patient_show_rate', label: 'New Patient Show Rate', unit: '%', benchAvg: '80–85%', benchTop: '92–95%', floor: 82, top: 93 },
  { id: 'new_patient_noshow_rate', label: 'New Patient No-Show Rate', unit: '%', benchAvg: '15–20%', benchTop: '5–8%', floor: 17, top: 6, inverted: true },
  { id: 'cost_per_lead', label: 'Cost Per Lead', unit: '$', benchAvg: '$50–$150', benchTop: '$25–$50', floor: 100, top: 37, inverted: true },
  { id: 'cost_per_acquisition', label: 'Cost Per Acquisition', unit: '$', benchAvg: '$200–$500', benchTop: '$80–$150', floor: 350, top: 115, inverted: true },
  { id: 'google_reviews', label: 'Google Reviews (Count)', unit: '#', benchAvg: '50–100', benchTop: '300+', floor: 75, top: 300 },
  { id: 'google_rating', label: 'Google Rating', unit: '★', benchAvg: '4.2–4.5', benchTop: '4.8–5.0', floor: 4.35, top: 4.9 },
  { id: 'website_conversion_rate', label: 'Website Conversion Rate', unit: '%', benchAvg: '2–4%', benchTop: '6–10%', floor: 3, top: 8 },
  { id: 'referral_rate', label: 'Referral Rate', unit: '%', benchAvg: '15–25%', benchTop: '30–40%', floor: 20, top: 35 },
];

export const MANAGEMENT_KPIS: KPIDefinition[] = [
  { id: 'monthly_collections', label: 'Monthly Collections', unit: '$', benchAvg: '$150k–$250k', benchTop: '$400k+', floor: 200000, top: 400000 },
  { id: 'monthly_production', label: 'Monthly Production', unit: '$', benchAvg: '$160k–$270k', benchTop: '$425k+', floor: 215000, top: 425000 },
  { id: 'collection_rate', label: 'Collection Rate', unit: '%', benchAvg: '95–97%', benchTop: '98–99%+', floor: 96, top: 98.5 },
  { id: 'avg_production_per_visit', label: 'Avg Production Per Visit', unit: '$', benchAvg: '$250–$400', benchTop: '$500–$700', floor: 325, top: 600 },
  { id: 'schedule_utilization', label: 'Schedule Utilization', unit: '%', benchAvg: '85–90%', benchTop: '94–97%', floor: 87, top: 95 },
  { id: 'hygiene_schedule_weeks', label: 'Hygiene Schedule (Weeks Out)', unit: 'wks', benchAvg: '2–4', benchTop: '6–8', floor: 3, top: 7 },
  { id: 'doctor_schedule_weeks', label: 'Doctor Schedule (Weeks Out)', unit: 'wks', benchAvg: '1–2', benchTop: '3–5', floor: 1.5, top: 4 },
  { id: 'speed_to_lead', label: 'Speed to Lead (Minutes)', unit: 'min', benchAvg: '240–480', benchTop: '<5', floor: 360, top: 5, inverted: true },
  { id: 'missed_calls', label: 'Missed / Unanswered Calls', unit: '%', benchAvg: '25–35%', benchTop: '<10%', floor: 30, top: 10, inverted: true },
  { id: 'same_day_acceptance', label: 'Same-Day Treatment Acceptance', unit: '%', benchAvg: '30–40%', benchTop: '60–75%', floor: 35, top: 67 },
  { id: 'overall_treatment_acceptance', label: 'Overall Treatment Acceptance', unit: '%', benchAvg: '40–55%', benchTop: '75–85%', floor: 47, top: 80 },
  { id: 'unscheduled_treatment', label: 'Unscheduled Treatment', unit: '$', benchAvg: '$200k–$400k', benchTop: '<$80k', floor: 300000, top: 80000, inverted: true },
  { id: 'recall_compliance', label: 'Recall Compliance Rate', unit: '%', benchAvg: '60–70%', benchTop: '85–92%', floor: 65, top: 88 },
  { id: 'reactivation_rate', label: 'Reactivation Rate', unit: '%', benchAvg: '5–10%', benchTop: '20–30%', floor: 7.5, top: 25 },
  { id: 'cancellation_rate', label: 'Cancellation Rate', unit: '%', benchAvg: '10–15%', benchTop: '<5%', floor: 12, top: 5, inverted: true },
  { id: 'noshow_rate_all', label: 'No-Show Rate (All Patients)', unit: '%', benchAvg: '8–12%', benchTop: '<3%', floor: 10, top: 3, inverted: true },
  { id: 'accounts_receivable_days', label: 'Accounts Receivable (Days)', unit: 'days', benchAvg: '30–45', benchTop: '<20', floor: 37, top: 20, inverted: true },
];

export const DEVELOPMENT_KPIS: KPIDefinition[] = [
  { id: 'high_value_case_acceptance', label: 'High-Value Case Acceptance', unit: '%', benchAvg: '25–35%', benchTop: '55–70%', floor: 30, top: 62 },
  { id: 'avg_case_value_presented', label: 'Avg Case Value Presented', unit: '$', benchAvg: '$3k–$5k', benchTop: '$6k–$10k', floor: 4000, top: 8000 },
  { id: 'avg_case_value_accepted', label: 'Avg Case Value Accepted', unit: '$', benchAvg: '$1.5k–$2.5k', benchTop: '$4k–$6k', floor: 2000, top: 5000 },
  { id: 'fd_booking_conversion', label: 'FD Booking Conversion', unit: '%', benchAvg: '50–60%', benchTop: '80–90%', floor: 55, top: 85 },
  { id: 'tc_presentation_close', label: 'TC Presentation-to-Close', unit: '%', benchAvg: '40–50%', benchTop: '70–80%', floor: 45, top: 75 },
  { id: 'patient_satisfaction', label: 'Patient Satisfaction Score', unit: '/10', benchAvg: '7–8', benchTop: '9.5+', floor: 7.5, top: 9.5 },
  { id: 'team_turnover_rate', label: 'Team Turnover Rate', unit: '%', benchAvg: '20–30%', benchTop: '<10%', floor: 25, top: 10, inverted: true },
  { id: 'training_hours', label: 'Training Hours / Month', unit: 'hrs', benchAvg: '1–2', benchTop: '4–6', floor: 1.5, top: 5 },
];

export const ALL_KPIS = {
  growth: GROWTH_KPIS,
  management: MANAGEMENT_KPIS,
  development: DEVELOPMENT_KPIS,
} as const;
