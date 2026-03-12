import { type AssessmentConfig, defaultScoreBands } from "@/lib/assessment-types";

export const acquisitionConfig: AssessmentConfig = {
  slug: "acquisition",
  title: "Patient Acquisition Readiness Assessment",
  subtitle:
    "Assess your marketing, online presence, paid advertising, and referral systems. Practices investing in marketing without a conversion-optimized website are burning 40-60% of their spend.",
  scoreBands: defaultScoreBands,
  solutionMappings: [
    { gap: "Online Presence & SEO", solution: "Patient Acquisition Engine", route: "/solutions/acquisition" },
    { gap: "Website & Conversion", solution: "Website & Conversion Stack", route: "/solutions/website" },
    { gap: "Paid Advertising & Campaigns", solution: "Patient Acquisition Engine", route: "/solutions/acquisition" },
    { gap: "Referral & Reputation", solution: "Patient Acquisition Engine", route: "/solutions/acquisition" },
  ],
  revenueFraming: {
    headline: "What marketing waste is costing you",
    description:
      "Practices investing in marketing without a conversion-optimized website and proper tracking are burning 40-60% of their spend. If you're spending $5K/month on ads but can't tell which campaigns produce booked patients, you're likely wasting $2K-$3K every month — $24K-$36K per year.",
  },
  pillars: [
    {
      name: "Online Presence & SEO",
      questions: [
        { id: "acq-seo-1", pillar: "Online Presence & SEO", question: "Is your Google Business Profile fully optimized (photos, services, hours, description, Q&A)?" },
        { id: "acq-seo-2", pillar: "Online Presence & SEO", question: "Does your website follow SEO fundamentals (title tags, meta descriptions, H1s, alt text)?" },
        { id: "acq-seo-3", pillar: "Online Presence & SEO", question: "Do you know where you rank in local search for your top 5 target keywords?" },
        { id: "acq-seo-4", pillar: "Online Presence & SEO", question: "Do you have a consistent review generation strategy producing 5+ new reviews per month?" },
        { id: "acq-seo-5", pillar: "Online Presence & SEO", question: "Are you listed and accurate on major directories (Healthgrades, Zocdoc, Yelp, etc.)?" },
        { id: "acq-seo-6", pillar: "Online Presence & SEO", question: "Does your website use schema markup for local business and medical practice?" },
        { id: "acq-seo-7", pillar: "Online Presence & SEO", question: "Do you publish blog content or educational articles at least monthly?" },
        { id: "acq-seo-8", pillar: "Online Presence & SEO", question: "Is your website mobile-optimized with a responsive design?" },
        { id: "acq-seo-9", pillar: "Online Presence & SEO", question: "Does your website load in under 3 seconds on mobile?" },
        { id: "acq-seo-10", pillar: "Online Presence & SEO", question: "Do you appear in Google Maps results for your primary service keywords?" },
      ],
    },
    {
      name: "Website & Conversion",
      questions: [
        { id: "acq-web-1", pillar: "Website & Conversion", question: "Does your website have a clear, prominent primary CTA (book, call, schedule)?" },
        { id: "acq-web-2", pillar: "Website & Conversion", question: "Is online scheduling integrated and accessible from every page?" },
        { id: "acq-web-3", pillar: "Website & Conversion", question: "Is your website designed mobile-first (not just responsive)?" },
        { id: "acq-web-4", pillar: "Website & Conversion", question: "Does your website load in under 3 seconds?" },
        { id: "acq-web-5", pillar: "Website & Conversion", question: "Do you have dedicated service pages for your key procedures (implants, cosmetic, Invisalign, etc.)?" },
        { id: "acq-web-6", pillar: "Website & Conversion", question: "Do you have a before/after gallery or case studies on your website?" },
        { id: "acq-web-7", pillar: "Website & Conversion", question: "Is financing prominently displayed on treatment pages?" },
        { id: "acq-web-8", pillar: "Website & Conversion", question: "Does your website display trust signals (credentials, awards, review ratings, association logos)?" },
        { id: "acq-web-9", pillar: "Website & Conversion", question: "Do you have live chat or AI chat on your website?" },
        { id: "acq-web-10", pillar: "Website & Conversion", question: "Do you track conversions (form fills, calls, bookings) with analytics?" },
      ],
    },
    {
      name: "Paid Advertising & Campaigns",
      questions: [
        { id: "acq-ads-1", pillar: "Paid Advertising & Campaigns", question: "Do you run active paid campaigns (Google Ads, Meta, etc.)?" },
        { id: "acq-ads-2", pillar: "Paid Advertising & Campaigns", question: "Do you track cost per lead for each advertising channel?" },
        { id: "acq-ads-3", pillar: "Paid Advertising & Campaigns", question: "Do you know your cost per booked patient (not just cost per lead)?" },
        { id: "acq-ads-4", pillar: "Paid Advertising & Campaigns", question: "Do you refresh ad creative at least quarterly?" },
        { id: "acq-ads-5", pillar: "Paid Advertising & Campaigns", question: "Do you use dedicated landing pages for paid campaigns (not your homepage)?" },
        { id: "acq-ads-6", pillar: "Paid Advertising & Campaigns", question: "Do you run retargeting/remarketing campaigns for website visitors?" },
        { id: "acq-ads-7", pillar: "Paid Advertising & Campaigns", question: "Do you have a seasonal campaign calendar planned in advance?" },
        { id: "acq-ads-8", pillar: "Paid Advertising & Campaigns", question: "Do you allocate budget by channel based on performance data?" },
        { id: "acq-ads-9", pillar: "Paid Advertising & Campaigns", question: "Do you A/B test ad copy, creative, or landing pages?" },
        { id: "acq-ads-10", pillar: "Paid Advertising & Campaigns", question: "Are you aware of your competitors' advertising strategies?" },
      ],
    },
    {
      name: "Referral & Reputation",
      questions: [
        { id: "acq-ref-1", pillar: "Referral & Reputation", question: "Do you have a systematic workflow for generating patient reviews after visits?" },
        { id: "acq-ref-2", pillar: "Referral & Reputation", question: "Do you respond to all reviews (positive and negative) within 24-48 hours?" },
        { id: "acq-ref-3", pillar: "Referral & Reputation", question: "Do you have a patient referral program with incentives?" },
        { id: "acq-ref-4", pillar: "Referral & Reputation", question: "Do you track which patients and sources generate the most referrals?" },
        { id: "acq-ref-5", pillar: "Referral & Reputation", question: "Do you conduct patient satisfaction surveys (NPS or equivalent)?" },
        { id: "acq-ref-6", pillar: "Referral & Reputation", question: "Do you actively collect case studies and testimonials for marketing?" },
        { id: "acq-ref-7", pillar: "Referral & Reputation", question: "Are you involved in community events or local partnerships for visibility?" },
        { id: "acq-ref-8", pillar: "Referral & Reputation", question: "Do you have a professional referral network (specialists, GPs) with regular outreach?" },
        { id: "acq-ref-9", pillar: "Referral & Reputation", question: "Do you display social proof (review count, rating, testimonials) prominently on your website?" },
        { id: "acq-ref-10", pillar: "Referral & Reputation", question: "Do you have reputation monitoring alerts set up for new reviews and mentions?" },
      ],
    },
  ],
};
