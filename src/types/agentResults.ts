
export interface AgentResultItem {
  agent: string;
  role: string;
  color: string;
  title: string;
  description: string;
}

export interface AgentResult {
  agent: string;
  role: string;
  color: string;
  results: {
    title: string;
    description: string;
  }[];
}
