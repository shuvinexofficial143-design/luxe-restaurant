import Link from "next/link";

export default function CareerHero() {
  return (
    <section className="px-3 pt-[86px] md:px-5 md:pt-[98px]">
      <div className="mx-auto overflow-hidden rounded-[32px] bg-[#201713] text-white md:grid md:max-w-[1180px] md:grid-cols-[1fr_.9fr]">
        <div
          className="min-h-[58svh] bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2200&q=90")',
          }}
        />
        <div className="p-6 md:flex md:items-center md:p-10">
          <div>
            <p className="text-[9px] uppercase tracking-[.16em] text-[#efc28b]">
              Join the team
            </p>
            <h1 className="lx-serif mt-3 text-5xl leading-[.9] md:text-7xl">
              Careers at LUXE.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/55">
              Kitchen, service, wine, pastry, events and operations — all built around craft, calm and detail.
            </p>

            <div className="mt-6 flex gap-2">
              <a
                href="#openings"
                className="rounded-full bg-[#7c241e] px-5 py-3 text-[9px] uppercase tracking-[.13em] text-white"
              >
                View openings
              </a>
              <Link
                href="/careers/culture"
                className="rounded-full border border-white/15 px-5 py-3 text-[9px] uppercase tracking-[.13em]"
              >
                Our culture
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
