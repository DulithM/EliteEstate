"use client";
import { useState, useMemo } from 'react';
import { properties } from '@/data/properties';
import PropertyCard from '@/components/property-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useFavorites } from '@/components/favorites-context';

const PROPERTY_TYPES = ['Apartment', 'House', 'Condo', 'Townhouse', 'Villa'];
const PRICE_RANGES = [
  { label: 'Any', min: 0, max: Infinity },
  { label: 'Rs. 0 - Rs. 500k', min: 0, max: 500000 },
  { label: 'Rs. 500k - Rs.10M', min: 500000, max: 10000000 },
  { label: 'Rs.10M - Rs. 100M', min: 10000000, max: 100000000 },
  { label: 'Over Rs. 100M', min: 100000000, max: Infinity }
];

export default function BrowsePage() {
  const { favorites } = useFavorites();
  const [filters, setFilters] = useState({
    searchTerm: '',
    propertyType: null,
    priceRange: null,
    location: null
  });

  const cities = useMemo(() => 
    [...new Set(properties.map(p => p.city))].sort(),
    []
  );

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch = property.heading.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesType = !filters.propertyType ||
        property.property_type === filters.propertyType;
      
      const matchesPrice = !filters.priceRange ? true :
        (() => {
          const selectedPriceRange = PRICE_RANGES.find(
            range => range.label === filters.priceRange
          );
          return selectedPriceRange
            ? (property.price >= selectedPriceRange.min &&
               property.price <= selectedPriceRange.max)
            : true;
        })();
      
      const matchesLocation = !filters.location ||
        property.city === filters.location;

      return matchesSearch && matchesType && matchesPrice && matchesLocation;
    });
  }, [filters, properties]);

  const handleFilterChange = (key: keyof typeof filters, value: string | null) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      propertyType: null,
      priceRange: null,
      location: null
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-10">Browse Properties</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Search properties..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
        />
        
        <Select
          value={filters.propertyType || ''}
          onValueChange={(value) => handleFilterChange('propertyType', value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>All Types</SelectItem>
            {PROPERTY_TYPES.map(type => (
              <SelectItem key={`type-${type}`} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={filters.priceRange || ''}
          onValueChange={(value) => handleFilterChange('priceRange', value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>All Prices</SelectItem>
            {PRICE_RANGES.map(range => (
              <SelectItem key={`price-${range.label}`} value={range.label}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={filters.location || ''}
          onValueChange={(value) => handleFilterChange('location', value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>All Cities</SelectItem>
            {cities.map(city => (
              <SelectItem key={`city-${city}`} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {filteredProperties.length} properties found
        </p>
        <Button
          variant="outline"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={`property-${property.id}`}
            property={property}
            editFavorite={favorites.some(fav => fav.id === property.id)}
          />
        ))}
      </div>
    </div>
  );
}