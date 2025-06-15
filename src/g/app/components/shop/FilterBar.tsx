
import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  filters: {
    concern: string[];
    serviceType: string[];
    area: string[];
    priceRange: [number, number];
    sort: 'bestsellers' | 'new' | 'personalized' | 'price-low' | 'price-high';
  };
  onFiltersChange: (filters: any) => void;
}

const concerns = [
  'Acne & Scarring',
  'Anti-Aging',
  'Body Sculpting',
  'Hair Removal',
  'Skin Brightening',
  'Hydration'
];

const serviceTypes = [
  'Facial Treatments',
  'Injectable',
  'Body Treatments',
  'Laser Therapy',
  'Medical Grade'
];

const areas = [
  'Face',
  'Body',
  'Eyes',
  'Lips',
  'Neck',
  'Hands'
];

const sortOptions = [
  { value: 'bestsellers', label: 'Bestsellers' },
  { value: 'new', label: 'New' },
  { value: 'personalized', label: 'For You' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' }
];

const FilterBar = ({ filters, onFiltersChange }: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleConcern = (concern: string) => {
    const newConcerns = filters.concern.includes(concern)
      ? filters.concern.filter(c => c !== concern)
      : [...filters.concern, concern];
    
    onFiltersChange({ ...filters, concern: newConcerns });
  };

  const toggleServiceType = (type: string) => {
    const newTypes = filters.serviceType.includes(type)
      ? filters.serviceType.filter(t => t !== type)
      : [...filters.serviceType, type];
    
    onFiltersChange({ ...filters, serviceType: newTypes });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      concern: [],
      serviceType: [],
      area: [],
      priceRange: [0, 2000],
      sort: 'bestsellers'
    });
  };

  const activeFilterCount = filters.concern.length + filters.serviceType.length + filters.area.length;

  return (
    <div className="bg-white/60 backdrop-blur-sm border-b border-white/20">
      {/* Quick Sort Bar */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-coral-accent text-white text-xs px-2 py-1 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
            
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-apple-detail hover:text-apple-header transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          
          <select
            value={filters.sort}
            onChange={(e) => onFiltersChange({ ...filters, sort: e.target.value })}
            className="text-sm bg-white/80 border border-white/40 rounded-full px-3 py-2 outline-none"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {concerns.slice(0, 4).map(concern => (
            <button
              key={concern}
              onClick={() => toggleConcern(concern)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition-colors ${
                filters.concern.includes(concern)
                  ? 'bg-coral-accent text-white'
                  : 'bg-white/80 text-apple-header hover:bg-white'
              }`}
            >
              {concern}
            </button>
          ))}
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="px-4 pb-4 border-t border-white/20">
          <div className="space-y-4 mt-4">
            {/* Concerns */}
            <div>
              <h3 className="font-medium text-apple-header mb-2">Concerns</h3>
              <div className="flex flex-wrap gap-2">
                {concerns.map(concern => (
                  <button
                    key={concern}
                    onClick={() => toggleConcern(concern)}
                    className={`px-3 py-2 rounded-full text-sm transition-colors ${
                      filters.concern.includes(concern)
                        ? 'bg-coral-accent text-white'
                        : 'bg-white/80 text-apple-header hover:bg-white'
                    }`}
                  >
                    {concern}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Types */}
            <div>
              <h3 className="font-medium text-apple-header mb-2">Service Type</h3>
              <div className="flex flex-wrap gap-2">
                {serviceTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleServiceType(type)}
                    className={`px-3 py-2 rounded-full text-sm transition-colors ${
                      filters.serviceType.includes(type)
                        ? 'bg-coral-accent text-white'
                        : 'bg-white/80 text-apple-header hover:bg-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
