import type { Dispensary } from "@/lib/dispensary-data";
import { DispensaryCard } from "./dispensary-card";

type DispensaryListProps = {
  dispensaries: Dispensary[];
  onDispensarySelect: (dispensary: Dispensary) => void;
};

export function DispensaryList({
  dispensaries,
  onDispensarySelect,
}: DispensaryListProps) {
  if (dispensaries.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-2 font-headline">No dispensaries found</h2>
        <p className="text-muted-foreground">Try searching for a different location.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight mb-8 text-center font-headline">
        Dispensaries Nearby
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dispensaries.map((dispensary, index) => (
          <div
            key={dispensary.id}
            className="animate-in fade-in-0 zoom-in-95"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
          >
            <DispensaryCard
              dispensary={dispensary}
              onSelect={() => onDispensarySelect(dispensary)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
