import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AgentName, TaskPriority, TeamTask } from '../../types/team';

const agentDot: Record<AgentName, string> = {
  giselle: 'bg-emerald-400',
  miles: 'bg-rose-400',
  devon: 'bg-indigo-400',
  alma: 'bg-amber-400',
};

interface Props {
  existingTasks: TeamTask[];
  onCreate: (
    title: string,
    description: string,
    priority: TaskPriority,
    assignedTo: AgentName | null,
    dependsOn: string[],
  ) => void;
}

export default function TaskCreateDialog({ existingTasks, onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assignedTo, setAssignedTo] = useState<string>('none');
  const [dependsOn, setDependsOn] = useState<string>('none');

  const reset = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setAssignedTo('none');
    setDependsOn('none');
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    onCreate(
      title.trim(),
      description.trim(),
      priority,
      assignedTo === 'none' ? null : (assignedTo as AgentName),
      dependsOn === 'none' ? [] : [dependsOn],
    );
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="text-xs bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1A1B23] border-white/[0.08] text-[#F9FAFB] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#F9FAFB]">Create Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <label className="text-xs text-[#9CA3AF] mb-1.5 block">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
              className="bg-white/[0.04] border-white/[0.08] text-[#F9FAFB] placeholder:text-[#6B7280]"
            />
          </div>
          <div>
            <label className="text-xs text-[#9CA3AF] mb-1.5 block">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task..."
              rows={3}
              className="bg-white/[0.04] border-white/[0.08] text-[#F9FAFB] placeholder:text-[#6B7280] resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#9CA3AF] mb-1.5 block">Priority</label>
              <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
                <SelectTrigger className="bg-white/[0.04] border-white/[0.08] text-[#F9FAFB]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-[#9CA3AF] mb-1.5 block">Assign To</label>
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger className="bg-white/[0.04] border-white/[0.08] text-[#F9FAFB]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Unassigned</SelectItem>
                  {(['miles', 'giselle', 'devon', 'alma'] as AgentName[]).map((a) => (
                    <SelectItem key={a} value={a}>
                      <span className="flex items-center gap-1.5">
                        <span className={cn('w-2 h-2 rounded-full', agentDot[a])} />
                        {a.charAt(0).toUpperCase() + a.slice(1)}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {existingTasks.length > 0 && (
            <div>
              <label className="text-xs text-[#9CA3AF] mb-1.5 block">Depends On</label>
              <Select value={dependsOn} onValueChange={setDependsOn}>
                <SelectTrigger className="bg-white/[0.04] border-white/[0.08] text-[#F9FAFB]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No dependency</SelectItem>
                  {existingTasks.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
