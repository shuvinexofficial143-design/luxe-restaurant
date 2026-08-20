import LuxeShell from "@/components/luxe/LuxeShell";
import OfferGrid from "@/components/notifications/OfferGrid";
import DigestPreview from "@/components/notifications/DigestPreview";
import { offers } from "@/lib/notifications/data";

export const metadata = { title: "LUXE Offers" };

export default function OffersPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="lx-kicker">Offers + extras</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Something extra.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645d]">
            A premium offers hub for order promos, wine experiences, private
            dining and gift-card moments.
          </p>

          <div className="mt-6">
            <OfferGrid offers={offers} />
          </div>

          <div className="mt-6">
            <DigestPreview />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
