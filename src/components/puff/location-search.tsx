"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, LoaderCircle } from "lucide-react";

type LocationSearchProps = {
  onSearch: (location: string) => void;
  isSearching: boolean;
};

export function LocationSearch({ onSearch, isSearching }: LocationSearchProps) {
  const [location, setLocation] = useState("San Francisco, CA");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(location);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center space-x-2"
    >
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Enter your city or zip code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-10 text-base"
          disabled={isSearching}
        />
      </div>
      <Button type="submit" disabled={isSearching || !location}>
        {isSearching ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <Search />
        )}
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
