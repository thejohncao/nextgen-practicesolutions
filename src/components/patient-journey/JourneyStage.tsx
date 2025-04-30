
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { JourneyStage as JourneyStageType } from '@/data/patientJourney';
import AgentAvatar from '../AgentAvatar';
import { Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ChatSimulation from '../journey/ChatSimulation';
import { TypingIndicator } from '../ui/TypingIndicator';

interface JourneyStageProps {
  stage: JourneyStageType;
  isActive?: boolean;
  onActivate?: () => void;
  compact?: boolean;
}

const JourneyStage: React.FC<JourneyStageProps> = ({
  stage,
  isActive = false,
  onActivate = () => {},
  compact = false,
}) => {
  const [showChat, setShowChat] = useState(false);
  
  // Helper to get agent-specific gradient
  const getAgentGradient = (color: string) => {
    switch(color) {
      case 'blue': return 'from-blue-500/20 to-transparent';
      case 'green': return 'from-green-500/20 to-transparent';
      case 'purple': return 'from-purple-500/20 to-transparent';
      case 'gold': 
      case 'red': return 'from-amber-500/20 to-transparent';
      default: return 'from-white/10 to-transparent';
    }
  };
  
  const handleCardClick = () => {
    onActivate();
  };
  
  const toggleChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowChat(prev => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0.8, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isActive ? 1 : 0.98
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer",
        compact ? "p-4" : "p-5 md:p-6",
        isActive ? "bg-black/30 shadow-lg border border-white/10" : "bg-black/10 hover:bg-black/20"
      )}
      onClick={handleCardClick}
    >
      {/* Stage indicator */}
      <div className="flex items-center gap-4 mb-4">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold",
          `bg-${stage.agent.color}-500/20 text-${stage.agent.color}-400`
        )}>
          {isActive ? <Check className="w-5 h-5" /> : stage.number}
        </div>
        <h3 className={cn(
          "text-xl font-bold",
          compact ? "text-lg" : "text-xl md:text-2xl"
        )}>
          {stage.name}
        </h3>
      </div>
      
      {/* Agent info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <AgentAvatar
            name={stage.agent.name}
            role={stage.agent.title}
            color={stage.agent.color}
            size={compact ? "sm" : "md"}
            showLabel
          />
        </div>
        
        {!compact && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleChat}
            className="border border-white/10 bg-white/5 hover:bg-white/10"
          >
            {showChat ? 'Hide Example' : 'See Example'} <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        )}
      </div>
      
      {/* Chat preview */}
      {showChat && !compact && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <ChatSimulation
            agentName={stage.agent.name}
            agentRole={stage.agent.title}
            messages={stage.sampleChat}
            onClose={() => setShowChat(false)}
          />
          
          <div className="flex items-center mt-3 text-sm text-white/60">
            <TypingIndicator agent={stage.agent.name} />
            <span className="ml-2">AI assistant is ready to help</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default JourneyStage;
