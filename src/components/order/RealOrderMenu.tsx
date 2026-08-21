"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { dishes } from "@/lib/menu/data";

type MenuItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  price: number;
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
  const [category, setCategory] = useState("All");
  const [syncNote, setSyncNote] = useState(
    "Saved menu prices shown while live database sync is checked."
  );

  useEffect(() => {
    fetch("/api/v1/order-engine/menu", { cache: "no-store" })
      .then((response) => response.json())
      .then(
        (payload: {
          data?: { menu?: MenuItem[] };
        }) => {
          const rows = payload.data?.menu || [];

          if (rows.length) {
            setMenu(rows);
            setSyncNote("Live menu connected.");
          } else {
            setSyncNote("Saved menu visible. Final order requires the live database connection.");
          }
        }
      )
      .catch(() =>
        setSyncNote("Saved menu visible. Final order requires the live database connection.")
      );
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(menu.map((item) => item.category)))],
    [menu]
  );

  const visible =
    category === "All"
      ? menu
      : menu.filter((item) => item.category === category);

  const tableSuffix = initialTable
    ? `?table=${encodeURIComponent(initialTable)}`
    : "";

  return (
    <div>
      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {categories.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`shrink-0 rounded-full px-3 py-2 text-[7px] font-bold uppercase tracking-[.1em] transition ${
              category === item
                ? index % 3 === 0
                  ? "bg-[#57b8ff] text-[#071018]"
                  : index % 3 === 1
                    ? "bg-[#9d7cff] text-[#100b19]"
                    : "bg-[#39c58f] text-[#06120d]"
                : "border border-white/10 bg-white/[.025] text-white/44"
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
        {visible.map((item, index) => {
          const href = `/order/item/${item.slug}${tableSuffix}`;

          return (
            <article
              key={item.slug}
              className="overflow-hidden rounded-[18px] border border-white/9 bg-[#11100d] shadow-[0_16px_36px_rgba(0,0,0,.22)]"
            >
              <Link href={href} className="block">
                <div
                  className="h-[118px] bg-[#16120e] bg-cover bg-center transition duration-500 active:scale-[.99] md:h-[165px]"
                  style={item.image ? { backgroundImage: `url("${item.image}")` } : undefined}
                />
              </Link>

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
                <Link href={href} className="block">
                  <h3 className="lx-serif mt-1 line-clamp-2 text-[1.15rem] leading-[.95] text-[#f1e4d2] md:text-xl">
                    {item.title}
                  </h3>
                </Link>
                <p className="mt-2 line-clamp-2 text-[8px] leading-4 text-white/30">
                  {item.excerpt}
                </p>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="lx-serif text-lg text-[#e0ac5c]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <Link
                    href={href}
                    className={`flex min-h-9 items-center justify-center rounded-[11px] px-4 text-[7px] font-black uppercase tracking-[.1em] text-[#090806] ${
                      index % 3 === 0
                        ? "bg-[#57b8ff]"
                        : index % 3 === 1
                          ? "bg-[#9d7cff]"
                          : "bg-[#39c58f]"
                    }`}
                  >
                    Order
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
