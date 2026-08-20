import LuxeShell from "@/components/luxe/LuxeShell";
import GiftCheckout from "@/components/gifts/GiftCheckout";

export const metadata = { title: "Gift Card Checkout" };

export default function GiftCheckoutPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[980px]">
          <p className="lx-kicker">Final check</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Gift checkout.</h1>

          <div className="mt-6">
            <GiftCheckout />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
