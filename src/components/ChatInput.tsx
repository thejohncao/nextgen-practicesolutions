
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';

interface ChatInputProps {
  isTyping: boolean;
  currentAgent: string;
  onSendMessage: (message: string) => void;
  messages?: Array<any>;
  suggestions?: string[];
}

// Define the AI agents with their color properties
const agentColors = {
  miles: "from-[#3A86FF] to-[#7FDBFF]",
  giselle: "from-[#00C896] to-[#00FFB2]",
  devon: "from-[#7B2CBF] to-[#B388EB]",
  alma: "from-[#00B4D8] to-[#90E0EF]",
};

type AgentKey = keyof typeof agentColors;

const ChatInput: React.FC<ChatInputProps> = ({ 
  isTyping, 
  currentAgent, 
  onSendMessage, 
  messages = [],
  suggestions = []
}) => {
  const [input, setInput] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [suggestionsList, setSuggestionsList] = useState<string[]>([]);

  // Update suggestions when agent changes
  useEffect(() => {
    if (suggestions && suggestions.length > 0) {
      setSuggestionsList(suggestions);
    }
  }, [suggestions, currentAgent]);

  const handleSendMessage = (text: string = input) => {
    if (!text.trim()) return;
    onSendMessage(text);
    setInput("");
    setShowQuickReplies(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn("p-3 border-t border-white/10 bg-nextgen-dark/80", currentAgent.toLowerCase() + "-color")}>
      {showQuickReplies && (messages.length === 1 || 
       (messages.length >= 2 && !messages[messages.length - 2].isUser && messages[messages.length - 1].isUser)) && (
        <div className="grid grid-cols-2 gap-2 mb-3 animate-fade-in">
          {suggestionsList.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSendMessage(suggestion)}
              className={cn(
                "prompt-button p-2 text-sm text-white/90 hover:bg-white/10 border rounded-lg transition-all duration-200",
                "hover:scale-[1.02] border-white/10 bg-white/5"
              )}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      <div className="relative">
        <textarea
          className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white/90 
            placeholder-white/40 focus:outline-none focus:ring-1 resize-none"
          placeholder="Ask a question..."
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isTyping}
        />
        <button 
          className={cn(
            "absolute right-2 top-[50%] translate-y-[-50%] p-2 rounded-full",
            "bg-gradient-to-r", 
            agentColors[currentAgent.toLowerCase() as AgentKey],
            input.trim() && !isTyping ? "opacity-100" : "opacity-50"
          )}
          onClick={() => handleSendMessage()}
          disabled={!input.trim() || isTyping}
        >
          <Send className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
