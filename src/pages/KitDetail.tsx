
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Kit, KitFile, KitSOP, KitVideo } from '../types/kits';
import ScrollRevealWrapper from '../components/animation/ScrollRevealWrapper';
import KitNavigation from '../components/kits/KitNavigation';
import DownloadsSection from '../components/kits/DownloadsSection';
import SOPsSection from '../components/kits/SOPsSection';
import VideosSection from '../components/kits/VideosSection';
import SupportSection from '../components/kits/SupportSection';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const KitDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: kit, isLoading: kitLoading } = useQuery({
    queryKey: ['kit', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('kits')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as Kit;
    },
    enabled: !!slug,
  });

  const { data: files } = useQuery({
    queryKey: ['kit-files', kit?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('kit_files')
        .select('*')
        .eq('kit_id', kit!.id)
        .order('order_number', { ascending: true });
      
      if (error) throw error;
      return data as KitFile[];
    },
    enabled: !!kit?.id,
  });

  const { data: sops } = useQuery({
    queryKey: ['kit-sops', kit?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('kit_sops')
        .select('*')
        .eq('kit_id', kit!.id)
        .order('order_number', { ascending: true });
      
      if (error) throw error;
      return data as KitSOP[];
    },
    enabled: !!kit?.id,
  });

  const { data: videos } = useQuery({
    queryKey: ['kit-videos', kit?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('kit_videos')
        .select('*')
        .eq('kit_id', kit!.id)
        .order('order_number', { ascending: true });
      
      if (error) throw error;
      return data as KitVideo[];
    },
    enabled: !!kit?.id,
  });

  if (kitLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-nextgen-dark flex items-center justify-center">
          <div className="text-white">Loading kit...</div>
        </div>
      </Layout>
    );
  }

  if (!kit) {
    return (
      <Layout>
        <div className="min-h-screen bg-nextgen-dark flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Kit Not Found</h1>
            <Link to="/hq/kits">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Kits
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-nextgen-dark">
        {/* Header */}
        <section className="py-16 bg-nextgen-dark border-b border-white/10">
          <div className="container mx-auto px-4">
            <ScrollRevealWrapper animation="fade-up">
              <div className="mb-6">
                <Link to="/hq/kits">
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Kits
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {kit.name}
                  </h1>
                  <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
                    {kit.description}
                  </p>
                </div>
                
                {kit.version && (
                  <Badge variant="secondary" className="bg-nextgen-purple/20 text-nextgen-purple border-nextgen-purple/30 text-lg px-4 py-2">
                    {kit.version}
                  </Badge>
                )}
              </div>
            </ScrollRevealWrapper>
          </div>
        </section>

        {/* Kit Navigation */}
        <KitNavigation currentKit={kit} />

        {/* Kit Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="space-y-16">
            {/* Downloads Section */}
            <ScrollRevealWrapper animation="fade-up">
              <DownloadsSection files={files || []} />
            </ScrollRevealWrapper>

            {/* SOPs Section */}
            <ScrollRevealWrapper animation="fade-up">
              <SOPsSection sops={sops || []} />
            </ScrollRevealWrapper>

            {/* Videos Section */}
            <ScrollRevealWrapper animation="fade-up">
              <VideosSection videos={videos || []} />
            </ScrollRevealWrapper>

            {/* Support Section */}
            <ScrollRevealWrapper animation="fade-up">
              <SupportSection supportContact={kit.support_contact} />
            </ScrollRevealWrapper>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KitDetail;
