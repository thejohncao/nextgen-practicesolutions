
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { agents } from '@/data/agents';
import AgentDemoVideo from './AgentDemoVideo';

const AgentDemoSection = () => {
  const [activeAgent, setActiveAgent] = useState('miles');
  
  const agentScripts = {
    miles: "Meet Miles, your AI front office concierge. He handles all your scheduling, confirmations, and no-show recovery — 24/7. With Miles, no patient gets missed, and your team never wastes time chasing appointments. He integrates directly with your calendar, sends reminders, and reports back every week.",
    giselle: "This is Giselle, your always-on lead nurturer. She instantly follows up with every lead — via quiz, text, or email — and guides them from ad to consult. She never forgets to follow up, never hesitates, and converts cold traffic into real appointments. It's like having a high-performing SDR in your CRM.",
    devon: "Devon is your treatment closer. He follows up on unscheduled treatment plans with persuasive, high-converting messages. Whether it's a patient who ghosted after the consult, or one who said "I need to think about it," Devon handles the conversation — and brings them back.",
    alma: "Alma makes sure your team is trained, aligned, and consistent. She delivers SOPs, onboarding workflows, and even certification programs through your Academy. When you hire someone new, Alma takes over. When you update a workflow, Alma ensures everyone sees it."
  };
  
  return (
    <section className="py-24 bg-gradient-to-b from-black/40 to-black/20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gradient">
            Want to See How They Work?
          </h2>
          <p className="text-lg text-white/70 text-center max-w-2xl mx-auto mb-12">
            Watch how each AI agent handles their specialized role in your practice
          </p>
        </FadeInSection>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="miles" onValueChange={(value) => setActiveAgent(value)}>
            <TabsList className="grid grid-cols-4 mb-8">
              {agents.map(agent => (
                <TabsTrigger 
                  key={agent.name.toLowerCase()} 
                  value={agent.name.toLowerCase()}
                  className={`data-[state=active]:bg-${agent.color}-500/20 data-[state=active]:text-${agent.color}-500`}
                >
                  {agent.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {agents.map(agent => (
              <TabsContent key={agent.name.toLowerCase()} value={agent.name.toLowerCase()}>
                <AgentDemoVideo 
                  agent={agent} 
                  script={agentScripts[agent.name.toLowerCase() as keyof typeof agentScripts]} 
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <FadeInSection delay={0.3}>
          <div className="flex justify-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
            >
              <Link to="/join">
                Book Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default AgentDemoSection;
