
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { KitSOP } from '../../types/kits';
import { BookOpen } from 'lucide-react';

interface SOPsSectionProps {
  sops: KitSOP[];
}

const SOPsSection: React.FC<SOPsSectionProps> = ({ sops }) => {
  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="text-3xl">📚</div>
        <div>
          <h2 className="text-3xl font-bold text-white">Standard Operating Procedures</h2>
          <p className="text-white/70">Step-by-step guides and procedures</p>
        </div>
      </div>

      {sops.length > 0 ? (
        <Card className="glass-card">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="space-y-4">
              {sops.map((sop, index) => (
                <AccordionItem 
                  key={sop.id} 
                  value={`sop-${sop.id}`}
                  className="border border-white/10 rounded-lg px-4 data-[state=open]:border-nextgen-purple/50"
                >
                  <AccordionTrigger className="text-white hover:text-nextgen-purple transition-colors py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-nextgen-purple font-bold text-sm">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-left">{sop.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 pb-4">
                    {sop.content ? (
                      <div 
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: sop.content }}
                      />
                    ) : (
                      <p className="text-white/60 italic">Content coming soon...</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/70">No SOPs available for this kit yet.</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default SOPsSection;
