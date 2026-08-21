"use client";

import { useEffect, useMemo, useState } from "react";
import { dishes } from "@/lib/menu/data";
import RealCheckout from "./RealCheckout";

type MenuItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  price: number;
};

type CartLine = {
  item: MenuItem;
  quantity: number;
};

const savedMenu: MenuItem[] = dishes.map((dish) => ({
  slug: dish.slug,
  title: dish.name,
  excerpt: dish.description,
  image: dish.image,
  category: dish.category,
  price: dish.price,
}));

export default function RealOrderMenu({
  initialTable = "",
}: {
  initialTable?: string;
}) {
  const [menu, setMenu] = useState<MenuItem[]>(savedMenu);
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [category, setCategory] = useState("All");
  const [syncNote, setSyncNote] = useState(
    "Saved menu prices shown while live database sync is checked."
  );

  useEffect(() => {
    fetch("/api/v1/order-engine/menu", { cache: "no-store" })
      .then((response) => response.json())
      .then(
        (payload: {
          ok?: boolean;
          data?: { menu?: MenuItem[] };
        }) => {
          const rows = payload.data?.menu || [];

          if (rows.length) {
            setMenu(rows);
            setSyncNote("Live database menu connected.");
          } else {
            setSyncNote(
              "Saved menu is visible. Live order submission needs the database connection."
            );
          }
        }
      )
      .catch(() =>
        setSyncNote(
          "Saved menu is visible. Live order submission needs the database connection."
        )
      );
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(menu.map((item) => item.category))),
    ],
    [menu]
  );

  const visible =
    category === "All"
      ? menu
      : menu.filter((item) => item.category === category);

  const cartLines = Object.values(cart);

  function add(item: MenuItem) {
    setCart((current) => {
      const existing = current[item.slug];
      return {
        ...current,
        [item.slug]: {
          item,
          quantity: Math.min(20, (existing?.quantity || 0) + 1),
        },
      };
    });
  }

  function change(slug: string, quantity: number) {
    setCart((current) => {
      const next = { ...current };

      if (quantity <= 0) {
        delete next[slug];
      } else if (next[slug]) {
        next[slug] = {
          ...next[slug],
          quantity: Math.min(20, quantity),
        };
      }

      return next;
    });
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
      <div>
        <div className="flex gap-1.5 overflow-x-auto pb-2">
          {categories.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-3 py-2 text-[7px] uppercase tracking-[.1em] transition ${
                category === item
                  ? index % 3 === 0
                    ? "bg-[#57b8ff] text-[#071018]"
                    : index % 3 === 1
                      ? "bg-[#9d7cff] text-[#100b19]"
                      : "bg-[#39c58f] text-[#06120d]"
                  : "border border-white/10 bg-white/[.025] text-white/40"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="mt-1 px-1 text-[7px] leading-4 text-white/24">
          {syncNote}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
          {visible.map((item, index) => (
            <article
              key={item.slug}
              className="overflow-hidden rounded-[18px] border border-white/9 bg-[#11100d] shadow-[0_16px_36px_rgba(0,0,0,.22)]"
            >
              <div
                className="h-[105px] bg-[#16120e] bg-cover bg-center md:h-[145px]"
                style={
                  item.image
                    ? { backgroundImage: `url("${item.image}")` }
                    : undefined
                }
              />

              <div className="p-3">
                <p
                  className={`text-[6px] uppercase tracking-[.12em] ${
                    index % 3 === 0
                      ? "text-[#62c9ff]"
                      : index % 3 === 1
                        ? "text-[#ae93ff]"
                        : "text-[#55daa4]"
                  }`}
                >
                  {item.category}
                </p>
                <h3 className="lx-serif mt-1 line-clamp-2 text-[1.15rem] leading-[.95] text-[#f1e4d2] md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[8px] leading-4 text-white/30">
                  {item.excerpt}
                </p>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="lx-serif text-lg text-[#e0ac5c]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <button
                    type="button"
                    onClick={() => add(item)}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg font-semibold text-[#090806] shadow-lg ${
                      index % 3 === 0
                        ? "bg-[#57b8ff]"
                        : index % 3 === 1
                          ? "bg-[#9d7cff]"
                          : "bg-[#39c58f]"
                    }`}
                    aria-label={`Add ${item.title}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <RealCheckout
        lines={cartLines}
        initialTable={initialTable}
        onQuantity={change}
      />
    </div>
  );
}
