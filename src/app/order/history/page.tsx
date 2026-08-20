import LuxeShell from "@/components/luxe/LuxeShell";
import OrderHistory from "@/components/orders/OrderHistory";

export const metadata = { title: "Order History" };

export default function OrderHistoryPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[820px]">
          <p className="lx-kicker">Past orders</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Order history.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Orders placed in this demo browser appear here for quick tracking and review.
          </p>
          <div className="mt-6">
            <OrderHistory />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
