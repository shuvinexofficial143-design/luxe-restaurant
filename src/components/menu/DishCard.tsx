import Link from "next/link";
import type { Dish } from "@/lib/menu/types";

export default function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="overflow-hidden rounded-[18px] border border-[#e7c58f]/10 bg-[#100e0b] shadow-[0_14px_38px_rgba(0,0,0,.2)]">
      <Link href={`/menu/${dish.slug}`} className="block">
        <div
          className="aspect-[1.25/1] bg-cover bg-center"
          style={{ backgroundImage: `url("${dish.image}")` }}
        />
      </Link>

      <div className="p-3 md:p-4">
        <p className="text-[6px] uppercase tracking-[.12em] text-[#9f7d53]">
          {dish.category}
        </p>

        <div className="mt-1 flex items-start justify-between gap-2">
          <Link
            href={`/menu/${dish.slug}`}
            className="lx-serif min-w-0 text-lg leading-[1.02] text-[#efe0c9] md:text-xl"
          >
            {dish.name}
          </Link>
          <span className="lx-serif shrink-0 text-base text-[#d3a15e] md:text-lg">
            ₹{dish.price.toLocaleString("en-IN")}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-[8px] leading-4 text-white/32 md:text-[9px]">
          {dish.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {dish.chefChoice ? (
            <span className="rounded-full bg-[#c9944b]/14 px-2 py-1 text-[6px] uppercase text-[#d9b477]">
              Chef
            </span>
          ) : null}
          {dish.bestseller ? (
            <span className="rounded-full bg-white/[.05] px-2 py-1 text-[6px] uppercase text-white/45">
              Popular
            </span>
          ) : null}
          {dish.dietary.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#e7c58f]/10 px-2 py-1 text-[6px] uppercase text-white/30"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href={`/menu/${dish.slug}`}
            className="flex min-h-9 items-center justify-center rounded-[11px] border border-[#e7c58f]/12 text-[6px] uppercase tracking-[.1em] text-[#d7bd99]"
          >
            Details
          </Link>
          <Link
            href="/order/live"
            className="lx-gold-button flex min-h-9 items-center justify-center rounded-[11px] text-[6px] uppercase tracking-[.1em]"
          >
            Order
          </Link>
        </div>
      </div>
    </article>
  );
}
