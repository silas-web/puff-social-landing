import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "./star-rating";
import type { Dispensary } from "@/lib/dispensary-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MapPin } from "lucide-react";

type DispensaryDetailsProps = {
  dispensary: Dispensary | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function DispensaryDetails({
  dispensary,
  isOpen,
  onOpenChange,
}: DispensaryDetailsProps) {
  if (!dispensary) {
    return null;
  }
  const placeholder = PlaceHolderImages.find(p => p.id === dispensary.imageId);
  
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <ScrollArea className="h-full">
          <div className="pb-6">
            <SheetHeader className="p-6 space-y-2 text-left">
                {placeholder && (
                  <div className="relative h-48 w-full -mx-6 -mt-6">
                      <Image
                        src={placeholder.imageUrl}
                        alt={placeholder.description}
                        fill
                        className="object-cover rounded-t-lg"
                        data-ai-hint={placeholder.imageHint}
                      />
                  </div>
                )}
                <div className="pt-6">
                    <SheetTitle className="text-3xl font-bold font-headline">{dispensary.name}</SheetTitle>
                    <SheetDescription className="flex items-center gap-4 text-base pt-2">
                        <div className="flex items-center gap-2">
                            <StarRating rating={dispensary.rating} className="text-accent" />
                            <span className="font-bold text-foreground">{dispensary.rating.toFixed(1)}</span>
                            <span className="text-muted-foreground">({dispensary.reviews.length} reviews)</span>
                        </div>
                    </SheetDescription>
                    <div className="flex items-center gap-2 text-muted-foreground pt-2">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span>{dispensary.address}</span>
                    </div>
                </div>
            </SheetHeader>
            
            <Separator className="my-4" />

            <div className="px-6">
              <h3 className="text-xl font-bold mb-4 font-headline">Reviews</h3>
              <div className="space-y-6">
                {dispensary.reviews.map((review) => {
                  const avatarPlaceholder = PlaceHolderImages.find(p => p.id === review.user.avatarId);
                  return (
                    <div key={review.id} className="flex gap-4">
                      <Avatar>
                        {avatarPlaceholder && (
                          <AvatarImage src={avatarPlaceholder.imageUrl} alt={review.user.name} data-ai-hint={avatarPlaceholder.imageHint} />
                        )}
                        <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold">{review.user.name}</p>
                          <StarRating rating={review.rating} starClassName="h-4 w-4" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
