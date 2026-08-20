"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import LuxeShell from "@/components/luxe/LuxeShell";
import CartLineItem from "@/components/orders/CartLineItem";
import CartSummary from "@/components/orders/CartSummary";
import PromoCodeForm from "@/components/orders/PromoCodeForm";
import OrderEmptyState from "@/components/orders/OrderEmptyState";
import { cartStore } from "@/lib/orders/cart-storage";
import { cartSubtotal } from "@/lib/orders/utils";
import type { PromoResult } from "@/lib/orders/types";

export default function CartPage() {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const [promo, setPromo] = useState<PromoResult | null>(null);
  const subtotal = cartSubtotal(items);

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="lx-kicker">Your order</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Cart.</h1>

          <div className="mt-6">
            {!items.length ? (
              <OrderEmptyState />
            ) : (
              <div className="grid gap-4 lg:grid-cols-[1fr_330px]">
                <div className="space-y-3">
                  {items.map((item) => (
                    <CartLineItem key={item.slug} item={item} />
                  ))}

                  <PromoCodeForm
                    subtotal={subtotal}
                    value={promo}
                    onChange={setPromo}
                  />

                  <Link
                    href="/order"
                    className="inline-flex text-[9px] uppercase tracking-[.12em] text-[#7c241e]"
                  >
                    ← Add more dishes
                  </Link>
                </div>

                <div className="space-y-3 lg:sticky lg:top-[110px] lg:self-start">
                  <CartSummary subtotal={subtotal} promo={promo} />

                  <Link
                    href={`/order/checkout${promo?.valid ? `?promo=${encodeURIComponent(promo.code)}` : ""}`}
                    className="flex min-h-13 items-center justify-center rounded-[18px] bg-[#7c241e] text-[9px] uppercase tracking-[.14em] text-white"
                  >
                    Checkout ↗
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
