import { useState, useRef, useEffect } from 'react';
import { Send, Radio } from 'lucide-react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionHeader from '../SectionHeader';
import type { AgentName, TeamMessage } from '../../types/team';

const senderColors: Record<string, string> = {
  giselle: 'bg-emerald-500/20 text-emerald-400',
  miles: 'bg-rose-500/20 text-rose-400',
  devon: 'bg-indigo-500/20 text-indigo-400',
  alma: 'bg-amber-500/20 text-amber-400',
  user: 'bg-cyan-500/20 text-cyan-400',
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

interface Props {
  messages: TeamMessage[];
  onSendMessage: (from: 'user', to: AgentName | 'all', content: string, type: TeamMessage['type']) => void;
}

export default function ActivityFeed({ messages, onSendMessage }: Props) {
  const [text, setText] = useState('');
  const [recipient, setRecipient] = useState<string>('all');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = () => {
    if (!text.trim()) return;
    const type = recipient === 'all' ? 'broadcast' : 'message';
    onSendMessage('user', recipient as AgentName | 'all', text.trim(), type);
    setText('');
  };

  return (
    <div className="space-y-3">
      <SectionHeader title="Activity Feed" />
      <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] flex flex-col h-[400px]">
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-2">
            {messages.map((msg) => {
              const isStatus = msg.type === 'status';
              return (
                <div key={msg.id} className={cn('text-xs', isStatus && 'opacity-70')}>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={cn('px-1.5 py-0.5 rounded text-[10px] font-medium', senderColors[msg.from] ?? senderColors.user)}>
                      {msg.from === 'user' ? 'You' : msg.from.charAt(0).toUpperCase() + msg.from.slice(1)}
                    </span>
                    <span className="text-[#6B7280]">&rarr;</span>
                    <span className="text-[10px] text-[#6B7280]">
                      {msg.to === 'all' ? (
                        <span className="flex items-center gap-0.5">
                          <Radio className="w-2.5 h-2.5" /> all
                        </span>
                      ) : (
                        msg.to.charAt(0).toUpperCase() + msg.to.slice(1)
                      )}
                    </span>
                    <span className="ml-auto text-[10px] text-[#6B7280]">{formatTime(msg.timestamp)}</span>
                  </div>
                  <p className={cn('text-[#9CA3AF] pl-1', isStatus && 'italic')}>{msg.content}</p>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-white/[0.06] p-2 flex gap-2">
          <Select value={recipient} onValueChange={setRecipient}>
            <SelectTrigger className="w-[100px] h-8 text-[10px] bg-transparent border-white/[0.08] text-[#9CA3AF]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="miles">Miles</SelectItem>
              <SelectItem value="giselle">Giselle</SelectItem>
              <SelectItem value="devon">Devon</SelectItem>
              <SelectItem value="alma">Alma</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Send a message..."
            className="flex-1 h-8 text-xs bg-transparent border-white/[0.08] text-[#F9FAFB] placeholder:text-[#6B7280]"
          />
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!text.trim()}
            className="h-8 px-3 bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
