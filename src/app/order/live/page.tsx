import LuxeShell from "@/components/luxe/LuxeShell";
import RealOrderMenu from "@/components/order/RealOrderMenu";

export const metadata = { title: "Live LUXE Ordering" };

export default async function LiveOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ table?: string }>;
}) {
  const { table = "" } = await searchParams;

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1180px]">
          <div className="rounded-[30px] bg-[#7c241e] p-6 text-white md:p-8">
            <p className="text-[9px] uppercase tracking-[.15em] text-[#ffd0aa]">
              Server-priced ordering
            </p>
            <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
              Order from the real database menu.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
              The browser sends dish slugs and quantities only. PostgreSQL
              looks up published menu prices and calculates the trusted total.
            </p>
          </div>

          <div className="mt-5">
            <RealOrderMenu initialTable={table} />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
