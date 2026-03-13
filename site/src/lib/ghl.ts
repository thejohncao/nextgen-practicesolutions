export interface AssessmentLeadData {
  name: string;
  email: string;
  practice_name: string;
  score: number;
  grade: string;
  revenue_leak_estimate: number;
  recommended_package: string;
  category_scores: Record<string, number>;
  weakest_category: string;
  source?: string;
  medium?: string;
  campaign?: string;
}

export async function submitToGHL(data: AssessmentLeadData): Promise<void> {
  const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    // Silently fail — webhook is non-blocking
  }
}
