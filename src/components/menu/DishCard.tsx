import Image from "next/image";
import Link from "next/link";
import type { Dish } from "@/lib/menu/types";
import AddToCartButton from "@/components/orders/AddToCartButton";

const accents = [
  { button: "bg-[#d9ad70]", text: "text-[#d9ad70]" },
  { button: "bg-[#c49358]", text: "text-[#d7b07a]" },
  { button: "bg-[#c9a56e]", text: "text-[#d5b582]" },
  { button: "bg-[#b98d58]", text: "text-[#d3ab78]" },
] as const;

function accentFor(slug: string) {
  const total = slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return accents[total % accents.length];
}

export default function DishCard({ dish }: { dish: Dish }) {
  const accent = accentFor(dish.slug);
  const detailHref = `/menu/${dish.slug}`;

  return (
    <article className="overflow-hidden rounded-[20px] border border-[#e7c58f]/10 bg-[#11100d] shadow-[0_16px_38px_rgba(0,0,0,.24)]">
      <Link href={detailHref} className="group block overflow-hidden">
        <div className="relative aspect-[1.22/1] overflow-hidden bg-[#16120e]">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
          />
        </div>
      </Link>

      <div className="p-4">
        <p className={`text-[9px] uppercase tracking-[.12em] ${accent.text}`}>
          {dish.category}
        </p>

        <div className="mt-1 flex items-start justify-between gap-2">
          <Link
            href={detailHref}
            className="lx-serif min-w-0 text-xl leading-[.98] text-[#f1e4d2] md:text-2xl"
          >
            {dish.name}
          </Link>
          <span className="lx-serif shrink-0 text-lg text-[#e0ac5c] md:text-xl">
            ₹{dish.price.toLocaleString("en-IN")}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-white/48">
          {dish.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {dish.chefChoice ? (
            <span className="rounded-full bg-[#c9944b]/12 px-2.5 py-1.5 text-[8px] uppercase text-[#ddb573]">
              Chef
            </span>
          ) : null}
          {dish.bestseller ? (
            <span className="rounded-full bg-white/[.045] px-2.5 py-1.5 text-[8px] uppercase text-white/56">
              Popular
            </span>
          ) : null}
          {dish.dietary.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/8 px-2.5 py-1.5 text-[8px] uppercase text-white/48"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={detailHref}
            className="flex min-h-11 items-center justify-center rounded-[12px] border border-[#e7c58f]/14 text-[9px] font-semibold uppercase tracking-[.1em] text-[#dfc59f]"
          >
            View
          </Link>
          <AddToCartButton
            dish={{
              slug: dish.slug,
              name: dish.name,
              price: dish.price,
              image: dish.image,
            }}
            label="Add"
            className={`${accent.button} flex min-h-11 items-center justify-center rounded-[12px] text-[9px] font-bold uppercase tracking-[.1em] text-[#100c08] shadow-[0_10px_24px_rgba(0,0,0,.2)] transition active:scale-[.98]`}
          />
        </div>
      </div>
    </article>
  );
}
