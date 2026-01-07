"use client";

import { useState } from "react";
import { Header } from "@/components/puff/header";
import { LocationSearch } from "@/components/puff/location-search";
import { DispensaryList } from "@/components/puff/dispensary-list";
import { Footer } from "@/components/puff/footer";
import { DispensaryDetails } from "@/components/puff/dispensary-details";
import { allDispensaries, type Dispensary } from "@/lib/dispensary-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [selectedDispensary, setSelectedDispensary] = useState<Dispensary | null>(null);

  const handleSearch = (location: string) => {
    if (!location) {
      setDispensaries([]);
      setHasSearched(true);
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      // Simulate filtering based on location. For this demo, we'll return all.
      setDispensaries(allDispensaries);
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-card w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                  Find Your Vibe
                </h1>
                <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
                  Discover top-rated dispensaries near you. Real reviews, real local.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <LocationSearch onSearch={handleSearch} isSearching={isSearching} />
              </div>
            </div>
          </div>
        </section>

        <section id="results" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            {isSearching ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : hasSearched ? (
              <DispensaryList
                dispensaries={dispensaries}
                onDispensarySelect={setSelectedDispensary}
              />
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
      <DispensaryDetails
        dispensary={selectedDispensary}
        isOpen={!!selectedDispensary}
        onOpenChange={(isOpen) => !isOpen && setSelectedDispensary(null)}
      />
    </div>
  );
}
