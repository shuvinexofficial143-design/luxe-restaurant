"use client";

import type { CartItem } from "@/lib/orders/types";
import { cartStore } from "@/lib/orders/cart-storage";
import QuantityControl from "./QuantityControl";

export default function CartLineItem({ item }: { item: CartItem }) {
  return (
    <div className="grid grid-cols-[82px_1fr] gap-3 rounded-[20px] bg-[#fffaf4] p-3">
      <div
        className="h-[92px] rounded-[16px] bg-cover bg-center"
        style={{ backgroundImage: `url("${item.image}")` }}
      />

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="lx-serif text-xl">{item.name}</p>
            <p className="mt-1 text-[10px] text-[#75645d]">
              ₹{item.price.toLocaleString("en-IN")} each
            </p>
          </div>
          <button
            type="button"
            onClick={() => cartStore.remove(item.slug)}
            className="text-xl text-[#7c241e]"
            aria-label={`Remove ${item.name}`}
          >
            ×
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <QuantityControl
            value={item.quantity}
            onChange={(quantity) => cartStore.setQuantity(item.slug, quantity)}
          />
          <p className="lx-serif text-lg text-[#7c241e]">
            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
}
