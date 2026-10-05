import AdminShell from "@/components/admin/AdminShell";
import KitchenQueue from "@/components/admin/KitchenQueue";

export const metadata = { title: "Admin Orders · LUXE" };

export default function AdminOrdersPage() {
  return (
    <AdminShell title="Orders" eyebrow="Live Restaurant Orders">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-5 rounded-[26px] bg-[#201713] p-5 text-white md:p-6">
          <p className="text-[10px] uppercase tracking-[.14em] text-[#efc28b]">
            Live order operations
          </p>
          <h2 className="lx-serif mt-2 text-4xl md:text-5xl">
            From received to ready.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">
            Orders placed through the customer checkout and table-ordering flow
            appear here with their current kitchen status.
          </p>
        </div>

        <KitchenQueue />
      </div>
    </AdminShell>
  );
}
