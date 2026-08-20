"use client";

import { useMemo, useState } from "react";
import type { Wine, WineFilters } from "@/lib/wine/types";
import { filterWines } from "@/lib/wine/filters";
import WineSearch from "./WineSearch";
import WineFilterBar from "./WineFilterBar";
import WineTypeTabs from "./WineTypeTabs";
import WinePriceRange from "./WinePriceRange";
import WineGrid from "./WineGrid";
import WineEmptyState from "./WineEmptyState";
import FavoriteWineDrawer from "./FavoriteWineDrawer";

const initial: WineFilters = {
  query: "",
  type: "All",
  region: "All",
  body: "All",
  maxPrice: 12000,
  sommelierChoice: false,
};

export default function WineClient({ wines }: { wines: Wine[] }) {
  const [filters, setFilters] = useState<WineFilters>(initial);

  const visible = useMemo(
    () => filterWines(wines, filters),
    [wines, filters]
  );

  return (
    <>
      <div className="space-y-4">
        <WineTypeTabs
          value={filters.type}
          onChange={(type) => setFilters({ ...filters, type })}
        />

        <div className="sticky top-[80px] z-30 rounded-[22px] border border-[#4a3025]/10 bg-[#f7f1e8]/95 p-3 backdrop-blur-xl md:top-[92px]">
          <WineSearch
            value={filters.query}
            onChange={(query) => setFilters({ ...filters, query })}
          />
          <div className="mt-2">
            <WineFilterBar filters={filters} onChange={setFilters} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[220px_1fr]">
          <aside className="md:sticky md:top-[210px] md:self-start">
            <WinePriceRange
              value={filters.maxPrice}
              onChange={(maxPrice) => setFilters({ ...filters, maxPrice })}
            />
            <p className="mt-3 text-xs text-[#75645d]">
              Showing {visible.length} of {wines.length} wines
            </p>
          </aside>

          {visible.length ? (
            <WineGrid wines={visible} />
          ) : (
            <WineEmptyState onReset={() => setFilters(initial)} />
          )}
        </div>
      </div>

      <FavoriteWineDrawer />
    </>
  );
}
