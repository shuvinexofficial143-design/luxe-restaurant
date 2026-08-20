"use client";

import { useSearchParams } from "next/navigation";
import LuxeShell from "@/components/luxe/LuxeShell";
import OrderTracker from "@/components/orders/OrderTracker";

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[720px]">
          <p className="lx-kicker">Kitchen progress</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Track order.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Demo tracking uses saved browser orders and lets you advance the status to preview the full flow.
          </p>
          <div className="mt-6">
            <OrderTracker initialId={id} />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
