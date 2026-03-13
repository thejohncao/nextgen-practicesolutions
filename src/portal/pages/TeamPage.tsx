import { useState } from 'react';
import { Users, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTeamSession } from '../hooks/useTeamSession';
import TeamHeader from '../components/team/TeamHeader';
import TeamMemberGrid from '../components/team/TeamMemberGrid';
import TaskBoard from '../components/team/TaskBoard';
import ActivityFeed from '../components/team/ActivityFeed';
import type { AgentName } from '../types/team';

const agentDot: Record<AgentName, string> = {
  giselle: 'bg-emerald-400',
  miles: 'bg-rose-400',
  devon: 'bg-indigo-400',
  alma: 'bg-amber-400',
};

export default function TeamPage() {
  const {
    session,
    startTeam,
    stopTeam,
    createTask,
    assignTask,
    claimTask,
    updateTaskStatus,
    sendMessage,
    setLead,
    getBlockedTasks,
    isTaskBlocked,
    progress,
  } = useTeamSession();

  const [teamName, setTeamName] = useState('');
  const [leadAgent, setLeadAgent] = useState<AgentName>('miles');
  const [selectedAgent, setSelectedAgent] = useState<AgentName | null>(null);

  // Handle selecting an agent from the member grid (focuses the message feed recipient)
  const handleSelectAgent = (agent: AgentName) => {
    setSelectedAgent(agent === selectedAgent ? null : agent);
  };

  // No active session — show start CTA
  if (!session || !session.isActive) {
    return (
      <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] p-8 max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#F9FAFB] mb-2">Start an Agent Team</h2>
              <p className="text-sm text-[#9CA3AF]">
                Coordinate all four agents working together on a shared objective with task management and inter-agent messaging.
              </p>
            </div>
            <div className="space-y-3 text-left">
              <div>
                <label className="text-xs text-[#9CA3AF] mb-1.5 block">Team Name</label>
                <Input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g., Q1 Growth Sprint"
                  className="bg-white/[0.04] border-white/[0.08] text-[#F9FAFB] placeholder:text-[#6B7280]"
                />
              </div>
              <div>
                <label className="text-xs text-[#9CA3AF] mb-1.5 block">Team Lead</label>
                <Select value={leadAgent} onValueChange={(v) => setLeadAgent(v as AgentName)}>
                  <SelectTrigger className="bg-white/[0.04] border-white/[0.08] text-[#F9FAFB]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(['miles', 'giselle', 'devon', 'alma'] as AgentName[]).map((a) => (
                      <SelectItem key={a} value={a}>
                        <span className="flex items-center gap-2">
                          <span className={cn('w-2 h-2 rounded-full', agentDot[a])} />
                          {a.charAt(0).toUpperCase() + a.slice(1)}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={() => startTeam(teamName.trim() || 'Agent Team', leadAgent)}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Launch Team
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const blockedTasks = getBlockedTasks();

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-[#F9FAFB]">Agent Team</h1>
        <p className="text-sm text-[#9CA3AF] mt-1">Coordinate your agents on shared objectives</p>
      </div>

      {/* Team Header */}
      <TeamHeader
        session={session}
        onSetLead={setLead}
        onStop={stopTeam}
        progress={progress}
        blockedCount={blockedTasks.length}
      />

      {/* Agent Grid */}
      <TeamMemberGrid
        members={session.members}
        tasks={session.tasks}
        leadAgent={session.leadAgent}
        onSelectAgent={handleSelectAgent}
      />

      {/* 60/40 split: TaskBoard | ActivityFeed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <TaskBoard
            tasks={session.tasks}
            isTaskBlocked={isTaskBlocked}
            onCreateTask={createTask}
            onAssign={assignTask}
            onClaim={claimTask}
            onUpdateStatus={updateTaskStatus}
          />
        </div>
        <div className="lg:col-span-5">
          <ActivityFeed messages={session.messages} onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}
