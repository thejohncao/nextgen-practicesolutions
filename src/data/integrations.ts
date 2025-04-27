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
    name: "OpenAI",
    description: "Powers Miles, Giselle, Devon, and Alma AI conversations.",
    logoUrl: "https://cdn.brandfolder.io/BARRH8KO/as/pl546j-7le8zk-838d24/OpenAI_Logo.svg",
    categories: ["AI & Automations"],
    learnMoreUrl: "#",
  },
  {
    name: "Salesforce Health Cloud",
    description: "Enterprise CRM for dental groups and DSOs.",
    logoUrl: "https://www.salesforce.com/content/dam/sfdc-docs/www/logos/logo-salesforce.svg",
    categories: ["CRM & Patient Management"],
    learnMoreUrl: "#",
  },
  {
    name: "Meta Ads",
    description: "Automate new patient generation through Meta platforms.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/220px-Meta_Platforms_Inc._logo.svg.png",
    categories: ["Marketing"],
    learnMoreUrl: "#",
  },
  {
    name: "CareCredit",
    description: "Offer patient financing instantly and boost case acceptance.",
    logoUrl: "https://www.carecredit.com/assets/images/cc_logo_healthcare_consumer_rgb_rev.svg",
    categories: ["Billing & Payments"],
    learnMoreUrl: "#",
  },
  {
    name: "Dental Intelligence",
    description: "Deep practice analytics and patient reactivation systems.",
    logoUrl: "https://www.dentalintel.com/wp-content/uploads/sites/2/2021/07/DINT-Logo.svg",
    categories: ["Dental Specific", "CRM & Patient Management"],
    learnMoreUrl: "#",
  }
];

// All integrations for the main grid
export const integrations: Integration[] = [
  {
    name: "CareCredit",
    description: "Offer patient financing instantly and boost case acceptance.",
    logoUrl: "https://www.carecredit.com/assets/images/cc_logo_healthcare_consumer_rgb_rev.svg",
    categories: ["Billing & Payments"],
    learnMoreUrl: "#",
  },
  {
    name: "Proceed Finance",
    description: "Flexible financing options for large treatment plans.",
    logoUrl: "/images/integrations/proceed.svg",
    categories: ["Billing & Payments"],
    learnMoreUrl: "#",
  },
  {
    name: "Cherry",
    description: "Easy monthly patient payment plans with fast approvals.",
    logoUrl: "https://www.cherrycard.com/images/logo.svg",
    categories: ["Billing & Payments"],
    learnMoreUrl: "#",
  },
  {
    name: "OpenAI",
    description: "Powers Miles, Giselle, Devon, and Alma AI conversations.",
    logoUrl: "https://cdn.brandfolder.io/BARRH8KO/as/pl546j-7le8zk-838d24/OpenAI_Logo.svg",
    categories: ["AI & Automations"],
    learnMoreUrl: "#",
  },
  {
    name: "Webflow",
    description: "Build and manage your practice website with no-code tools.",
    logoUrl: "https://assets-global.website-files.com/5e2755779d8b8ea1d6373471/5f83595be5511284c861bbe3_webflow-lockup.svg",
    categories: ["Marketing"],
    learnMoreUrl: "#",
  },
  {
    name: "Zapier",
    description: "Automate workflows and connect thousands of apps.",
    logoUrl: "https://cdn.zapier.com/zapier/images/logos/zapier-logo.svg",
    categories: ["AI & Automations"],
    learnMoreUrl: "#",
  },
  {
    name: "Google Calendar",
    description: "Smart scheduling and calendar automation.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg",
    categories: ["Scheduling"],
    learnMoreUrl: "#",
  },
  {
    name: "GoHighLevel",
    description: "All-in-one CRM for patient communication and lead management.",
    logoUrl: "https://assets.gohighlevel.com/logos/gohighlevel-dark.svg",
    categories: ["CRM & Patient Management", "Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "Salesforce Health Cloud",
    description: "Enterprise CRM for dental groups and DSOs.",
    logoUrl: "https://www.salesforce.com/news/wp-content/uploads/sites/3/2021/05/Salesforce-logo.jpg",
    categories: ["CRM & Patient Management"],
    learnMoreUrl: "#",
  },
  {
    name: "Meta Ads",
    description: "Automate new patient generation through Meta platforms.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/220px-Meta_Platforms_Inc._logo.svg.png",
    categories: ["Marketing"],
    learnMoreUrl: "#",
  },
  {
    name: "Google Ads",
    description: "High-intent PPC patient acquisition funnels.",
    logoUrl: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Logo_KeepingUpWithGoogle_1.width-1300.format-webp.webp",
    categories: ["Marketing"],
    learnMoreUrl: "#",
  },
  {
    name: "Mailchimp",
    description: "Engage patients with branded email marketing campaigns.",
    logoUrl: "https://cdn-images.mailchimp.com/monkey_rewards/grow-business-banner-2x.png",
    categories: ["Marketing", "Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "Dental Intelligence",
    description: "Deep practice analytics and patient reactivation systems.",
    logoUrl: "https://www.dentalintel.com/wp-content/uploads/sites/2/2021/07/DINT-Logo.svg",
    categories: ["Dental Specific", "CRM & Patient Management"],
    learnMoreUrl: "#",
  },
  {
    name: "Weave",
    description: "Integrated communications platform (phone, SMS, payments).",
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
    description: "Patient recall, reminders, and retention tools.",
    logoUrl: "https://www.lh360.com/wp-content/themes/lighthouse360/assets/images/logo/charcoal/LH360-logo-charcoal.svg",
    categories: ["Dental Specific", "Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "RevenueWell",
    description: "Marketing and communications automation for dental offices.",
    logoUrl: "https://www.revenuewell.com/wp-content/themes/revenuewell-2023/images/logo/logo-new.svg",
    categories: ["Dental Specific", "Marketing"],
    learnMoreUrl: "#",
  }
];
