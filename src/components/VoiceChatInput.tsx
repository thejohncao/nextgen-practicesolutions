
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';

interface VoiceChatInputProps {
  isTyping: boolean;
  currentAgent: string;
  onSendMessage: (message: string) => void;
  messages?: Array<any>;
  suggestions?: string[];
  isVoiceEnabled?: boolean; 
  onToggleVoice?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

// Define the AI agents with their color properties
const agentColors = {
  miles: "from-[#3A86FF] to-[#7FDBFF]",
  giselle: "from-[#00D26A] to-[#00FFB2]",
  devon: "from-[#A259FF] to-[#C299FF]",
  alma: "from-[#FFA928] to-[#FFCC80]",
};

// Define agent color borders
const agentBorders = {
  miles: "border-blue-500/20 hover:border-blue-500/40",
  giselle: "border-green-500/20 hover:border-green-500/40",
  devon: "border-purple-500/20 hover:border-purple-500/40", 
  alma: "border-amber-500/20 hover:border-amber-500/40"
};

type AgentKey = keyof typeof agentColors;

const VoiceChatInput: React.FC<VoiceChatInputProps> = ({ 
  isTyping, 
  currentAgent, 
  onSendMessage, 
  messages = [],
  suggestions = [],
  isVoiceEnabled = false,
  onToggleVoice,
  isMuted = false,
  onToggleMute
}) => {
  const [input, setInput] = useState("");
  // Always show suggestions, don't toggle based on conditions
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);
  const [suggestionsList, setSuggestionsList] = useState<string[]>([]);

  // Check if browser supports speech recognition
  const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  // Update suggestions when agent changes or suggestions are passed
  useEffect(() => {
    if (suggestions && suggestions.length > 0) {
      setSuggestionsList(suggestions);
    }
  }, [suggestions, currentAgent]);

  const handleSendMessage = (text: string = input) => {
    if (!text.trim()) return;
    onSendMessage(text);
    setInput("");
    // Don't hide suggestions after sending a message
    // setSuggestionsVisible(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get the current agent's border color class
  const getCurrentAgentBorderClass = () => {
    return agentBorders[currentAgent.toLowerCase() as AgentKey] || agentBorders.miles;
  };

  return (
    <div className={cn("p-3 border-t border-white/10 bg-nextgen-dark/80", currentAgent.toLowerCase() + "-color")}>
      {/* Always show suggestions / prompt chips */}
      {suggestionsList.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-3 animate-fade-in">
          {suggestionsList.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSendMessage(suggestion)}
              className={cn(
                "prompt-button p-2 text-sm text-white/90 hover:bg-white/10 rounded-lg transition-all duration-200",
                "hover:scale-[1.02] bg-white/5 border",
                getCurrentAgentBorderClass()
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
          placeholder={isTyping ? "Thinking..." : "Ask a question..."}
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
            agentColors[currentAgent.toLowerCase() as AgentKey] || agentColors.miles,
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

export default VoiceChatInput;
