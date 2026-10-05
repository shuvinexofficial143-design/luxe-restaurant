"use client";

import Image from "next/image";
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
    "Showing the current saved menu while availability is refreshed."
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
            setSyncNote("Menu updated from the kitchen.");
          } else {
            setSyncNote(
              "The menu is available to browse. Ordering may be temporarily unavailable."
            );
          }
        }
      )
      .catch(() =>
        setSyncNote(
          "The menu is available to browse. Ordering may be temporarily unavailable."
        )
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
    ? "?table=" + encodeURIComponent(initialTable)
    : "";

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={
              "shrink-0 rounded-full border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[.1em] transition " +
              (category === item
                ? "border-[#c9944b]/50 bg-[#c9944b] text-[#100c08]"
                : "border-white/10 bg-white/[.025] text-white/52 hover:border-[#c9944b]/28 hover:text-[#e4c99e]")
            }
          >
            {item}
          </button>
        ))}
      </div>

      <p className="mt-1 px-1 text-[10px] leading-5 text-white/42">
        {syncNote}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {visible.map((item) => {
          const href = "/order/item/" + item.slug + tableSuffix;

          return (
            <article
              key={item.slug}
              className="overflow-hidden rounded-[20px] border border-[#e7c58f]/10 bg-[#11100d] shadow-[0_16px_36px_rgba(0,0,0,.22)]"
            >
              <Link href={href} className="group block">
                <div className="relative aspect-[1.25/1] overflow-hidden bg-[#16120e]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.035]"
                    />
                  ) : null}
                </div>
              </Link>

              <div className="p-4">
                <p className="text-[9px] uppercase tracking-[.12em] text-[#c7a26d]">
                  {item.category}
                </p>
                <Link href={href} className="block">
                  <h3 className="lx-serif mt-1 line-clamp-2 text-xl leading-[.98] text-[#f1e4d2] md:text-2xl">
                    {item.title}
                  </h3>
                </Link>
                <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-white/46">
                  {item.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="lx-serif text-xl text-[#e0ac5c]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <Link
                    href={href}
                    className="flex min-h-10 items-center justify-center rounded-[12px] bg-[#c9944b] px-4 text-[9px] font-bold uppercase tracking-[.1em] text-[#090806]"
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
