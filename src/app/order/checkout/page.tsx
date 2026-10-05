"use client";

import { useSyncExternalStore } from "react";
import LuxeShell from "@/components/luxe/LuxeShell";
import CheckoutForm from "@/components/orders/CheckoutForm";
import CartSummary from "@/components/orders/CartSummary";
import OrderEmptyState from "@/components/orders/OrderEmptyState";
import { cartStore } from "@/lib/orders/cart-storage";
import { cartSubtotal } from "@/lib/orders/utils";

export default function CheckoutPage() {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const subtotal = cartSubtotal(items);

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="lx-kicker">Finish your order</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Checkout.</h1>

          <div className="mt-6">
            {!items.length ? (
              <OrderEmptyState />
            ) : (
              <div className="grid gap-4 lg:grid-cols-[1fr_330px]">
                <CheckoutForm />
                <div className="lg:sticky lg:top-[110px] lg:self-start">
                  <CartSummary subtotal={subtotal} promo={null} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
