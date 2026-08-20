"use client";

import { useMemo, useState } from "react";
import { dishes, menuCategories } from "@/lib/menu/data";
import OrderDishCard from "./OrderDishCard";

export default function OrderMenu() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return dishes.filter((dish) => {
      if (category !== "All" && dish.category !== category) return false;
      if (!q) return true;

      return [dish.name, dish.description, ...dish.ingredients]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, category]);

  return (
    <div>
      <div className="sticky top-[82px] z-30 rounded-[22px] border border-[#4a3025]/10 bg-[#f7f1e8]/95 p-3 backdrop-blur-xl md:top-[94px]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search order menu..."
          className="h-11 w-full rounded-[15px] border border-[#4a3025]/10 bg-white px-4 text-sm outline-none"
        />

        <div className="mt-2 flex gap-2 overflow-x-auto">
          {["All", ...menuCategories].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`min-h-9 shrink-0 rounded-full px-3 text-[8px] uppercase tracking-[.11em] ${
                category === item
                  ? "bg-[#201713] text-white"
                  : "border border-[#4a3025]/10 bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((dish) => (
          <OrderDishCard key={dish.slug} dish={dish} />
        ))}
      </div>
    </div>
  );
}
