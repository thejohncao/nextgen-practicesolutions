
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowRight } from 'lucide-react';

interface EmailCaptureProps {
  agentName: string;
  onSubmit: (email: string) => void;
  onRequestExpert?: () => void;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({ 
  agentName, 
  onSubmit,
  onRequestExpert
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    
    setIsSubmitting(true);
    onSubmit(email);
  };

  const getAgentMessage = () => {
    switch(agentName.toLowerCase()) {
      case 'miles':
        return "We've covered a lot of ways to improve your operations already. Want me to email you a summary of what we talked about — plus a plug-and-play SOP to streamline your front desk?";
      case 'giselle':
        return "I've got more growth strategies I can share with you — but we're at our session limit. Want me to send a recap + a bonus Patient Acquisition Playbook to your inbox?";
      case 'devon':
        return "You're one step away from a smoother, stronger case acceptance flow. Want me to email you a recap + our 3 highest-performing treatment follow-up templates?";
      case 'alma':
        return "I can send you a full onboarding checklist and a link to our staff SOP library if you'd like to keep going. Want me to send everything to your inbox?";
      default:
        return "That's a lot of progress already. Want me to send you a summary of our chat and a free resource pack to help you take action?";
    }
  };

  return (
    <div className="p-4 bg-black/30 backdrop-blur-lg border border-white/10 rounded-lg mt-6 animate-fade-in">
      <p className="text-white mb-4">{getAgentMessage()}</p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-black/20 border-white/10 text-white placeholder:text-white/40"
          required
        />
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white flex-1"
            disabled={isSubmitting}
          >
            <Send className="h-4 w-4 mr-2" />
            Send to My Email
          </Button>
          
          {onRequestExpert && (
            <Button 
              type="button"
              variant="outline"
              className="border border-white/20 bg-transparent hover:bg-white/10 text-white flex-1"
              onClick={onRequestExpert}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Talk to a Real Expert
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmailCapture;
