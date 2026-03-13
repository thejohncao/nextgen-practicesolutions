import { Lock, Play, CheckCircle2, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AgentName, TeamTask } from '../../types/team';

const priorityStyles: Record<string, string> = {
  low: 'bg-[#6B7280]/20 text-[#9CA3AF]',
  medium: 'bg-amber-500/20 text-amber-400',
  high: 'bg-red-500/20 text-red-400',
};

const agentDot: Record<AgentName, string> = {
  giselle: 'bg-emerald-400',
  miles: 'bg-rose-400',
  devon: 'bg-indigo-400',
  alma: 'bg-amber-400',
};

const agentLabels: Record<AgentName, string> = {
  giselle: 'Giselle',
  miles: 'Miles',
  devon: 'Devon',
  alma: 'Alma',
};

interface Props {
  task: TeamTask;
  blocked: boolean;
  blockedByTitle?: string;
  onAssign: (taskId: string, agent: AgentName) => void;
  onClaim: (taskId: string, agent: AgentName) => void;
  onUpdateStatus: (taskId: string, status: TeamTask['status']) => void;
}

export default function TaskCard({ task, blocked, blockedByTitle, onAssign, onUpdateStatus }: Props) {
  return (
    <div
      className={cn(
        'bg-white/[0.03] rounded-lg border border-white/[0.05] p-3 space-y-2 transition-all',
        blocked && 'opacity-60',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {blocked && <Lock className="w-3 h-3 text-amber-400 flex-shrink-0" />}
          <span className="text-sm font-medium text-[#F9FAFB] truncate">{task.title}</span>
        </div>
        <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0', priorityStyles[task.priority])}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-[11px] text-[#6B7280] line-clamp-2">{task.description}</p>
      )}

      {blocked && blockedByTitle && (
        <p className="text-[10px] text-amber-400/80 flex items-center gap-1">
          <Lock className="w-2.5 h-2.5" /> Blocked by: {blockedByTitle}
        </p>
      )}

      <div className="flex items-center justify-between pt-1">
        {/* Assignee */}
        {task.assignedTo ? (
          <span className="flex items-center gap-1.5 text-[11px] text-[#9CA3AF]">
            <span className={cn('w-2 h-2 rounded-full', agentDot[task.assignedTo])} />
            {agentLabels[task.assignedTo]}
          </span>
        ) : (
          <Select onValueChange={(v) => onAssign(task.id, v as AgentName)}>
            <SelectTrigger className="h-6 w-[110px] text-[10px] bg-transparent border-white/[0.08] text-[#6B7280]">
              <UserPlus className="w-3 h-3 mr-1" />
              <SelectValue placeholder="Assign" />
            </SelectTrigger>
            <SelectContent>
              {(['miles', 'giselle', 'devon', 'alma'] as AgentName[]).map((a) => (
                <SelectItem key={a} value={a} className="text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className={cn('w-2 h-2 rounded-full', agentDot[a])} />
                    {agentLabels[a]}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Status actions */}
        <div className="flex gap-1">
          {task.status === 'pending' && !blocked && task.assignedTo && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpdateStatus(task.id, 'in_progress')}
              className="h-6 px-2 text-[10px] text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
            >
              <Play className="w-3 h-3 mr-1" /> Start
            </Button>
          )}
          {task.status === 'in_progress' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpdateStatus(task.id, 'completed')}
              className="h-6 px-2 text-[10px] text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
            >
              <CheckCircle2 className="w-3 h-3 mr-1" /> Complete
            </Button>
          )}
          {task.status === 'completed' && (
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Done
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
