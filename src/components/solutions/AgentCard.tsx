
import React from 'react';
import { LucideIcon, Check } from 'lucide-react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AgentCardProps {
  name: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  color: string;
}

const AgentCard = ({ name, title, description, icon: Icon, features, color }: AgentCardProps) => {
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) chatButton.click();
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

  return (
    <Card className="glass-card border-white/10 overflow-hidden group transition-all duration-300 hover:shadow-glow animate-fade-in">
      <CardHeader className="space-y-4 pb-2">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-${color}-500/10`}>
            <Icon className={`w-6 h-6 text-${color}-500`} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{name}</h3>
            <p className="text-white/60">{title}</p>
          </div>
        </div>
        <p className="text-lg text-white/80">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm text-white/60 uppercase tracking-wider">Key Features</h4>
          <ul className="grid gap-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className={`h-4 w-4 mt-1 text-${color}-500 flex-shrink-0`} />
                <span className="text-white/70">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Button 
          onClick={handleChatOpen}
          variant="outline" 
          className={`w-full border-${color}-500/20 hover:bg-${color}-500/20 transition-all duration-300`}
        >
          Learn More About {name}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
