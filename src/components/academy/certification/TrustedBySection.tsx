
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Card, CardContent } from '@/components/ui/card';

const TrustedBySection = () => {
  const partners = [
    { name: "GHL", icon: "🔷" },
    { name: "Dental AI", icon: "🦷" },
    { name: "Practice Growth", icon: "📈" },
    { name: "Tech Alliance", icon: "🔧" }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            Powered by Industry Leaders. Curated for Dental Practices.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <Card key={index} className="border border-gray-200 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-4xl mb-3">{partner.icon}</div>
                  <h3 className="text-lg font-medium text-gray-700">{partner.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default TrustedBySection;
