"use client";

import type { SavedDishRow } from "@/lib/server/account/types";

export default function SavedDishPanel({
  dishes,
  onChanged,
}: {
  dishes: SavedDishRow[];
  onChanged: () => void;
}) {
  async function remove(dishSlug: string) {
    await fetch(
      `/api/v1/account/saved-dishes?dishSlug=${encodeURIComponent(dishSlug)}`,
      { method: "DELETE" }
    ).catch(() => undefined);
    onChanged();
  }

  return (
    <div className="rounded-[28px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Saved dishes</p>
      <h2 className="lx-serif mt-2 text-3xl">Your favourites.</h2>

      <div className="mt-4 space-y-2">
        {dishes.length ? (
          dishes.map((dish) => (
            <div
              key={dish.id}
              className="flex items-center gap-3 rounded-[16px] bg-white p-3"
            >
              <div
                className="h-14 w-14 shrink-0 rounded-[12px] bg-[#ddd] bg-cover bg-center"
                style={
                  dish.image_url
                    ? { backgroundImage: `url("${dish.image_url}")` }
                    : undefined
                }
              />
              <div className="min-w-0 flex-1">
                <p className="lx-serif truncate text-xl">{dish.dish_title}</p>
                <p className="mt-1 truncate text-[9px] text-[#8a756b]">
                  {dish.dish_slug}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void remove(dish.dish_slug)}
                className="rounded-full border border-[#7c241e]/15 px-3 py-2 text-[8px] text-[#7c241e]"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="rounded-[16px] bg-[#f3e7dc] p-4 text-xs text-[#75645d]">
            No database-saved dishes yet.
          </p>
        )}
      </div>
    </div>
  );
}
