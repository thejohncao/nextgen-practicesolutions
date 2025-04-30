import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';
import { useVoiceRecognition } from '@/utils/voiceUtils';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

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
  giselle: "from-[#00C896] to-[#00FFB2]",
  devon: "from-[#7B2CBF] to-[#B388EB]",
  alma: "from-[#00B4D8] to-[#90E0EF]",
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
  // Always show suggestions instead of conditional display
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [suggestionsList, setSuggestionsList] = useState<string[]>([]);
  const [isPermissionGranted, setIsPermissionGranted] = useState<boolean | null>(null);

  // Check if browser supports speech recognition
  const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  
  // Voice recognition hook
  const {
    isListening,
    transcript,
    finalTranscript,
    startListening,
    stopListening
  } = useVoiceRecognition({
    onResult: (text, isFinal) => {
      if (isFinal && text.trim()) {
        handleSendMessage(text.trim());
        stopListening();
      }
    },
    onError: (error) => {
      console.error("Voice recognition error:", error);
      toast({
        title: "Voice Recognition Error",
        description: "There was a problem with the microphone. Please try again.",
        variant: "destructive",
      });
      stopListening();
    }
  });

  // Update suggestions when agent changes
  useEffect(() => {
    if (suggestions && suggestions.length > 0) {
      setSuggestionsList(suggestions);
    }
  }, [suggestions, currentAgent]);

  // Check microphone permissions
  useEffect(() => {
    if (!isSpeechRecognitionSupported) {
      console.warn("Speech recognition is not supported in this browser");
      return;
    }
    
    // Check if permission was previously granted
    navigator.permissions.query({ name: 'microphone' as PermissionName })
      .then((permissionStatus) => {
        setIsPermissionGranted(permissionStatus.state === 'granted');
      })
      .catch((err) => {
        console.error("Error checking microphone permission:", err);
      });
  }, []);

  // Handle microphone permission request
  const requestMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsPermissionGranted(true);
      return true;
    } catch (error) {
      console.error("Error requesting microphone permission:", error);
      toast({
        title: "Microphone Access Denied",
        description: "Please enable microphone access in your browser settings to use voice chat.",
        variant: "destructive",
      });
      setIsPermissionGranted(false);
      return false;
    }
  };

  // Toggle voice input
  const handleToggleVoice = async () => {
    if (!isSpeechRecognitionSupported) {
      toast({
        title: "Not Supported",
        description: "Voice input is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }
    
    // If already listening, stop listening
    if (isListening) {
      stopListening();
      return;
    }
    
    // Request permission if not yet granted
    if (isPermissionGranted !== true) {
      const granted = await requestMicrophonePermission();
      if (!granted) return;
    }
    
    // Start listening
    startListening();
    
    // Notify parent component about voice toggle
    if (onToggleVoice) onToggleVoice();
  };

  const handleSendMessage = (text: string = input) => {
    if (!text.trim()) return;
    onSendMessage(text);
    setInput("");
    // Don't hide quick replies, keep them visible
    // setShowQuickReplies(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn("p-3 border-t border-white/10 bg-nextgen-dark/80", currentAgent.toLowerCase() + "-color")}>
      {/* Always show suggestions - removed conditional rendering */}
      {showQuickReplies && (
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
      
      <div className="flex gap-2 items-center">
        {/* Voice input button */}
        {isSpeechRecognitionSupported && (
          <Button
            onClick={handleToggleVoice}
            disabled={isTyping}
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full w-10 h-10 flex items-center justify-center transition-all",
              isListening ? 
                "bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse" : 
                "text-white/60 hover:text-white/90 hover:bg-white/10"
            )}
          >
            {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            {/* Ripple animation when listening */}
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-red-400/30 animate-[ripple_2s_ease-out_infinite]"></div>
                <div className="absolute inset-0 rounded-full border-2 border-red-400/20 animate-[ripple_2s_ease-out_1s_infinite]"></div>
              </>
            )}
          </Button>
        )}

        {/* Voice output toggle button */}
        {isVoiceEnabled && onToggleMute && (
          <Button
            onClick={onToggleMute}
            disabled={isTyping}
            variant="ghost"
            size="icon"
            className="rounded-full w-10 h-10 text-white/60 hover:text-white/90 hover:bg-white/10"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        )}
        
        {/* Text input area */}
        <div className="relative flex-grow">
          {/* Transcript display when listening */}
          {isListening && transcript && (
            <div className="absolute top-0 left-0 right-0 transform -translate-y-full mb-2 p-2 rounded-lg bg-black/40 text-white text-sm">
              {transcript || "Listening..."}
            </div>
          )}
          
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white/90 
              placeholder-white/40 focus:outline-none focus:ring-1 resize-none"
            placeholder={isListening ? "Listening..." : "Ask a question..."}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping || isListening}
          />
          <button 
            className={cn(
              "absolute right-2 top-[50%] translate-y-[-50%] p-2 rounded-full",
              "bg-gradient-to-r", 
              agentColors[currentAgent.toLowerCase() as AgentKey],
              (input.trim() || isListening) && !isTyping ? "opacity-100" : "opacity-50"
            )}
            onClick={() => handleSendMessage()}
            disabled={(!input.trim() && !isListening) || isTyping}
          >
            <Send className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatInput;
