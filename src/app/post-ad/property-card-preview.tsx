"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/data/properties';
import { EllipsisVertical } from "lucide-react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

interface PropertyCardProps {
  property: Property;
  active?: boolean;
}

export default function PropertyCard({ property, active = true }: PropertyCardProps) {
  return (
    <Card className='overflow-hidden'>
      <CardContent className="p-0">
        <div className="relative h-48">
          <Image
            src={property.thumb}
            alt={property.heading}
            width={400}
            height={300}
            className="w-full h-48 object-cover "
            unoptimized
          />
          <Badge className="absolute top-2 left-2 bg-black/30 hover:bg-black/40 text-white backdrop-blur-sm transition duration-300 ease-in-out ">{property.property_type}</Badge>
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
          <Button className="w-full" disabled={!active}>
            View Details
          </Button>

        <Menubar className="ml-4">
          <MenubarMenu>
            <MenubarTrigger disabled={!active}>
              <EllipsisVertical className="w-5 h-5" />
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </CardFooter>
    </Card>
  );
}