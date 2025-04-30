
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import { getAgentChatData } from '@/data/agentChatData';
import AgentSuggestionChip from './agent-launcher/AgentSuggestionChip';
import { agents } from '@/data/agents';
import { AiMessage } from '@/hooks/useAiConversation';

interface ChatInputProps {
  isTyping: boolean;
  currentAgent: string;
  onSendMessage: (message: string) => void;
  messages?: Array<AiMessage>;
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const chatData = getAgentChatData(currentAgent);
  const agent = agents.find(a => a.name.toLowerCase() === currentAgent.toLowerCase());

  useEffect(() => {
    // Don't show additional suggestions in input area when welcome message is showing
    // The welcome message in AgentChatPreview already has suggestions
    const hasWelcomeMessage = messages.length === 1 && !messages[0].isUser;
    const isNewConversation = messages.filter(msg => msg.isUser).length === 0;
    
    // Only show suggestions in ChatInput if we're not showing welcome message
    const shouldShowSuggestions = isNewConversation && !hasWelcomeMessage && messages.length > 1;
    
    setShowSuggestions(shouldShowSuggestions);
    
    if (shouldShowSuggestions) {
      setSuggestions(chatData.suggestions.slice(0, 4));
    }
  }, [currentAgent, messages, chatData.suggestions]);

  const handleSendMessage = (text: string = input) => {
    if (!text.trim()) return;
    
    // Immediately hide suggestions after sending
    setSuggestions([]);
    setShowSuggestions(false);
    
    onSendMessage(text);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Immediately hide all suggestions to prevent duplicate clicks
    setSuggestions([]);
    setInput(suggestion);
    handleSendMessage(suggestion);
  };

  // Auto-resize the textarea based on content
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`; // Max 120px height
  };

  return (
    <div className="p-3 border-t border-white/10 bg-nextgen-dark/80">
      {/* Only show these suggestions if we're NOT showing the welcome message with its own suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="mb-3 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestions.map((suggestion, idx) => (
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
            placeholder-white/40 focus:outline-none focus:ring-1 resize-none min-h-[42px]"
          placeholder="Ask a question..."
          rows={1}
          value={input}
          onChange={handleInputChange}
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
