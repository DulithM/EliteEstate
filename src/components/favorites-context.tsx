"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Property } from '@/data/properties';

interface FavoriteContextType {
  favorites: Property[];
  addToFavorites: (property: Property) => void;
  removeFromFavorites: (propertyId: string) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Property[]>([]);

  // Load favorites from local storage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from local storage:', error);
      }
    }
  }, []);

  // Update local storage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (property: Property) => {
    setFavorites((prev) => {
      // Prevent duplicates
      if (!prev.some(p => p.id === property.id)) {
        return [...prev, property];
      }
      return prev;
    });
  };

  const removeFromFavorites = (propertyId: string) => {
    setFavorites((prev) => prev.filter(p => p.id !== propertyId));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};