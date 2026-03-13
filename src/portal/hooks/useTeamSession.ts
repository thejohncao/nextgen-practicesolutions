import { useState, useCallback } from 'react';
import type {
  AgentName,
  TeamSession,
  TeamTask,
  TeamMessage,
  TeamMember,
  TaskStatus,
  TaskPriority,
  AgentStatus,
} from '../types/team';

const STORAGE_KEY = 'ngp_team_session';
const AGENTS: AgentName[] = ['miles', 'giselle', 'devon', 'alma'];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadSession(): TeamSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(session: TeamSession | null) {
  if (session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function useTeamSession() {
  const [session, setSession] = useState<TeamSession | null>(loadSession);

  const persist = useCallback((next: TeamSession | null) => {
    setSession(next);
    saveSession(next);
  }, []);

  const startTeam = useCallback(
    (name: string, lead: AgentName) => {
      const members: TeamMember[] = AGENTS.map((agent) => ({
        agent,
        status: 'idle' as AgentStatus,
        currentTaskId: null,
        tasksCompleted: 0,
      }));
      const newSession: TeamSession = {
        id: generateId(),
        name,
        leadAgent: lead,
        members,
        tasks: [],
        messages: [
          {
            id: generateId(),
            from: 'user',
            to: 'all',
            content: `Team "${name}" started with ${lead} as lead.`,
            timestamp: new Date().toISOString(),
            type: 'status',
          },
        ],
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      persist(newSession);
    },
    [persist],
  );

  const stopTeam = useCallback(() => {
    if (!session) return;
    persist({
      ...session,
      isActive: false,
      members: session.members.map((m) => ({ ...m, status: 'idle', currentTaskId: null })),
      messages: [
        ...session.messages,
        {
          id: generateId(),
          from: 'user',
          to: 'all',
          content: 'Team session ended.',
          timestamp: new Date().toISOString(),
          type: 'status',
        },
      ],
    });
  }, [session, persist]);

  const createTask = useCallback(
    (
      title: string,
      description: string,
      priority: TaskPriority,
      assignedTo: AgentName | null = null,
      dependsOn: string[] = [],
    ) => {
      if (!session) return;
      const task: TeamTask = {
        id: generateId(),
        title,
        description,
        status: 'pending',
        priority,
        assignedTo,
        dependsOn,
        createdAt: new Date().toISOString(),
        completedAt: null,
      };
      const msg: TeamMessage = {
        id: generateId(),
        from: 'user',
        to: assignedTo ?? 'all',
        content: `Task created: "${title}"${assignedTo ? ` → assigned to ${assignedTo}` : ''}`,
        timestamp: new Date().toISOString(),
        type: 'status',
      };
      persist({ ...session, tasks: [...session.tasks, task], messages: [...session.messages, msg] });
    },
    [session, persist],
  );

  const assignTask = useCallback(
    (taskId: string, agent: AgentName) => {
      if (!session) return;
      persist({
        ...session,
        tasks: session.tasks.map((t) => (t.id === taskId ? { ...t, assignedTo: agent } : t)),
        messages: [
          ...session.messages,
          {
            id: generateId(),
            from: 'user',
            to: agent,
            content: `Task "${session.tasks.find((t) => t.id === taskId)?.title}" assigned to ${agent}.`,
            timestamp: new Date().toISOString(),
            type: 'status',
          },
        ],
      });
    },
    [session, persist],
  );

  const claimTask = useCallback(
    (taskId: string, agent: AgentName) => {
      if (!session) return;
      const task = session.tasks.find((t) => t.id === taskId);
      if (!task || task.assignedTo) return;
      persist({
        ...session,
        tasks: session.tasks.map((t) => (t.id === taskId ? { ...t, assignedTo: agent } : t)),
        messages: [
          ...session.messages,
          {
            id: generateId(),
            from: agent,
            to: 'all',
            content: `${agent} claimed task: "${task.title}"`,
            timestamp: new Date().toISOString(),
            type: 'status',
          },
        ],
      });
    },
    [session, persist],
  );

  const isTaskBlocked = useCallback(
    (task: TeamTask): boolean => {
      if (!session || task.dependsOn.length === 0) return false;
      return task.dependsOn.some((depId) => {
        const dep = session.tasks.find((t) => t.id === depId);
        return !dep || dep.status !== 'completed';
      });
    },
    [session],
  );

  const updateTaskStatus = useCallback(
    (taskId: string, status: TaskStatus) => {
      if (!session) return;
      const task = session.tasks.find((t) => t.id === taskId);
      if (!task) return;

      // Prevent starting blocked tasks
      if (status === 'in_progress' && isTaskBlocked(task)) return;

      const updatedTasks = session.tasks.map((t) =>
        t.id === taskId
          ? { ...t, status, completedAt: status === 'completed' ? new Date().toISOString() : t.completedAt }
          : t,
      );

      // Update member statuses based on their tasks
      const updatedMembers = session.members.map((m) => {
        const memberTasks = updatedTasks.filter((t) => t.assignedTo === m.agent);
        const hasInProgress = memberTasks.some((t) => t.status === 'in_progress');
        const completedCount = memberTasks.filter((t) => t.status === 'completed').length;
        const currentInProgress = memberTasks.find((t) => t.status === 'in_progress');

        return {
          ...m,
          status: hasInProgress ? ('working' as AgentStatus) : ('idle' as AgentStatus),
          currentTaskId: currentInProgress?.id ?? null,
          tasksCompleted: completedCount,
        };
      });

      const statusLabel = status === 'in_progress' ? 'started' : status;
      persist({
        ...session,
        tasks: updatedTasks,
        members: updatedMembers,
        messages: [
          ...session.messages,
          {
            id: generateId(),
            from: task.assignedTo ?? 'user',
            to: 'all',
            content: `Task "${task.title}" ${statusLabel}.`,
            timestamp: new Date().toISOString(),
            type: 'status',
          },
        ],
      });
    },
    [session, persist, isTaskBlocked],
  );

  const sendMessage = useCallback(
    (from: AgentName | 'user', to: AgentName | 'all', content: string, type: TeamMessage['type'] = 'message') => {
      if (!session) return;
      persist({
        ...session,
        messages: [
          ...session.messages,
          { id: generateId(), from, to, content, timestamp: new Date().toISOString(), type },
        ],
      });
    },
    [session, persist],
  );

  const setLead = useCallback(
    (agent: AgentName) => {
      if (!session) return;
      persist({
        ...session,
        leadAgent: agent,
        messages: [
          ...session.messages,
          {
            id: generateId(),
            from: 'user',
            to: 'all',
            content: `${agent} is now the team lead.`,
            timestamp: new Date().toISOString(),
            type: 'status',
          },
        ],
      });
    },
    [session, persist],
  );

  const getAgentWorkload = useCallback(
    (agent: AgentName) => {
      if (!session) return { pending: 0, in_progress: 0, completed: 0 };
      const agentTasks = session.tasks.filter((t) => t.assignedTo === agent);
      return {
        pending: agentTasks.filter((t) => t.status === 'pending').length,
        in_progress: agentTasks.filter((t) => t.status === 'in_progress').length,
        completed: agentTasks.filter((t) => t.status === 'completed').length,
      };
    },
    [session],
  );

  const getBlockedTasks = useCallback(() => {
    if (!session) return [];
    return session.tasks.filter((t) => t.status === 'pending' && isTaskBlocked(t));
  }, [session, isTaskBlocked]);

  const progress = session
    ? { total: session.tasks.length, completed: session.tasks.filter((t) => t.status === 'completed').length }
    : { total: 0, completed: 0 };

  return {
    session,
    startTeam,
    stopTeam,
    createTask,
    assignTask,
    claimTask,
    updateTaskStatus,
    sendMessage,
    setLead,
    getAgentWorkload,
    getBlockedTasks,
    isTaskBlocked,
    progress,
  };
}
