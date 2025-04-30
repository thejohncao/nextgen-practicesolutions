
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';

const BadgeCredentials = () => {
  return (
    <section className="py-24 bg-[#252428] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <FadeInSection>
            <div className="mb-10">
              {/* Badge Image */}
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-nextgen-purple via-nextgen-blue to-nextgen-purple/70 flex items-center justify-center p-1 mx-auto">
                <div className="w-full h-full rounded-full bg-[#252428] flex items-center justify-center p-4">
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">NextGen</div>
                    <div className="text-white font-bold text-lg">CERTIFIED</div>
                    <div className="text-white/60 text-xs mt-1">AI Operator</div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Earn the Official AI Operator Badge
            </h2>
            
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Every graduate receives a verified certification backed by NextGen Practice Solutions.
              Perfect for LinkedIn, resumes, and clinic branding.
            </p>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default BadgeCredentials;
