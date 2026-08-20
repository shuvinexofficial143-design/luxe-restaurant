import LuxeShell from "@/components/luxe/LuxeShell";
import RedeemForm from "@/components/gifts/RedeemForm";
import GiftFAQ from "@/components/gifts/GiftFAQ";

export const metadata = { title: "Check Gift Balance" };

export default function RedeemGiftPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[900px]">
          <p className="lx-kicker">Gift balance</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Redeem & check.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Enter a locally generated demo gift code to check its current balance.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
            <RedeemForm />
            <GiftFAQ />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
