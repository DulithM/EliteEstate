"use client";

import React from "react";
import PropertyCard from "@/components/property-card";
import { useFavorites } from "@/components/favorites-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div>
      <div className="mt-10" />
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Your Favorites
        </h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <p className="text-gray-500 text-lg">
              You haven’t added any properties to your favorites yet.
            </p>
            <Link href="/browse">
              <Button className="mt-6">Browse Properties</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                active={true}
                editFavorite={true}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
