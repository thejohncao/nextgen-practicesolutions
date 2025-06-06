
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Kit } from '../../types/kits';
import { cn } from '@/lib/utils';

interface KitNavigationProps {
  currentKit: Kit;
}

const KitNavigation: React.FC<KitNavigationProps> = ({ currentKit }) => {
  const location = useLocation();

  const { data: allKits } = useQuery({
    queryKey: ['all-kits'],
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

  if (!allKits) return null;

  return (
    <div className="sticky top-0 z-40 bg-nextgen-dark/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 py-4 overflow-x-auto">
          {allKits.map((kit) => {
            const isActive = location.pathname.includes(kit.slug);
            return (
              <Link
                key={kit.id}
                to={`/hq/kits/${kit.slug}`}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
                  isActive
                    ? "bg-nextgen-purple text-white shadow-lg"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                {kit.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KitNavigation;
