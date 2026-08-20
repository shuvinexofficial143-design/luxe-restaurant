"use client";

import { useMemo, useState } from "react";
import type { Dish, MenuFilters } from "@/lib/menu/types";
import { filterDishes } from "@/lib/menu/filters";
import { menuCategories } from "@/lib/menu/data";
import MenuCategoryTabs from "./MenuCategoryTabs";
import StickyMenuToolbar from "./StickyMenuToolbar";
import PriceRangeFilter from "./PriceRangeFilter";
import DishGrid from "./DishGrid";
import MenuEmptyState from "./MenuEmptyState";
import FavoriteDrawer from "./FavoriteDrawer";

const initialFilters: MenuFilters = {
  query: "",
  category: "All",
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  chefChoice: false,
  maxPrice: 3000,
};

export default function MenuClient({ dishes }: { dishes: Dish[] }) {
  const [filters, setFilters] = useState<MenuFilters>(initialFilters);

  const visible = useMemo(() => filterDishes(dishes, filters), [dishes, filters]);

  return (
    <>
      <div className="space-y-4">
        <MenuCategoryTabs
          value={filters.category}
          categories={menuCategories}
          onChange={(category) => setFilters({ ...filters, category })}
        />

        <StickyMenuToolbar filters={filters} onChange={setFilters} />

        <div className="grid gap-4 md:grid-cols-[220px_1fr]">
          <aside className="md:sticky md:top-[180px] md:self-start">
            <PriceRangeFilter
              value={filters.maxPrice}
              onChange={(maxPrice) => setFilters({ ...filters, maxPrice })}
            />
            <p className="mt-3 text-xs text-[#75645d]">
              Showing {visible.length} of {dishes.length} dishes
            </p>
          </aside>

          {visible.length ? (
            <DishGrid dishes={visible} />
          ) : (
            <MenuEmptyState onReset={() => setFilters(initialFilters)} />
          )}
        </div>
      </div>

      <FavoriteDrawer />
    </>
  );
}
