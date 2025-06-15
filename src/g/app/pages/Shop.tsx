
import React, { useState, useMemo } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useTreatments } from '../../../hooks/useTreatments';
import { useCredits } from '../../../hooks/useCredits';
import ShopHeader from '../components/shop/ShopHeader';
import FilterBar from '../components/shop/FilterBar';
import TreatmentGrid from '../components/shop/TreatmentGrid';
import PromotionalBanner from '../components/shop/PromotionalBanner';
import MembershipCTA from '../components/shop/MembershipCTA';
import BottomNavigation from '../components/shop/BottomNavigation';
import '../../../o/app/styles/apple-design.css';

interface FilterState {
  concern: string[];
  serviceType: string[];
  area: string[];
  priceRange: [number, number];
  sort: 'bestsellers' | 'new' | 'personalized' | 'price-low' | 'price-high';
}

const Shop = () => {
  const { profile } = useAuth();
  const { treatments, loading } = useTreatments();
  const { availableBalance } = useCredits();
  
  const [filters, setFilters] = useState<FilterState>({
    concern: [],
    serviceType: [],
    area: [],
    priceRange: [0, 2000],
    sort: 'bestsellers'
  });

  const isMember = Boolean(profile?.role === 'patient' && profile);
  const isGuest = !profile;

  const filteredTreatments = useMemo(() => {
    let filtered = [...treatments];

    // Apply concern filter
    if (filters.concern.length > 0) {
      filtered = filtered.filter(treatment => 
        filters.concern.some(concern => 
          treatment.category?.toLowerCase().includes(concern.toLowerCase())
        )
      );
    }

    // Apply service type filter
    if (filters.serviceType.length > 0) {
      filtered = filtered.filter(treatment =>
        filters.serviceType.some(type =>
          treatment.category?.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    // Apply price range filter
    filtered = filtered.filter(treatment => {
      const price = isMember ? treatment.price_cents * 0.85 : treatment.price_cents; // 15% member discount
      return price >= filters.priceRange[0] * 100 && price <= filters.priceRange[1] * 100;
    });

    // Apply sorting
    switch (filters.sort) {
      case 'price-low':
        filtered.sort((a, b) => a.price_cents - b.price_cents);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price_cents - a.price_cents);
        break;
      case 'new':
        // Sort by name since created_at doesn't exist - newest would be reverse alphabetical as fallback
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'personalized':
        // For now, just randomize. In real implementation, this would use user history
        filtered.sort(() => Math.random() - 0.5);
        break;
      default: // bestsellers
        // For now, sort by price (higher price = more popular). Real implementation would use booking data
        filtered.sort((a, b) => b.price_cents - a.price_cents);
    }

    return filtered;
  }, [treatments, filters, isMember]);

  if (loading) {
    return (
      <div className="min-h-screen bg-apple-bg flex items-center justify-center">
        <div className="text-lg text-apple-subtle">Loading treatments...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-apple-bg pb-20"> {/* Bottom padding for fixed nav */}
      <ShopHeader />
      
      {/* Promotional Banner */}
      <PromotionalBanner />
      
      {/* Filter Bar */}
      <FilterBar filters={filters} onFiltersChange={setFilters} />
      
      {/* Treatment Grid */}
      <div className="px-4 py-6">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-apple-header">
            {filteredTreatments.length} Treatments Available
          </h2>
          {isMember && (
            <div className="text-sm text-apple-detail bg-white/60 px-3 py-1 rounded-full">
              💳 {availableBalance} credits available
            </div>
          )}
        </div>
        
        <TreatmentGrid 
          treatments={filteredTreatments}
          isMember={isMember}
          isGuest={isGuest}
          availableCredits={availableBalance}
        />
      </div>

      {/* Membership CTA for non-members */}
      {isGuest && <MembershipCTA />}
      
      {/* Bottom Navigation */}
      <BottomNavigation currentPage="shop" />
    </div>
  );
};

export default Shop;
