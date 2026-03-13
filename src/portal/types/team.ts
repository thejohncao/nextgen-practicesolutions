import type { AgentName } from '@/hooks/ai-chat/useAgentManagement';

export type { AgentName };

export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type AgentStatus = 'idle' | 'working' | 'completed';

export interface TeamTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: AgentName | null;
  dependsOn: string[];
  createdAt: string;
  completedAt: string | null;
}

export interface TeamMessage {
  id: string;
  from: AgentName | 'user';
  to: AgentName | 'all';
  content: string;
  timestamp: string;
  type: 'message' | 'status' | 'broadcast';
}

export interface TeamMember {
  agent: AgentName;
  status: AgentStatus;
  currentTaskId: string | null;
  tasksCompleted: number;
}

export interface TeamSession {
  id: string;
  name: string;
  leadAgent: AgentName;
  members: TeamMember[];
  tasks: TeamTask[];
  messages: TeamMessage[];
  isActive: boolean;
  createdAt: string;
}
