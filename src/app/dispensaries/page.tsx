"use client";

import { useState } from "react";
import { Header } from "@/components/puff/header";
import { Footer } from "@/components/puff/footer";
import { LocationSearch } from "@/components/puff/location-search";
import { DispensaryList } from "@/components/puff/dispensary-list";
import { DispensaryDetails } from "@/components/puff/dispensary-details";
import { allDispensaries } from "@/lib/dispensary-data";
import type { Dispensary } from "@/lib/dispensary-data";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function DispensariesPage() {
  const [isSearching, setIsSearching] = useState(true);
  const [selectedDispensary, setSelectedDispensary] = useState<Dispensary | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSearch = (location: string) => {
    console.log("Searching for dispensaries in:", location);
    setIsSearching(true);
    // Simulate a network request
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };
  
  // Simulate initial load
  useState(() => {
    setTimeout(() => {
        setIsSearching(false);
    }, 1500);
  });

  const handleDispensarySelect = (dispensary: Dispensary) => {
    setSelectedDispensary(dispensary);
    setIsSheetOpen(true);
  };
  
  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
    if (!isOpen) {
        // Give a little time for sheet to close before clearing
        setTimeout(() => setSelectedDispensary(null), 300);
    }
  }

  const LoadingSkeleton = () => (
    <div>
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center font-headline">
            Dispensaries Nearby
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                    <Skeleton className="h-40 w-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-2xl mb-12">
            <h1 className="text-4xl font-bold text-center mb-4 font-headline">Find Dispensaries</h1>
            <p className="text-lg text-center text-muted-foreground mb-8">
              Discover top-rated cannabis dispensaries near you.
            </p>
            <LocationSearch onSearch={handleSearch} isSearching={isSearching} />
          </div>

          {isSearching ? (
            <LoadingSkeleton />
          ) : (
            <DispensaryList
              dispensaries={allDispensaries}
              onDispensarySelect={handleDispensarySelect}
            />
          )}
        </div>
      </main>
      <Footer />
      <DispensaryDetails 
        dispensary={selectedDispensary}
        isOpen={isSheetOpen}
        onOpenChange={handleSheetOpenChange}
      />
    </div>
  );
}
