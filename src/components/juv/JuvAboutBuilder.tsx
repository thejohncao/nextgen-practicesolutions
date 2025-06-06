
import React from 'react';
import { User, Award, Code } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const JuvAboutBuilder = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            👤 About the Builder
          </h2>
        </div>
        
        <Card className="glass-card max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-nextgen-purple/20 rounded-full flex items-center justify-center">
                  <User className="h-16 w-16 text-nextgen-purple" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Jonathan Cao
                </h3>
                <p className="text-nextgen-purple font-semibold mb-4">
                  AI Strategist. Systems Architect. Growth Operator.
                </p>
                <p className="text-white/80 mb-4">
                  Founder of NextGen Practice Solutions. I build AI-powered systems that help healthcare businesses scale — combining automation, marketing, and ops into clean, self-running platforms.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm text-white/70">
                    <Award className="h-3 w-3" />
                    Google AI Certified
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm text-white/70">
                    <Code className="h-3 w-3" />
                    OpenAI Development
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm text-white/70">
                    <Award className="h-3 w-3" />
                    Enterprise No-Code
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default JuvAboutBuilder;
