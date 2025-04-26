
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { agents, AgentKey } from '@/utils/agentStyles';

interface ChatInputProps {
  onSend: (message: string) => void;
  currentAgent: AgentKey;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, currentAgent }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    onSend(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 border-t border-white/10 bg-nextgen-dark/80">
      <div className="relative">
        <textarea
          className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white/90 
            placeholder-white/40 focus:outline-none focus:ring-1 resize-none"
          placeholder="Ask a question..."
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className={cn(
            "absolute right-2 top-[50%] translate-y-[-50%] p-2 rounded-full transition-all duration-300",
            input.trim() ? "opacity-100" : "opacity-50"
          )}
          style={{
            background: `linear-gradient(to right, ${agents[currentAgent].baseColor}, ${agents[currentAgent].gradientColor})`
          }}
          onClick={handleSend}
          disabled={!input.trim()}
        >
          <Send className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  );
};

