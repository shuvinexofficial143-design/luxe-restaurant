import Link from "next/link";

export default function GiftCardHero() {
  return (
    <section className="px-3 pt-[86px] md:px-5 md:pt-[98px]">
      <div className="mx-auto overflow-hidden rounded-[32px] bg-[#201713] text-white md:grid md:max-w-[1180px] md:grid-cols-[1fr_.88fr]">
        <div
          className="min-h-[56svh] bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=90")',
          }}
        />
        <div className="p-6 md:flex md:items-center md:p-10">
          <div>
            <p className="text-[9px] uppercase tracking-[.16em] text-[#efc28b]">
              Give a LUXE night
            </p>
            <h1 className="lx-serif mt-3 text-5xl leading-[.9] md:text-7xl">
              Gift Cards.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/55">
              Choose an amount, occasion design, personal message and delivery date.
            </p>

            <div className="mt-6 flex gap-2">
              <Link
                href="/gift-cards/buy"
                className="rounded-full bg-[#7c241e] px-5 py-3 text-[9px] uppercase tracking-[.13em] text-white"
              >
                Buy a gift ↗
              </Link>
              <Link
                href="/gift-cards/redeem"
                className="rounded-full border border-white/15 px-5 py-3 text-[9px] uppercase tracking-[.13em]"
              >
                Check balance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
