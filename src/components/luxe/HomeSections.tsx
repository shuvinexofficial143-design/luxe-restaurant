import Link from "next/link";
import { dishes } from "@/lib/menu/data";

const categories = [
  ["Signature", "Chef favourites", "/menu/chef-choice", "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=84"],
  ["From Fire", "Flame and smoke", "/menu/from-fire", "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=84"],
  ["Vegetarian", "Plant-led plates", "/menu/vegetarian", "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=84"],
  ["Vegan", "Clean and bright", "/menu/vegan", "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=700&q=84"],
  ["Desserts", "Sweet finishes", "/menu/desserts", "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=84"],
  ["Wine", "Pair every plate", "/menu/wine-pairing", "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=700&q=84"],
] as const;

const featured = dishes.slice(0, 6);

export default function HomeSections() {
  return (
    <>
      <section className="px-3 pt-7 md:px-5 md:pt-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[7px] uppercase tracking-[.18em] text-[#c9944b]">Browse by menu</p>
              <h2 className="lx-serif mt-1 text-3xl text-[#f1e3d0] md:text-4xl">What are you craving?</h2>
            </div>
            <Link href="/menu" className="text-[7px] uppercase tracking-[.12em] text-[#d3a762]">See all ↗</Link>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
            {categories.map(([label, note, href, image]) => (
              <Link key={label} href={href} className="group overflow-hidden rounded-[18px] border border-[#e7c58f]/10 bg-[#100e0b] transition hover:-translate-y-1 hover:border-[#c9944b]/30">
                <div className="aspect-[4/3] bg-cover bg-center transition duration-500 group-hover:scale-[1.04]" style={{ backgroundImage: `url("${image}")` }} />
                <div className="p-2.5 md:p-3">
                  <p className="lx-serif text-[15px] leading-none text-[#f0e0c9] md:text-lg">{label}</p>
                  <p className="mt-1 truncate text-[7px] text-white/30">{note}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-3 py-9 md:px-5 md:py-14">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[7px] uppercase tracking-[.18em] text-[#c9944b]">Popular tonight</p>
              <h2 className="lx-serif mt-1 text-3xl text-[#f1e3d0] md:text-4xl">Order your favourites</h2>
            </div>
            <Link href="/order/live" className="rounded-full border border-[#e7c58f]/12 px-3 py-2 text-[7px] uppercase tracking-[.1em] text-[#d2aa74]">See all</Link>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4">
            {featured.map((dish) => (
              <article key={dish.slug} className="overflow-hidden rounded-[20px] border border-[#e7c58f]/10 bg-[#100e0b]">
                <Link href={`/order/item/${dish.slug}`} className="block">
                  <div className="aspect-[1.25/1] bg-cover bg-center transition duration-500 hover:scale-[1.025]" style={{ backgroundImage: `url("${dish.image}")` }} />
                </Link>
                <div className="p-3 md:p-4">
                  <p className="text-[6px] uppercase tracking-[.12em] text-[#9f7d53]">{dish.category}</p>
                  <div className="mt-1 flex items-start justify-between gap-2">
                    <Link href={`/order/item/${dish.slug}`} className="lx-serif min-w-0 text-lg leading-[1.02] text-[#efe0c9] md:text-xl">{dish.name}</Link>
                    <span className="lx-serif shrink-0 text-base text-[#d3a15e] md:text-lg">₹{dish.price.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-[8px] leading-4 text-white/32 md:text-[9px]">{dish.description}</p>
                  <Link href={`/order/item/${dish.slug}`} className="lx-gold-button mt-3 flex min-h-10 items-center justify-center rounded-[12px] text-[7px] font-bold uppercase tracking-[.11em]">Order</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-3 pb-8 md:px-5 md:pb-12">
        <div className="mx-auto grid max-w-[1240px] gap-3 md:grid-cols-3">
          <Link href="/experiences/chefs-table" className="rounded-[18px] border border-[#e7c58f]/10 bg-white/[.018] p-4"><p className="lx-serif text-xl text-[#ead9c2]">Chef Table</p><p className="mt-1 text-[8px] text-white/30">Seven-course dining experience.</p></Link>
          <Link href="/reservations" className="rounded-[18px] border border-[#e7c58f]/10 bg-white/[.018] p-4"><p className="lx-serif text-xl text-[#ead9c2]">Reserve</p><p className="mt-1 text-[8px] text-white/30">Choose your table and time.</p></Link>
          <Link href="/private-dining" className="rounded-[18px] border border-[#e7c58f]/10 bg-white/[.018] p-4"><p className="lx-serif text-xl text-[#ead9c2]">Private Dining</p><p className="mt-1 text-[8px] text-white/30">Plan an intimate celebration.</p></Link>
        </div>
      </section>
    </>
  );
}
