"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { cartStore } from "@/lib/orders/cart-storage";
import { cartSubtotal } from "@/lib/orders/utils";

export default function CartDrawer() {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );

  return (
    <div className="rounded-[24px] bg-[#fffaf4] p-4">
      <div className="flex items-center justify-between">
        <p className="lx-serif text-2xl">Your cart</p>
        <span className="text-xs text-[#75645d]">{items.length} dishes</span>
      </div>

      <p className="mt-3 lx-serif text-3xl text-[#7c241e]">
        ₹{cartSubtotal(items).toLocaleString("en-IN")}
      </p>

      <Link
        href="/order/cart"
        className="mt-4 flex min-h-11 items-center justify-center rounded-[15px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
      >
        Open cart
      </Link>
    </div>
  );
}
