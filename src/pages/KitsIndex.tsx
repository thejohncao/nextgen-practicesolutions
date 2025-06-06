
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Kit } from '../types/kits';
import ScrollRevealWrapper from '../components/animation/ScrollRevealWrapper';
import KitCard from '../components/kits/KitCard';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const KitsIndex = () => {
  const { data: kits, isLoading, error } = useQuery({
    queryKey: ['kits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('kits')
        .select('*')
        .eq('featured', true)
        .order('order_number', { ascending: true });
      
      if (error) throw error;
      return data as Kit[];
    },
  });

  if (error) {
    console.error('Error fetching kits:', error);
  }

  return (
    <Layout>
      <div className="min-h-screen bg-nextgen-dark">
        {/* Hero Section */}
        <section className="py-24 bg-nextgen-dark">
          <div className="container mx-auto px-4">
            <ScrollRevealWrapper animation="fade-up">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                  NextGen Practice <span className="text-gradient">Kits</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
                  Everything you need to launch, train, and scale your modern healthcare practice.
                </p>
                <div className="max-w-4xl mx-auto">
                  <p className="text-lg text-white/70 leading-relaxed">
                    This is your centralized command center for onboarding new offices, training your team, 
                    and executing proven playbooks across locations. Whether you're launching your first studio 
                    or optimizing your tenth, these kits give you the exact tools, templates, and SOPs our team uses at scale.
                  </p>
                </div>
              </div>
            </ScrollRevealWrapper>
          </div>
        </section>

        {/* Kits Grid Section */}
        <section className="py-16 bg-nextgen-dark">
          <div className="container mx-auto px-4">
            <ScrollRevealWrapper animation="fade-up">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                  Available Kits
                </h2>
                <p className="text-white/70 text-center max-w-2xl mx-auto">
                  Choose from our comprehensive collection of practice resources
                </p>
              </div>
            </ScrollRevealWrapper>

            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="glass-card p-6 animate-pulse">
                    <div className="h-16 w-16 bg-white/10 rounded-lg mb-4"></div>
                    <div className="h-6 bg-white/10 rounded mb-2"></div>
                    <div className="h-4 bg-white/10 rounded mb-4"></div>
                    <div className="h-10 bg-white/10 rounded"></div>
                  </div>
                ))}
              </div>
            )}

            {kits && kits.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {kits.map((kit, index) => (
                  <ScrollRevealWrapper key={kit.id} animation="fade-up" delay={index * 0.1}>
                    <KitCard kit={kit} />
                  </ScrollRevealWrapper>
                ))}
              </div>
            )}

            {kits && kits.length === 0 && (
              <div className="text-center text-white/70">
                <p>No kits available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-nextgen-dark border-t border-white/10">
          <div className="container mx-auto px-4">
            <ScrollRevealWrapper animation="fade-up">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need a Custom Kit?
                </h3>
                <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                  Want to request a new kit or suggest a template? We're always improving our resources.
                </p>
                <Button 
                  size="lg" 
                  className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
                  onClick={() => window.location.href = 'mailto:support@nextgenpractice.org?subject=Kit Request'}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </div>
            </ScrollRevealWrapper>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default KitsIndex;
