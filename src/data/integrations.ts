
import { Integration } from '@/types/integrations';

// Categories for filtering
export const categories = [
  "CRM & Patient Management",
  "Scheduling",
  "Billing & Payments",
  "Communications",
  "AI & Automations",
  "Team Collaboration",
  "Marketing",
  "Dental Specific"
];

// Featured integrations shown in the strip below hero section
export const featuredIntegrations: Integration[] = [
  {
    name: "GoHighLevel",
    description: "Unified CRM for healthcare marketing and patient retention.",
    logoUrl: "/images/integrations/gohighlevel.svg",
    categories: ["CRM & Patient Management", "Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "Zapier",
    description: "Connect NextGen to thousands of healthcare apps without coding.",
    logoUrl: "/images/integrations/zapier.svg",
    categories: ["AI & Automations"],
    learnMoreUrl: "#",
  },
  {
    name: "OpenAI",
    description: "Powering intelligent conversations across all patient touchpoints.",
    logoUrl: "/images/integrations/openai.svg",
    categories: ["AI & Automations"],
    learnMoreUrl: "#",
  },
  {
    name: "Stripe",
    description: "Online payment processing for internet businesses.",
    logoUrl: "/images/integrations/stripe.svg",
    categories: ["Billing & Payments"],
    learnMoreUrl: "#",
  },
  {
    name: "Proceed Finance",
    description: "Flexible financing options for full-arch, cosmetic, and restorative care.",
    logoUrl: "/images/integrations/proceed.svg",
    categories: ["Billing & Payments"],
    learnMoreUrl: "#",
  }
];

// All integrations for the main grid
export const integrations: Integration[] = [
  // Major platforms first
  {
    name: "Salesforce Health Cloud",
    description: "Enterprise-grade CRM for dental groups, DSOs, and large practices.",
    logoUrl: "https://www.salesforce.com/news/wp-content/uploads/sites/3/2021/05/Salesforce-logo.jpg",
    categories: ["CRM & Patient Management"],
    learnMoreUrl: "#",
  },
  {
    name: "OpenAI",
    description: "Powering intelligent conversations across all patient touchpoints.",
    logoUrl: "/images/integrations/openai.svg",
    categories: ["AI & Automations"],
    learnMoreUrl: "#",
  },
  {
    name: "Meta Ads",
    description: "Automate patient lead generation through Meta advertising.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/220px-Meta_Platforms_Inc._logo.svg.png",
    categories: ["Marketing"],
    learnMoreUrl: "#",
  },
  {
    name: "Google Ads",
    description: "Capture high-intent dental patients through optimized PPC funnels.",
    logoUrl: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Logo_KeepingUpWithGoogle_1.width-1300.format-webp.webp",
    categories: ["Marketing"],
    learnMoreUrl: "#",
  },
  // General tech
  {
    name: "GoHighLevel",
    description: "Unified CRM for healthcare marketing and patient retention.",
    logoUrl: "/images/integrations/gohighlevel.svg",
    categories: ["CRM & Patient Management", "Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "Google Calendar",
    description: "Automated smart scheduling for practices and providers.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg",
    categories: ["Scheduling"],
    learnMoreUrl: "#",
  },
  {
    name: "Zapier",
    description: "Connect NextGen to thousands of healthcare apps without coding.",
    logoUrl: "/images/integrations/zapier.svg",
    categories: ["AI & Automations"],
    learnMoreUrl: "#",
  },
  {
    name: "Webflow",
    description: "Build and manage modern healthcare websites seamlessly.",
    logoUrl: "https://assets-global.website-files.com/5e2755779d8b8ea1d6373471/5f83595be5511284c861bbe3_webflow-lockup.svg",
    categories: ["Marketing"],
    learnMoreUrl: "#",
  },
  {
    name: "Mailchimp",
    description: "Engage and nurture patients with branded email campaigns.",
    logoUrl: "https://cdn-images.mailchimp.com/monkey_rewards/grow-business-banner-2x.png",
    categories: ["Marketing", "Communications"],
    learnMoreUrl: "#",
  },
  // Financial integrations
  {
    name: "CareCredit",
    description: "Boost case acceptance with instant patient financing approvals.",
    logoUrl: "https://digital.carecredit.com/wp-content/uploads/2022/03/CCInterestFreePMFINAL-1.png",
    categories: ["Billing & Payments"],
    learnMoreUrl: "#",
  },
  {
    name: "Proceed Finance",
    description: "Flexible financing options for full-arch, cosmetic, and restorative care.",
    logoUrl: "/images/integrations/proceed.svg",
    categories: ["Billing & Payments"],
    learnMoreUrl: "#",
  },
  {
    name: "Cherry",
    description: "Offer patients easy monthly payments with fast approvals.",
    logoUrl: "https://www.cherrycard.com/images/logo.svg",
    categories: ["Billing & Payments"],
    learnMoreUrl: "#",
  },
  {
    name: "Stripe",
    description: "Online payment processing for internet businesses.",
    logoUrl: "/images/integrations/stripe.svg",
    categories: ["Billing & Payments"],
    learnMoreUrl: "#",
  },
  // Collaboration tools
  {
    name: "Slack",
    description: "Channel-based messaging platform for teams.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/498px-Slack_Technologies_Logo.svg.png",
    categories: ["Team Collaboration", "Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "Notion",
    description: "All-in-one workspace for notes, tasks, wikis, and databases.",
    logoUrl: "/images/integrations/notion.svg",
    categories: ["Team Collaboration"],
    learnMoreUrl: "#",
  },
  // Dental-specific
  {
    name: "Dental Intelligence",
    description: "Deep practice analytics and KPIs integrated into patient flow.",
    logoUrl: "https://www.dentalintel.com/wp-content/uploads/sites/2/2021/07/DINT-Logo.svg",
    categories: ["Dental Specific", "CRM & Patient Management"],
    learnMoreUrl: "#",
  },
  {
    name: "Weave",
    description: "Integrated phone, messaging, and payments system for dental offices.",
    logoUrl: "https://d2yy1nggxann9w.cloudfront.net/wp-content/uploads/2020/10/07162625/Weave-Logo-2019-RGB.png",
    categories: ["Dental Specific", "Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "Yapi",
    description: "Patient communication and paperless forms automation.",
    logoUrl: "https://www.yapicentral.com/uploads/1/0/2/7/102731036/yapi-logo-tm_orig.png",
    categories: ["Dental Specific", "Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "Lighthouse 360",
    description: "Patient recall, reminders, and reactivation systems.",
    logoUrl: "https://www.lh360.com/wp-content/themes/lighthouse360/assets/images/logo/charcoal/LH360-logo-charcoal.svg",
    categories: ["Dental Specific", "Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "RevenueWell",
    description: "Automate marketing and communication campaigns for dental offices.",
    logoUrl: "https://www.revenuewell.com/wp-content/themes/revenuewell-2023/images/logo/logo-new.svg",
    categories: ["Dental Specific", "Marketing"],
    learnMoreUrl: "#",
  }
];
