
export interface AgentResult {
  agent?: string;
  agentName?: string;
  title: string;
  value: string;
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  trendPercentage?: number;
  isPrimary?: boolean;
  description?: string;
  role?: string;
  color?: string;
  results?: AgentResult[];
}

export interface AgentResultCardProps {
  result: AgentResult;
  agent?: string;
  color?: 'blue' | 'green' | 'purple' | 'gold' | 'red';
  index?: number;
  isMobile?: boolean;
  isLightMode?: boolean;
}

// Used for consistency with existing components
export type AgentResultItem = AgentResult;
