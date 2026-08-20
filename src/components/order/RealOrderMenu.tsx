"use client";

import { useEffect, useMemo, useState } from "react";
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

export default function RealOrderMenu({
  initialTable = "",
}: {
  initialTable?: string;
}) {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("Loading database menu…");

  useEffect(() => {
    fetch("/api/v1/order-engine/menu", { cache: "no-store" })
      .then((response) => response.json())
      .then(
        (payload: {
          ok?: boolean;
          data?: { menu?: MenuItem[] };
          error?: { message?: string };
        }) => {
          const rows = payload.data?.menu || [];
          setMenu(rows);
          setMessage(
            rows.length
              ? ""
              : payload.error?.message || "No orderable menu items found."
          );
        }
      )
      .catch(() => setMessage("Menu could not be loaded."));
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
    <div className="grid gap-5 xl:grid-cols-[1fr_390px]">
      <div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-4 py-3 text-[8px] uppercase tracking-[.1em] ${
                category === item
                  ? "bg-[#201713] text-white"
                  : "border border-[#4a3025]/10 bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {message ? (
          <p className="mt-3 rounded-[18px] bg-[#fff4de] p-4 text-xs text-[#75645d]">
            {message}
          </p>
        ) : null}

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {visible.map((item) => (
            <article
              key={item.slug}
              className="overflow-hidden rounded-[24px] bg-[#fffaf4]"
            >
              <div
                className="h-[180px] bg-[#ddd] bg-cover bg-center"
                style={
                  item.image
                    ? { backgroundImage: `url("${item.image}")` }
                    : undefined
                }
              />
              <div className="p-4">
                <p className="text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
                  {item.category}
                </p>
                <h3 className="lx-serif mt-1 text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-[#75645d]">
                  {item.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="lx-serif text-xl text-[#7c241e]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <button
                    type="button"
                    onClick={() => add(item)}
                    className="rounded-full bg-[#335f50] px-4 py-3 text-[8px] uppercase tracking-[.1em] text-white"
                  >
                    Add
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
