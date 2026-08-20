import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import GiftCardHero from "@/components/gifts/GiftCardHero";
import GiftFeatures from "@/components/gifts/GiftFeatures";
import GiftFAQ from "@/components/gifts/GiftFAQ";

export const metadata = { title: "LUXE Gift Cards" };

export default function GiftCardsPage() {
  return (
    <LuxeShell>
      <GiftCardHero />

      <section className="px-3 py-8 md:px-5 md:py-12">
        <div className="mx-auto max-w-[1080px]">
          <p className="lx-kicker">Made to give</p>
          <h2 className="lx-serif mt-2 text-4xl md:text-6xl">
            More than a voucher.
          </h2>
          <div className="mt-5">
            <GiftFeatures />
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_360px]">
            <div className="rounded-[28px] bg-[#335f50] p-6 text-white">
              <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
                Start a gift
              </p>
              <h3 className="lx-serif mt-2 text-4xl">
                Build it in minutes.
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/55">
                Select a value, card design, delivery date and message — then preview everything before checkout.
              </p>
              <Link
                href="/gift-cards/buy"
                className="mt-5 inline-flex rounded-full bg-white px-4 py-3 text-[9px] uppercase tracking-[.12em] text-[#335f50]"
              >
                Create gift ↗
              </Link>
            </div>

            <GiftFAQ />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
