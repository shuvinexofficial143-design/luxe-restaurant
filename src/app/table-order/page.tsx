import LuxeShell from "@/components/luxe/LuxeShell";
import TableOrderLauncher from "@/components/qr/TableOrderLauncher";

export const metadata = { title: "Table QR Ordering" };

export default function TableOrderPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1050px]">
          <p className="lx-kicker">At-table digital ordering</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Scan. Order. Stay seated.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645d]">
            Generate a table-specific QR that opens the current ordering flow with
            the table ID in the URL.
          </p>

          <div className="mt-6">
            <TableOrderLauncher />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
