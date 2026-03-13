import { Crown, Power, PowerOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AgentName, TeamSession } from '../../types/team';

const agentColors: Record<AgentName, string> = {
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
  session: TeamSession;
  onSetLead: (agent: AgentName) => void;
  onStop: () => void;
  progress: { total: number; completed: number };
  blockedCount: number;
}

export default function TeamHeader({ session, onSetLead, onStop, progress, blockedCount }: Props) {
  const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
  const inProgress = session.tasks.filter((t) => t.status === 'in_progress').length;

  return (
    <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#F9FAFB]">{session.name}</h2>
            <p className="text-xs text-[#6B7280]">
              Team Lead:&nbsp;
              <span className="text-[#9CA3AF] font-medium">{agentLabels[session.leadAgent]}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select value={session.leadAgent} onValueChange={(v) => onSetLead(v as AgentName)}>
            <SelectTrigger className="w-[140px] h-8 text-xs bg-white/[0.04] border-white/[0.08] text-[#F9FAFB]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(['miles', 'giselle', 'devon', 'alma'] as AgentName[]).map((a) => (
                <SelectItem key={a} value={a}>
                  <span className="flex items-center gap-2">
                    <span className={cn('w-2 h-2 rounded-full', agentColors[a])} />
                    {agentLabels[a]}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={onStop}
            className="text-xs border-white/[0.08] text-[#9CA3AF] hover:text-red-400 hover:border-red-400/30"
          >
            {session.isActive ? <PowerOff className="w-3.5 h-3.5 mr-1.5" /> : <Power className="w-3.5 h-3.5 mr-1.5" />}
            {session.isActive ? 'Stop Team' : 'Stopped'}
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9CA3AF]">Overall Progress</span>
          <span className="text-[#F9FAFB] font-medium">{pct}%</span>
        </div>
        <Progress value={pct} className="h-2" />
        <div className="flex gap-4 text-[11px] text-[#6B7280]">
          <span>{progress.total} total</span>
          <span className="text-cyan-400">{inProgress} in progress</span>
          <span className="text-emerald-400">{progress.completed} completed</span>
          {blockedCount > 0 && <span className="text-amber-400">{blockedCount} blocked</span>}
        </div>
      </div>
    </div>
  );
}
