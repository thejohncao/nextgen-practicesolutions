
export interface AgentTool {
  name: string;
  description: string;
  iconUrl: string;
  category: string;
}

export interface AgentToolStack {
  agentName: string;
  tools: AgentTool[];
}

export const agentTools: AgentToolStack[] = [
  {
    agentName: "Miles",
    tools: [
      {
        name: "OpenAI",
        description: "Powers AI conversations and automation",
        iconUrl: "https://cdn.brandfolder.io/BARRH8KO/as/pl546j-7le8zk-838d24/OpenAI_Logo.svg",
        category: "AI & Automations"
      },
      {
        name: "Airtable",
        description: "Database and workflow management",
        iconUrl: "https://www.airtable.com/images/brand/airtable-logo.svg",
        category: "CRM & Patient Management"
      },
      {
        name: "Zapier",
        description: "Workflow automation and integrations",
        iconUrl: "https://cdn.zapier.com/zapier/images/logos/zapier-logo.svg",
        category: "AI & Automations"
      },
      {
        name: "GoHighLevel",
        description: "CRM and patient communication",
        iconUrl: "https://assets.gohighlevel.com/logos/gohighlevel-dark.svg",
        category: "CRM & Patient Management"
      }
    ]
  },
  {
    agentName: "Giselle",
    tools: [
      {
        name: "OpenAI",
        description: "Powers AI conversations and content generation",
        iconUrl: "https://cdn.brandfolder.io/BARRH8KO/as/pl546j-7le8zk-838d24/OpenAI_Logo.svg",
        category: "AI & Automations"
      },
      {
        name: "Meta Ads",
        description: "Patient acquisition through social media",
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/220px-Meta_Platforms_Inc._logo.svg.png",
        category: "Marketing"
      },
      {
        name: "Google Analytics",
        description: "Website and campaign performance tracking",
        iconUrl: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Logo_KeepingUpWithGoogle_1.width-1300.format-webp.webp",
        category: "Marketing"
      },
      {
        name: "Canva",
        description: "Automated content creation and design",
        iconUrl: "https://www.canva.com/img/logos/canva-logo.svg",
        category: "Marketing"
      }
    ]
  },
  {
    agentName: "Devon",
    tools: [
      {
        name: "OpenAI",
        description: "Powers AI conversations and treatment plan analysis",
        iconUrl: "https://cdn.brandfolder.io/BARRH8KO/as/pl546j-7le8zk-838d24/OpenAI_Logo.svg",
        category: "AI & Automations"
      },
      {
        name: "Zapier",
        description: "Treatment plan workflow automation",
        iconUrl: "https://cdn.zapier.com/zapier/images/logos/zapier-logo.svg",
        category: "AI & Automations"
      },
      {
        name: "Notion",
        description: "Case documentation and tracking",
        iconUrl: "https://www.notion.so/cdn-cgi/image/format=webp,width=256/https://www.notion.so/images/logo-ios.png",
        category: "Team Collaboration"
      },
      {
        name: "Twilio",
        description: "SMS and voice follow-up communications",
        iconUrl: "https://www.twilio.com/content/dam/twilio-com/global/en/products/flex/logo-twilio-red.svg",
        category: "Communications"
      }
    ]
  },
  {
    agentName: "Alma",
    tools: [
      {
        name: "Scribe",
        description: "Automated documentation creation",
        iconUrl: "https://scribehow.com/shared/logo_full_color_light.svg",
        category: "Team Collaboration"
      },
      {
        name: "Notion",
        description: "SOP creation and team knowledge base",
        iconUrl: "https://www.notion.so/cdn-cgi/image/format=webp,width=256/https://www.notion.so/images/logo-ios.png",
        category: "Team Collaboration"
      },
      {
        name: "Trainual",
        description: "Staff training and onboarding systems",
        iconUrl: "https://trainual.com/wp-content/uploads/2023/01/trainual-logo.svg",
        category: "Team Collaboration"
      },
      {
        name: "Loom",
        description: "Video training content creation",
        iconUrl: "https://cdn.loom.com/assets/img/loom-logo.svg",
        category: "Team Collaboration"
      }
    ]
  }
];

export const getAgentTools = (agentName: string): AgentTool[] => {
  const agentToolStack = agentTools.find(
    stack => stack.agentName.toLowerCase() === agentName.toLowerCase()
  );
  return agentToolStack?.tools || [];
};
