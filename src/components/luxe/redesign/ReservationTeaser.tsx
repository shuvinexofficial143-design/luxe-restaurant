import Link from "next/link";

export default function ReservationTeaser() {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-[#e7c58f]/14 bg-[#100d0a] p-6 md:p-10">
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-32 h-72 w-72 rounded-full border border-[#c9944b]/20 shadow-[0_0_100px_rgba(201,148,75,.12)]"
      />
      <div className="relative max-w-2xl">
        <p className="text-[8px] uppercase tracking-[.24em] text-[#c9944b]">
          Reserve
        </p>
        <h3 className="lx-serif mt-4 text-4xl leading-[.94] text-[#f2e5d3] md:text-6xl">
          Your table
          <span className="block italic text-[#d2a15d]">awaits.</span>
        </h3>
        <p className="mt-4 max-w-lg text-sm leading-7 text-white/38">
          Dinner, tasting menu or chef&apos;s table — choose the pace that fits
          the evening.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/reservations"
            className="lx-gold-button rounded-full px-5 py-3 text-[8px] uppercase tracking-[.13em]"
          >
            Find a table
          </Link>
          <Link
            href="/reservations/manage"
            className="lx-ghost-button rounded-full px-5 py-3 text-[8px] uppercase tracking-[.13em]"
          >
            Manage booking
          </Link>
        </div>
      </div>
    </div>
  );
}
