
import React from 'react';
import { agents } from '@/data/agents';
import IllustratedAgentAvatar from '../avatar/IllustratedAgentAvatar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AvatarManager = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold mb-8 text-white">Avatar Manager</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <Card key={agent.name} className="glass-card border-white/10 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg text-white">{agent.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-3">
                <h3 className="text-sm text-white/70">Custom Avatar</h3>
                <IllustratedAgentAvatar 
                  name={agent.name}
                  role={agent.title}
                  color={agent.color}
                  size="lg"
                  imagePath={agent.avatarImage}
                  animated={true}
                />
                <p className="text-xs text-white/50 mt-2">
                  {agent.avatarImage ? 'Custom avatar loaded' : 'No custom avatar set'}
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <h3 className="text-sm text-white/70">Default Avatar</h3>
                <IllustratedAgentAvatar 
                  name={agent.name}
                  role={agent.title}
                  color={agent.color}
                  size="lg"
                  animated={true}
                />
                <p className="text-xs text-white/50 mt-2">Fallback default avatar</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 p-6 glass-card border-white/10 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Avatar Implementation Guide</h2>
        <ul className="space-y-3 text-white/70">
          <li>1. Create professional illustrated avatars for each agent</li>
          <li>2. Save the files in <code className="bg-white/10 px-2 py-0.5 rounded">/public/assets/avatars/</code> directory</li>
          <li>3. Name files consistently: <code className="bg-white/10 px-2 py-0.5 rounded">miles-avatar.png</code>, etc.</li>
          <li>4. Update the paths in <code className="bg-white/10 px-2 py-0.5 rounded">agents.ts</code> if using different filenames</li>
          <li>5. For animated avatars, consider using multiple frames or WebP animations</li>
        </ul>
      </div>
    </div>
  );
};

export default AvatarManager;
