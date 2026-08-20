import type { Wine, WineFilters } from "./types";

export function filterWines(wines: Wine[], filters: WineFilters) {
  const query = filters.query.trim().toLowerCase();

  return wines.filter((wine) => {
    if (filters.type !== "All" && wine.type !== filters.type) return false;
    if (filters.region !== "All" && wine.region !== filters.region) return false;
    if (filters.body !== "All" && wine.body !== filters.body) return false;
    if (filters.sommelierChoice && !wine.sommelierChoice) return false;
    if (wine.priceBottle > filters.maxPrice) return false;

    if (query) {
      const haystack = [
        wine.name,
        wine.producer,
        wine.type,
        wine.region,
        wine.country,
        ...wine.grape,
        ...wine.notes,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}
