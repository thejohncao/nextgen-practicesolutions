import { type AssessmentConfig, defaultScoreBands } from "@/lib/assessment-types";

export const speedToLeadConfig: AssessmentConfig = {
  slug: "speed-to-lead",
  title: "Speed-to-Lead & Front Desk Assessment",
  subtitle:
    "Evaluate your inbound lead handling, call response times, multi-channel coverage, and booking conversion. The average practice misses 30% of inbound calls.",
  scoreBands: defaultScoreBands,
  solutionMappings: [
    { gap: "Call Handling & Availability", solution: "Speed-to-Lead", route: "/solutions/speed-to-lead" },
    { gap: "Lead Response Speed", solution: "Speed-to-Lead", route: "/solutions/speed-to-lead" },
    { gap: "Multi-Channel Coverage", solution: "AI Front Desk", route: "/solutions/ai-front-desk" },
    { gap: "Booking Conversion & Recovery", solution: "Recall Engine", route: "/solutions/recall" },
  ],
  revenueFraming: {
    headline: "What missed leads are costing you",
    description:
      "The average practice misses 30% of inbound calls. At $300-500 LTV per new patient, 10 missed calls per week equals $150K-$250K per year in lost revenue. Speed-to-lead isn't just about efficiency — it's about capturing revenue that's already trying to reach you.",
  },
  pillars: [
    {
      name: "Call Handling & Availability",
      questions: [
        { id: "stl-ch-1", pillar: "Call Handling & Availability", question: "Do you have a live answer rate above 90% during business hours?" },
        { id: "stl-ch-2", pillar: "Call Handling & Availability", question: "Do you have after-hours phone coverage (live answering service or AI)?" },
        { id: "stl-ch-3", pillar: "Call Handling & Availability", question: "Do your front desk team members follow documented call scripts for new patient inquiries?" },
        { id: "stl-ch-4", pillar: "Call Handling & Availability", question: "Is your average hold time under 30 seconds?" },
        { id: "stl-ch-5", pillar: "Call Handling & Availability", question: "Do you have a documented voicemail protocol with callback time commitments?" },
        { id: "stl-ch-6", pillar: "Call Handling & Availability", question: "Do you record and QA review patient calls regularly?" },
        { id: "stl-ch-7", pillar: "Call Handling & Availability", question: "Can you handle calls in multiple languages if your patient base requires it?" },
        { id: "stl-ch-8", pillar: "Call Handling & Availability", question: "Do you use dedicated phone lines by marketing campaign to track source?" },
        { id: "stl-ch-9", pillar: "Call Handling & Availability", question: "Do you have warm transfer protocols so callers don't get bounced between staff?" },
        { id: "stl-ch-10", pillar: "Call Handling & Availability", question: "Is caller ID integrated with your CRM/PMS so staff see patient context before answering?" },
      ],
    },
    {
      name: "Lead Response Speed",
      questions: [
        { id: "stl-lr-1", pillar: "Lead Response Speed", question: "Do you respond to web form submissions within 5 minutes during business hours?" },
        { id: "stl-lr-2", pillar: "Lead Response Speed", question: "Do you call back missed calls within 15 minutes?" },
        { id: "stl-lr-3", pillar: "Lead Response Speed", question: "Do you respond to chat/text inquiries within 2 minutes?" },
        { id: "stl-lr-4", pillar: "Lead Response Speed", question: "Do you have automated lead capture for after-hours inquiries?" },
        { id: "stl-lr-5", pillar: "Lead Response Speed", question: "Do you have weekend and holiday coverage for new patient inquiries?" },
        { id: "stl-lr-6", pillar: "Lead Response Speed", question: "Do you have documented response time SLAs for each communication channel?" },
        { id: "stl-lr-7", pillar: "Lead Response Speed", question: "Do you have an escalation protocol for high-value leads (e.g., cosmetic, implant inquiries)?" },
        { id: "stl-lr-8", pillar: "Lead Response Speed", question: "Do leads receive an automated acknowledgment immediately upon inquiry?" },
        { id: "stl-lr-9", pillar: "Lead Response Speed", question: "Do you identify the lead source at first contact?" },
        { id: "stl-lr-10", pillar: "Lead Response Speed", question: "Do you benchmark your response speed against industry standards?" },
      ],
    },
    {
      name: "Multi-Channel Coverage",
      questions: [
        { id: "stl-mc-1", pillar: "Multi-Channel Coverage", question: "Is your phone monitored continuously during business hours (no gaps)?" },
        { id: "stl-mc-2", pillar: "Multi-Channel Coverage", question: "Do you offer SMS/text communication with patients and prospects?" },
        { id: "stl-mc-3", pillar: "Multi-Channel Coverage", question: "Do you have web chat (live or AI-powered) on your website?" },
        { id: "stl-mc-4", pillar: "Multi-Channel Coverage", question: "Do you monitor and respond to social media DMs (Instagram, Facebook)?" },
        { id: "stl-mc-5", pillar: "Multi-Channel Coverage", question: "Do you have a documented email response workflow with response time targets?" },
        { id: "stl-mc-6", pillar: "Multi-Channel Coverage", question: "Is online scheduling integrated and prominently displayed on your website?" },
        { id: "stl-mc-7", pillar: "Multi-Channel Coverage", question: "Do you have a review response workflow for Google, Yelp, and other platforms?" },
        { id: "stl-mc-8", pillar: "Multi-Channel Coverage", question: "Do you monitor and respond to Google Business Profile messages?" },
        { id: "stl-mc-9", pillar: "Multi-Channel Coverage", question: "Do you have after-hours coverage across all communication channels?" },
        { id: "stl-mc-10", pillar: "Multi-Channel Coverage", question: "Do you have channel-specific scripts and response templates?" },
      ],
    },
    {
      name: "Booking Conversion & Recovery",
      questions: [
        { id: "stl-bc-1", pillar: "Booking Conversion & Recovery", question: "Do you track your lead-to-booking conversion rate?" },
        { id: "stl-bc-2", pillar: "Booking Conversion & Recovery", question: "Do you track and actively manage your no-show and cancellation rate?" },
        { id: "stl-bc-3", pillar: "Booking Conversion & Recovery", question: "Do you have a same-day fill protocol for cancellations?" },
        { id: "stl-bc-4", pillar: "Booking Conversion & Recovery", question: "Do you have automated no-show follow-up (call, text, or email)?" },
        { id: "stl-bc-5", pillar: "Booking Conversion & Recovery", question: "Do you have a cancellation recovery sequence to rebook within 48 hours?" },
        { id: "stl-bc-6", pillar: "Booking Conversion & Recovery", question: "Do you maintain and actively work a waitlist for high-demand slots?" },
        { id: "stl-bc-7", pillar: "Booking Conversion & Recovery", question: "Do you send appointment confirmation at 48hr, 24hr, and day-of?" },
        { id: "stl-bc-8", pillar: "Booking Conversion & Recovery", question: "Do you send new patient pre-visit communication (what to expect, forms, directions)?" },
        { id: "stl-bc-9", pillar: "Booking Conversion & Recovery", question: "Do you have a second-chance booking sequence for leads who inquired but didn't book?" },
        { id: "stl-bc-10", pillar: "Booking Conversion & Recovery", question: "Do you track booking analytics by source to measure marketing ROI?" },
      ],
    },
  ],
};
