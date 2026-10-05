import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import DishGrid from "@/components/menu/DishGrid";
import type { Dish } from "@/lib/menu/types";

const quick = [
  ["All", "/menu"],
  ["Chef", "/menu/chef-choice"],
  ["Fire", "/menu/from-fire"],
  ["Veg", "/menu/vegetarian"],
  ["Vegan", "/menu/vegan"],
  ["GF", "/menu/gluten-free"],
  ["Dessert", "/menu/desserts"],
  ["Wine", "/menu/wine-pairing"],
] as const;

export default function CategoryMenuPage({
  eyebrow,
  title,
  text,
  dishes,
  accent = "#57b8ff",
  activeHref = "/menu",
}: {
  eyebrow: string;
  title: string;
  text: string;
  dishes: Dish[];
  accent?: string;
  activeHref?: string;
}) {
  return (
    <LuxeShell>
      <section className="px-3 py-4 md:px-5 md:py-8">
        <div className="mx-auto max-w-[1180px]">
          <div
            className="relative overflow-hidden rounded-[22px] border border-white/9 bg-[#0f0d0a] p-4 md:p-7"
            style={{ boxShadow: `0 22px 70px ${accent}12` }}
          >
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-20 h-52 w-52 rounded-full blur-[70px]"
              style={{ background: `${accent}33` }}
            />
            <div className="relative">
              <p
                className="text-[10px] font-bold uppercase tracking-[.18em]"
                style={{ color: accent }}
              >
                {eyebrow}
              </p>
              <h1 className="lx-serif mt-2 max-w-3xl text-[2.45rem] leading-[.9] text-[#f2e6d5] md:text-6xl">
                {title}
              </h1>
              <p className="mt-3 max-w-xl text-[13px] leading-6 text-white/54 md:text-sm md:leading-7">
                {text}
              </p>
            </div>
          </div>

          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-2">
            {quick.map(([label, href]) => {
              const active = href === activeHref;
              return (
                <Link
                  key={href}
                  href={href}
                  className="shrink-0 rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-[.09em] transition"
                  style={
                    active
                      ? {
                          borderColor: `${accent}66`,
                          background: `${accent}22`,
                          color: accent,
                        }
                      : {
                          borderColor: "rgba(255,255,255,.09)",
                          background: "rgba(255,255,255,.02)",
                          color: "rgba(255,255,255,.42)",
                        }
                  }
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="mt-2">
            <DishGrid dishes={dishes} />
          </div>

          {!dishes.length ? (
            <div className="mt-4 rounded-[20px] border border-white/8 bg-white/[.02] p-5 text-center text-sm text-white/50">
              No dishes are currently listed in this collection.
            </div>
          ) : null}
        </div>
      </section>
    </LuxeShell>
  );
}
