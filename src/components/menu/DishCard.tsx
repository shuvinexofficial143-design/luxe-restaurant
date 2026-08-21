import Link from "next/link";
import type { Dish } from "@/lib/menu/types";

const accents = [
  { button: "bg-[#57b8ff]", text: "text-[#62c9ff]" },
  { button: "bg-[#9d7cff]", text: "text-[#ae93ff]" },
  { button: "bg-[#39c58f]", text: "text-[#55daa4]" },
  { button: "bg-[#ff6f91]", text: "text-[#ff86a1]" },
] as const;

function accentFor(slug: string) {
  const total = slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return accents[total % accents.length];
}

export default function DishCard({ dish }: { dish: Dish }) {
  const accent = accentFor(dish.slug);
  const orderHref = `/order/item/${dish.slug}`;

  return (
    <article className="overflow-hidden rounded-[18px] border border-white/9 bg-[#11100d] shadow-[0_16px_38px_rgba(0,0,0,.24)]">
      <Link href={orderHref} className="block overflow-hidden">
        <div
          className="aspect-[1.22/1] bg-[#16120e] bg-cover bg-center transition duration-500 hover:scale-[1.025]"
          style={{ backgroundImage: `url("${dish.image}")` }}
        />
      </Link>

      <div className="p-3 md:p-4">
        <p className={`text-[6px] uppercase tracking-[.12em] ${accent.text}`}>
          {dish.category}
        </p>

        <div className="mt-1 flex items-start justify-between gap-2">
          <Link
            href={orderHref}
            className="lx-serif min-w-0 text-[1.15rem] leading-[.98] text-[#f1e4d2] md:text-xl"
          >
            {dish.name}
          </Link>
          <span className="lx-serif shrink-0 text-base text-[#e0ac5c] md:text-lg">
            ₹{dish.price.toLocaleString("en-IN")}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-[8px] leading-4 text-white/31 md:text-[9px]">
          {dish.description}
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {dish.chefChoice ? (
            <span className="rounded-full bg-[#c9944b]/12 px-2 py-1 text-[6px] uppercase text-[#ddb573]">
              Chef
            </span>
          ) : null}
          {dish.bestseller ? (
            <span className="rounded-full bg-white/[.045] px-2 py-1 text-[6px] uppercase text-white/42">
              Popular
            </span>
          ) : null}
          {dish.dietary.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/8 px-2 py-1 text-[6px] uppercase text-white/28"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={orderHref}
          className={`${accent.button} mt-3 flex min-h-10 w-full items-center justify-center rounded-[12px] text-[7px] font-bold uppercase tracking-[.11em] text-[#080706] shadow-[0_10px_24px_rgba(0,0,0,.2)] transition active:scale-[.98]`}
        >
          Order
        </Link>
      </div>
    </article>
  );
}
