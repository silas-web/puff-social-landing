"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "./star-rating";
import type { Dispensary } from "@/lib/dispensary-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MapPin } from "lucide-react";

type DispensaryCardProps = {
  dispensary: Dispensary;
  onSelect: () => void;
};

export function DispensaryCard({ dispensary, onSelect }: DispensaryCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === dispensary.imageId);

  return (
    <Card
      className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full flex flex-col"
      onClick={onSelect}
    >
      <div className="relative aspect-video w-full">
        {placeholder && (
            <Image
              src={placeholder.imageUrl}
              alt={placeholder.description}
              fill
              className="object-cover"
              data-ai-hint={placeholder.imageHint}
            />
        )}
      </div>
      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold font-headline mb-1">{dispensary.name}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <StarRating rating={dispensary.rating} className="text-accent" />
                <span className="font-semibold text-foreground">{dispensary.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{dispensary.distance} mi</span>
              </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
