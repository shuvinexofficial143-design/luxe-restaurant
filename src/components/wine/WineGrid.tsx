import type { Wine } from "@/lib/wine/types";
import WineCard from "./WineCard";

export default function WineGrid({ wines }: { wines: Wine[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {wines.map((wine) => (
        <WineCard key={wine.slug} wine={wine} />
      ))}
    </div>
  );
}
