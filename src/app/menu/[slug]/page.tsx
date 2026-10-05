import Link from "next/link";
import { notFound } from "next/navigation";
import LuxeShell from "@/components/luxe/LuxeShell";
import FavoriteButton from "@/components/menu/FavoriteButton";
import DietaryBadges from "@/components/menu/DietaryBadges";
import SpiceLevel from "@/components/menu/SpiceLevel";
import DishGrid from "@/components/menu/DishGrid";
import { dishes, getDish } from "@/lib/menu/data";
import AddToCartButton from "@/components/orders/AddToCartButton";
import CartButton from "@/components/orders/CartButton";

export function generateStaticParams() {
  return dishes.map((dish) => ({ slug: dish.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dish = getDish(slug);
  return { title: dish ? dish.name : "Dish" };
}

export default async function DishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dish = getDish(slug);
  if (!dish) notFound();

  const related = dishes
    .filter((item) => item.category === dish.category && item.slug !== dish.slug)
    .slice(0, 3);

  return (
    <LuxeShell>
      <section className="px-3 pt-[86px] md:px-5 md:pt-[98px]">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[32px] bg-[#fffaf4] md:grid md:grid-cols-[1.08fr_.92fr]">
          <div
            className="min-h-[54svh] bg-cover bg-center md:min-h-[720px]"
            style={{ backgroundImage: `url("${dish.image}")` }}
          />

          <div className="p-5 md:flex md:items-center md:p-9 lg:p-12">
            <div className="w-full">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[.18em] text-[#7c241e]">{dish.category}</p>
                  <h1 className="lx-serif mt-2 text-5xl leading-[.88] md:text-7xl">{dish.name}</h1>
                </div>
                <FavoriteButton slug={dish.slug} />
              </div>

              <p className="mt-5 text-sm leading-7 text-[#75645d] md:text-base">{dish.description}</p>

              <div className="mt-5 flex items-center justify-between gap-4">
                <DietaryBadges tags={dish.dietary} />
                <SpiceLevel level={dish.spice} />
              </div>

              <div className="mt-7 grid grid-cols-3 gap-2">
                {[
                  [`₹${dish.price.toLocaleString("en-IN")}`, "price"],
                  [`${dish.calories}`, "kcal"],
                  [`${dish.protein}g`, "protein"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-[18px] bg-[#f3e7dc] p-3 text-center">
                    <p className="lx-serif text-xl text-[#7c241e]">{value}</p>
                    <p className="mt-1 text-[8px] uppercase tracking-[.12em] text-[#75645d]">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <p className="text-[9px] uppercase tracking-[.16em] text-[#7c241e]">Ingredients</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {dish.ingredients.map((ingredient) => (
                    <span key={ingredient} className="rounded-full border border-[#4a3025]/10 px-3 py-2 text-xs text-[#66534b]">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {dish.winePairing ? (
                <div className="mt-7 rounded-[22px] bg-[#335f50] p-5 text-white">
                  <p className="text-[9px] uppercase tracking-[.15em] text-[#f2cc99]">Sommelier pairing</p>
                  <p className="lx-serif mt-2 text-2xl">{dish.winePairing.name}</p>
                  <p className="mt-2 text-xs leading-6 text-white/62">{dish.winePairing.note}</p>
                </div>
              ) : null}

              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                <AddToCartButton
                  dish={{
                    slug: dish.slug,
                    name: dish.name,
                    price: dish.price,
                    image: dish.image,
                  }}
                  className="flex min-h-13 items-center justify-center rounded-[18px] bg-[#7c241e] px-4 text-[10px] uppercase tracking-[.12em] text-white"
                />
                <Link href="/reservations" className="flex min-h-13 items-center justify-center rounded-[18px] bg-[#335f50] px-4 text-[10px] uppercase tracking-[.12em] text-white">
                  Reserve table
                </Link>
                <Link href="/menu" className="flex min-h-13 items-center justify-center rounded-[18px] border border-[#4a3025]/10 px-4 text-[10px] uppercase tracking-[.12em]">
                  Back to menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="px-3 py-10 md:px-5 md:py-16">
          <div className="mx-auto max-w-[1180px]">
            <p className="lx-kicker">You may also like</p>
            <h2 className="lx-serif mt-2 text-4xl">More from {dish.category}</h2>
            <div className="mt-5"><DishGrid dishes={related} /></div>
          </div>
        </section>
      ) : null}
      <CartButton />
    </LuxeShell>
  );
}
