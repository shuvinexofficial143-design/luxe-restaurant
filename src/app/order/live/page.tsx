import LuxeShell from "@/components/luxe/LuxeShell";
import RealOrderMenu from "@/components/order/RealOrderMenu";

export const metadata = { title: "Order · LUXE" };

export default async function LiveOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ table?: string }>;
}) {
  const { table = "" } = await searchParams;

  return (
    <LuxeShell>
      <section className="px-3 py-4 md:px-5 md:py-7">
        <div className="mx-auto max-w-[1180px]">
          <div className="rounded-[22px] border border-white/10 bg-white/[.025] p-4 md:p-5">
            <p className="text-[7px] uppercase tracking-[.15em] text-[#55daa4]">
              Table ordering
            </p>
            <h1 className="lx-serif mt-1 text-3xl text-[#f3e5d3] md:text-5xl">
              Pick a dish. Set quantity. Add table.
            </h1>
            <p className="mt-2 max-w-2xl text-[9px] leading-5 text-white/32 md:text-xs">
              Prices remain visible while you build your table order.
            </p>
          </div>

          <div className="mt-4">
            <RealOrderMenu initialTable={table} />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
