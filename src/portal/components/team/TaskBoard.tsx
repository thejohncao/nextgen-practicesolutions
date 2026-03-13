import { cn } from '@/lib/utils';
import SectionHeader from '../SectionHeader';
import TaskCard from './TaskCard';
import TaskCreateDialog from './TaskCreateDialog';
import type { AgentName, TeamTask, TaskPriority } from '../../types/team';

const columns: { key: TeamTask['status']; label: string; accent: string }[] = [
  { key: 'pending', label: 'Pending', accent: 'border-t-[#6B7280]' },
  { key: 'in_progress', label: 'In Progress', accent: 'border-t-cyan-400' },
  { key: 'completed', label: 'Completed', accent: 'border-t-emerald-400' },
];

interface Props {
  tasks: TeamTask[];
  isTaskBlocked: (task: TeamTask) => boolean;
  onCreateTask: (
    title: string,
    description: string,
    priority: TaskPriority,
    assignedTo: AgentName | null,
    dependsOn: string[],
  ) => void;
  onAssign: (taskId: string, agent: AgentName) => void;
  onClaim: (taskId: string, agent: AgentName) => void;
  onUpdateStatus: (taskId: string, status: TeamTask['status']) => void;
}

export default function TaskBoard({ tasks, isTaskBlocked, onCreateTask, onAssign, onClaim, onUpdateStatus }: Props) {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Task Board"
        action={<TaskCreateDialog existingTasks={tasks} onCreate={onCreateTask} />}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className={cn('bg-white/[0.02] rounded-xl border border-white/[0.05] border-t-2 p-3 space-y-2', col.accent)}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-[#9CA3AF]">{col.label}</span>
                <span className="text-[10px] text-[#6B7280] bg-white/[0.04] rounded-full px-2 py-0.5">
                  {colTasks.length}
                </span>
              </div>
              {colTasks.length === 0 ? (
                <p className="text-[11px] text-[#6B7280] text-center py-4">No tasks</p>
              ) : (
                colTasks.map((task) => {
                  const blocked = isTaskBlocked(task);
                  const blockedDep = blocked
                    ? tasks.find((t) => task.dependsOn.includes(t.id) && t.status !== 'completed')
                    : undefined;
                  return (
                    <TaskCard
                      key={task.id}
                      task={task}
                      blocked={blocked}
                      blockedByTitle={blockedDep?.title}
                      onAssign={onAssign}
                      onClaim={onClaim}
                      onUpdateStatus={onUpdateStatus}
                    />
                  );
                })
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
