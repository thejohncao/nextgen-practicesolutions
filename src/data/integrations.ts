
import { Integration } from '@/types/integrations';

// Categories for filtering
export const categories = [
  "CRM & Patient Management",
  "Scheduling",
  "Billing & Payments",
  "Communications",
  "AI & Automations",
  "Team Collaboration"
];

// Featured integrations shown in the strip below hero section
export const featuredIntegrations: Integration[] = [
  {
    name: "GoHighLevel",
    description: "All-in-one marketing platform and CRM for healthcare practices.",
    logoUrl: "https://assets.website-files.com/61ed56a72e28d0985e1baa91/61f229148578251250194bb1_GoHighLevel-Icon.svg",
    categories: ["CRM & Patient Management", "Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "Zapier",
    description: "Connect apps, automate workflows, and move data.",
    logoUrl: "https://cdn.zapier.com/zapier/images/logos/zapier-logo.svg",
    categories: ["AI & Automations"],
    learnMoreUrl: "#",
  },
  {
    name: "OpenAI",
    description: "Advanced AI models for natural language processing.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    categories: ["AI & Automations"],
    learnMoreUrl: "#",
  },
  {
    name: "Stripe",
    description: "Online payment processing for internet businesses.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    categories: ["Billing & Payments"],
    learnMoreUrl: "#",
  },
  {
    name: "Proceed Finance",
    description: "Patient financing solutions for healthcare providers.",
    logoUrl: "https://www.proceedfinance.com/wp-content/uploads/2021/01/proceed-finance-logo.svg",
    categories: ["Billing & Payments"],
    learnMoreUrl: "#",
  },
  {
    name: "Firebase",
    description: "App development platform that helps you build apps.",
    logoUrl: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
    categories: ["AI & Automations"],
    learnMoreUrl: "#",
  },
  {
    name: "Twilio",
    description: "Communications APIs for SMS, voice, and video.",
    logoUrl: "https://www.vectorlogo.zone/logos/twilio/twilio-icon.svg",
    categories: ["Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "Monday.com",
    description: "Work OS that powers teams to run processes and workflows.",
    logoUrl: "https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/monday-logo-x2.png",
    categories: ["Team Collaboration"],
    learnMoreUrl: "#",
  },
  {
    name: "Notion",
    description: "All-in-one workspace for notes, tasks, wikis, and databases.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    categories: ["Team Collaboration"],
    learnMoreUrl: "#",
  }
];

// All integrations for the main grid
export const integrations: Integration[] = [
  ...featuredIntegrations,
  {
    name: "Google Calendar",
    description: "Seamlessly integrate with your Google Calendar for appointments.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg",
    categories: ["Scheduling"],
    learnMoreUrl: "#",
  },
  {
    name: "Cherry",
    description: "Patient financing and payment options for healthcare.",
    logoUrl: "https://www.cherrycard.com/images/logo.svg",
    categories: ["Billing & Payments"],
    learnMoreUrl: "#",
  },
  {
    name: "Loom",
    description: "Record and share video messages of your screen and camera.",
    logoUrl: "https://cdn.loom.com/assets/marketing-pages/company/loom-logo.svg",
    categories: ["Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "Podium",
    description: "Messaging tools to modernize your local business.",
    logoUrl: "https://assets.website-files.com/5d55f1425cb6b7a18b33c944/5d55f1425cb6b73f2433c99b_logo-white.png",
    categories: ["Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "Typeform",
    description: "Create beautiful online forms, surveys, quizzes, and more.",
    logoUrl: "https://www.vectorlogo.zone/logos/typeform/typeform-icon.svg",
    categories: ["Communications"],
    learnMoreUrl: "#",
  },
  {
    name: "Meta Ads",
    description: "Create ads that run across Facebook, Instagram, and more.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/220px-Meta_Platforms_Inc._logo.svg.png",
    categories: ["CRM & Patient Management"],
    learnMoreUrl: "#",
  },
  {
    name: "Slack",
    description: "Channel-based messaging platform for teams.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/498px-Slack_Technologies_Logo.svg.png",
    categories: ["Team Collaboration", "Communications"],
    learnMoreUrl: "#",
  }
];
