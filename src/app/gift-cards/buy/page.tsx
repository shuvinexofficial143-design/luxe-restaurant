import LuxeShell from "@/components/luxe/LuxeShell";
import GiftBuilder from "@/components/gifts/GiftBuilder";

export const metadata = { title: "Buy a LUXE Gift Card" };

export default function BuyGiftCardPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1080px]">
          <p className="lx-kicker">Digital gift builder</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Make it personal.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645d]">
            Pick the value, occasion, design, recipient, message and delivery date.
          </p>

          <div className="mt-6">
            <GiftBuilder />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
