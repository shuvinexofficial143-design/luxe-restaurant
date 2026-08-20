"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { cartStore } from "@/lib/orders/cart-storage";
import { cartSubtotal, itemCount } from "@/lib/orders/utils";

export default function CartButton() {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );

  if (!items.length) return null;

  return (
    <Link
      href="/order/cart"
      className="fixed bottom-[88px] left-3 right-3 z-[85] flex min-h-14 items-center justify-between rounded-[20px] bg-[#7c241e] px-5 text-white shadow-[0_18px_45px_rgba(124,36,30,.3)] md:left-auto md:right-5 md:w-[330px]"
    >
      <span className="text-[9px] uppercase tracking-[.13em]">
        View cart · {itemCount(items)} items
      </span>
      <span className="lx-serif text-lg">
        ₹{cartSubtotal(items).toLocaleString("en-IN")}
      </span>
    </Link>
  );
}
