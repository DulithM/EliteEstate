"use client";

import { useParams } from 'next/navigation';
import { properties } from '@/data/properties';
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PropertyPage() {
  const params = useParams();
  const property = properties.find((p) => p.id === params?.id);

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-3xl">
        Property Not Found.
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      {/* Image Carousel Section */}
      <div className="mb-8">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {property.images.map((imageUrl, index) => (
              <CarouselItem key={index} className="flex justify-center items-center">
                <Card className="w-full max-w-3xl">
                  <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                    <img
                      src={imageUrl}
                      alt={`Property image ${index + 1}`} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Rest of the component remains the same */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{property.heading}</h1>
        <p className="mb-6">{property.description}</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="text-2xl font-semibold">Rs. {property.price.toLocaleString()}{property.type === 'rent' ? '/month' : ''}</p>
          </div>
          <div>
            <p className="text-muted-foreground">For</p>
            <p className="text-xl font-semibold capitalize">{property.type}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Property Type</p>
            <p className="text-xl font-semibold">{property.property_type}</p>
          </div>
          <div>
            <p className="text-muted-foreground">City</p>
            <p className="text-xl font-semibold">{property.city}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div>
            <p className="text-muted-foreground">Rooms</p>
            <p className="text-lg">{property.rooms}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Floor Area</p>
            <p className="text-lg">{property.floor_area}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Land Size</p>
            <p className="text-lg">{property.land_size}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
