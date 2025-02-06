import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Pocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/components/favorites-context";
import { Property } from "@/data/properties";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const FavoritesPopover = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: "PROPERTY_CARD",
    drop: (item: { property: Property }) => {
      addToFavorites(item.property);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      isDragging: !!monitor.getItem(), // Check if an item is being dragged
    }),
    // Open popover when dragging starts
    hover: (item, monitor) => {
      if (monitor.getItem() && !isPopoverOpen) {
        setIsPopoverOpen(true);
      }
    },
  });

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div
          ref={drop}
          className={`relative flex items-center space-x-2 text-white hover:text-slate-500 cursor-pointer ${
            isOver ? "bg-green-500/20 rounded-md p-1" : ""
          }`}
        >
          <Pocket className="h-5 w-5" />
          <span>Favorites</span>
          {favorites.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute bg-red-500/20 -top-2 -right-4 px-1.5 py-0.5 text-xs"
            >
              {favorites.length}
            </Badge>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-96 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Pocket className="mr-2" /> Your Favorites
        </h3>
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">No favorites yet! <br/> Drag and drop properties here.</p>
        ) : (
          <div className="space-y-2">
            {favorites.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <Image
                    src={property.thumb}
                    alt={property.heading}
                    width={40}
                    height={40}
                    className="rounded-md"
                    unoptimized
                  />
                  <div>
                    <p className="text-sm font-medium">{property.heading}</p>
                    <p className="text-xs text-gray-500">
                      Rs. {property.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromFavorites(property.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
        <Link
          href="/favorites"
          className="block mt-4 text-center text-sm text-blue-600 bg-blue-500/10 rounded-sm py-1"
        >
          View All Favorites
        </Link>
      </PopoverContent>
    </Popover>
  );
};