"use client";

import React from 'react';
import { useDrag } from 'react-dnd';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { Property } from '@/data/properties';
import { EllipsisVertical, Share2, Pocket, Trash2, Star } from "lucide-react";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { useFavorites } from '@/components/favorites-context';

interface PropertyCardProps {
  property: Property;
  active?: boolean;
  editFavorite?: boolean;
}

export default function PropertyCard({ property, active = true, editFavorite = false }: PropertyCardProps) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === property.id);

  const [{ isDragging }, drag] = useDrag({
    type: "PROPERTY_CARD",
    item: { property },
    canDrag: active && !editFavorite,
    end: (item, monitor) => {
      if (monitor.didDrop() && !editFavorite) {
        toast.success(`${item.property.heading} added to favorites!`);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });  

  const handleShare = () => {
    const url = `${window.location.origin}/browse/${property.id}`;
    navigator.clipboard.writeText(url)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy the link. Please try again."));
  };

  const handleAddToFavorites = () => {
    addToFavorites(property);
    toast.success(`${property.heading} added to favorites!`);
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(property.id);
    toast.success(`${property.heading} removed from favorites.`);
  };

  return (
    <Card
      ref={drag}
      className={`
        relative overflow-hidden transition-opacity duration-300 
        ${isDragging ? 'opacity-50 cursor-grabbing' : ''}
      `}
    >
      <CardContent className="p-0">
        <div className="relative h-48">
          <Image
            src={property.thumb}
            alt={property.heading}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
            unoptimized
          />
          {/* Property Type Badge - Left Corner */}
          <Badge className="absolute top-2 left-2 bg-black/30 hover:bg-black/40 text-white backdrop-blur-sm transition duration-300 ease-in-out">
            {property.property_type}
          </Badge>

          {/* Favorite Star Badge - Right Corner */}
          {isFavorite && (
            <Badge 
              variant="secondary" 
              className="absolute top-2 right-2 bg-black/30 hover:bg-black/40 text-yellow-500 backdrop-blur-sm transition duration-300 ease-in-out"
            >
              <Star className="w-4 h-4 fill-current" />
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{property.heading}</h2>
          <p className="text-gray-600 mb-2">{property.city}</p>
          <p className="text-lg font-bold mb-2">
            Rs. {property.price.toLocaleString()}{property.type === 'rent' ? '/month' : ''}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            {property.rooms} beds • {property.floor_area}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/browse/${property.id}`} className="w-full">
          <Button className="w-full" disabled={!active}>
            View Details
          </Button>
        </Link>

        <Menubar className="ml-4">
          <MenubarMenu>
            <MenubarTrigger disabled={!active}>
              <EllipsisVertical className="w-5 h-5" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={handleShare}>
                <Share2 className="w-5 h-5 mr-4" /> Share
              </MenubarItem>
              {editFavorite ? (
                <MenubarItem onClick={handleRemoveFromFavorites} className="text-red-600">
                  <Trash2 className="w-5 h-5 mr-4" /> Remove from Favorite
                </MenubarItem>
              ) : (
                <MenubarItem onClick={handleAddToFavorites}>
                  <Pocket className="w-5 h-5 mr-4" /> Add to Favorite
                </MenubarItem>
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </CardFooter>
    </Card>
  );
}