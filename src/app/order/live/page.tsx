import LuxeShell from "@/components/luxe/LuxeShell";
import RealOrderMenu from "@/components/order/RealOrderMenu";

export const metadata = { title: "Table Ordering · LUXE" };

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
          <div className="rounded-[22px] border border-[#e7c58f]/10 bg-white/[.025] p-4 md:p-6">
            <p className="text-[10px] uppercase tracking-[.15em] text-[#c9944b]">
              Table ordering
            </p>
            <h1 className="lx-serif mt-1 text-3xl text-[#f3e5d3] md:text-5xl">
              Order from your table.
            </h1>
            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-white/52 md:text-sm">
              Choose a dish, confirm the quantity and table number, then follow
              the kitchen status from the tracking screen.
            </p>
            {table ? (
              <p className="mt-3 inline-flex rounded-full border border-[#c9944b]/20 bg-[#c9944b]/10 px-3 py-2 text-[10px] uppercase tracking-[.1em] text-[#dfba83]">
                Table {table}
              </p>
            ) : null}
          </div>

          <div className="mt-4">
            <RealOrderMenu initialTable={table} />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
