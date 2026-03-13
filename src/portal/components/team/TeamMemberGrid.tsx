import { Crown, TrendingUp, Settings2, GraduationCap, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AgentName, TeamMember, TeamTask } from '../../types/team';

const agentMeta: Record<AgentName, { label: string; role: string; color: string; dot: string; Icon: React.ElementType }> = {
  giselle: { label: 'Giselle', role: 'Growth', color: 'from-emerald-500 to-emerald-400', dot: 'bg-emerald-400', Icon: TrendingUp },
  miles: { label: 'Miles', role: 'Management', color: 'from-rose-600 to-rose-400', dot: 'bg-rose-400', Icon: Settings2 },
  devon: { label: 'Devon', role: 'Development', color: 'from-indigo-500 to-indigo-400', dot: 'bg-indigo-400', Icon: GraduationCap },
  alma: { label: 'Alma', role: 'Academy', color: 'from-amber-500 to-amber-400', dot: 'bg-amber-400', Icon: BookOpen },
};

const statusStyles: Record<string, { badge: string; label: string }> = {
  idle: { badge: 'bg-[#6B7280]/20 text-[#6B7280]', label: 'Idle' },
  working: { badge: 'bg-emerald-500/20 text-emerald-400', label: 'Working' },
  completed: { badge: 'bg-cyan-500/20 text-cyan-400', label: 'Done' },
};

interface Props {
  members: TeamMember[];
  tasks: TeamTask[];
  leadAgent: AgentName;
  onSelectAgent: (agent: AgentName) => void;
}

export default function TeamMemberGrid({ members, tasks, leadAgent, onSelectAgent }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {members.map((member) => {
        const meta = agentMeta[member.agent];
        const st = statusStyles[member.status];
        const currentTask = member.currentTaskId ? tasks.find((t) => t.id === member.currentTaskId) : null;
        const isLead = member.agent === leadAgent;

        return (
          <button
            key={member.agent}
            onClick={() => onSelectAgent(member.agent)}
            className={cn(
              'bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] p-4 text-left transition-all hover:bg-white/[0.06] hover:border-white/[0.1]',
              isLead && 'ring-1 ring-cyan-500/30',
            )}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className={cn('w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white', meta.color)}>
                <meta.Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-[#F9FAFB] truncate">{meta.label}</span>
                  {isLead && <Crown className="w-3 h-3 text-cyan-400 flex-shrink-0" />}
                </div>
                <span className="text-[11px] text-[#6B7280]">{meta.role}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', st.badge)}>
                {member.status === 'working' && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1 align-middle" />
                )}
                {st.label}
              </span>
              <span className="text-[10px] text-[#6B7280]">{member.tasksCompleted} done</span>
            </div>

            {currentTask && (
              <p className="text-[11px] text-[#9CA3AF] truncate">{currentTask.title}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}
