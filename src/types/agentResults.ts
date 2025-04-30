
export interface AgentResult {
  agent?: string;
  agentName?: string; // Added to resolve type errors
  title: string;
  value: string;
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  trendPercentage?: number;
  isPrimary?: boolean;
  description?: string;
}

export interface AgentResultCardProps {
  result: AgentResult;
  agent?: string;
  color?: 'blue' | 'green' | 'purple' | 'gold';
}
