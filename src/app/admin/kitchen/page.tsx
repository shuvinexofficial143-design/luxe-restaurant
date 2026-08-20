import AdminShell from "@/components/admin/AdminShell";
import KitchenQueue from "@/components/admin/KitchenQueue";

export const metadata = { title: "LUXE Kitchen KDS" };

export default function KitchenPage() {
  return (
    <AdminShell title="Kitchen KDS" eyebrow="Live Order Queue">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-5 rounded-[26px] bg-[#335f50] p-5 text-white">
          <p className="text-[9px] uppercase tracking-[.13em] text-[#efc99a]">
            Kitchen display system
          </p>
          <h2 className="lx-serif mt-2 text-4xl">
            From received to ready.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">
            This queue reads live database orders, groups their items by
            station metadata and writes every status transition to order history.
          </p>
        </div>

        <KitchenQueue />
      </div>
    </AdminShell>
  );
}
