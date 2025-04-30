
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import { getAgentChatData } from '@/data/agentChatData';
import AgentSuggestionChip from './agent-launcher/AgentSuggestionChip';
import { agents } from '@/data/agents';

interface ChatInputProps {
  isTyping: boolean;
  currentAgent: string;
  onSendMessage: (message: string) => void;
  messages?: Array<any>;
}

// Define the AI agents with their color properties
const agentColors = {
  miles: "from-[#3A86FF] to-[#7FDBFF]",
  giselle: "from-[#00C896] to-[#00FFB2]",
  devon: "from-[#7B2CBF] to-[#B388EB]",
  alma: "from-[#00B4D8] to-[#90E0EF]",
};

type AgentKey = keyof typeof agentColors;

const ChatInput: React.FC<ChatInputProps> = ({ isTyping, currentAgent, onSendMessage, messages = [] }) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatData = getAgentChatData(currentAgent);
  const agent = agents.find(a => a.name.toLowerCase() === currentAgent.toLowerCase());

  useEffect(() => {
    // Show suggestions again when changing agents or when it's a new conversation
    const isNewConversation = messages.filter(msg => msg.isUser).length < 2;
    setShowSuggestions(isNewConversation);
  }, [currentAgent, messages]);

  const handleSendMessage = (text: string = input) => {
    if (!text.trim()) return;
    onSendMessage(text);
    setInput("");
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSendMessage(suggestion);
  };

  return (
    <div className="p-3 border-t border-white/10 bg-nextgen-dark/80">
      {showSuggestions && messages.length < 3 && (
        <div className="mb-3 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {chatData.suggestions.slice(0, 4).map((suggestion, idx) => (
              <AgentSuggestionChip
                key={idx}
                suggestion={suggestion}
                color={agent?.color || 'blue'}
                onClick={() => handleSuggestionClick(suggestion)}
              />
            ))}
          </div>
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
            agentColors[currentAgent as AgentKey] || agentColors.miles,
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
