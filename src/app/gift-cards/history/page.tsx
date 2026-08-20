import LuxeShell from "@/components/luxe/LuxeShell";
import GiftHistory from "@/components/gifts/GiftHistory";

export const metadata = { title: "Gift History" };

export default function GiftHistoryPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[820px]">
          <p className="lx-kicker">Local gift wallet</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Gift history.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Gifts created in this browser appear here with their current demo balance.
          </p>

          <div className="mt-6">
            <GiftHistory />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
