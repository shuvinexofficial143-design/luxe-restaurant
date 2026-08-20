import AdminShell from "@/components/admin/AdminShell";
import OrderManager from "@/components/admin/OrderManager";

export const metadata = { title: "Admin Orders" };

export default function AdminOrdersPage() {
  return (
    <AdminShell title="Orders" eyebrow="Digital Ordering">
      <div className="mx-auto max-w-[1320px]">
        <p className="mb-4 max-w-2xl text-sm leading-7 text-[#75645d]">
          Progress browser-local orders from received through preparing, ready
          and completed.
        </p>
        <OrderManager />
      </div>
    </AdminShell>
  );
}
