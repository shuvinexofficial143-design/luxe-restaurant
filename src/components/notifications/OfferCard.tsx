import Link from "next/link";
import type { Offer } from "@/lib/notifications/types";

export default function OfferCard({
  offer,
}: {
  offer: Offer;
}) {
  return (
    <article className="rounded-[24px] border border-[#4a3025]/10 bg-[#fffaf4] p-5">
      <p className="text-[8px] uppercase tracking-[.12em] text-[#7c241e]">
        {offer.eyebrow}
      </p>
      <h3 className="lx-serif mt-2 text-3xl">{offer.title}</h3>
      <p className="mt-3 text-xs leading-6 text-[#75645d]">{offer.text}</p>

      {offer.code ? (
        <div className="mt-4 rounded-[15px] bg-[#f3e7dc] p-3">
          <p className="text-[8px] uppercase tracking-[.1em] text-[#75645d]">
            Demo code
          </p>
          <p className="lx-serif mt-1 text-xl tracking-[.08em]">{offer.code}</p>
        </div>
      ) : null}

      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="text-[9px] text-[#8a756b]">{offer.validUntil}</span>
        <Link
          href={offer.href}
          className="text-[9px] uppercase tracking-[.11em] text-[#7c241e]"
        >
          Open ↗
        </Link>
      </div>
    </article>
  );
}
