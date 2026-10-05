import type { PromoResult } from "@/lib/orders/types";
import { formatMoney, serviceCharge } from "@/lib/orders/utils";

export default function CartSummary({
  subtotal,
  promo,
}: {
  subtotal: number;
  promo: PromoResult | null;
}) {
  const discount = promo?.valid ? promo.discount : 0;
  const afterDiscount = Math.max(0, subtotal - discount);
  const service = serviceCharge(afterDiscount);
  const total = afterDiscount + service;

  return (
    <div className="rounded-[24px] bg-[#201713] p-5 text-white">
      <p className="text-[10px] uppercase tracking-[.15em] text-[#efc28b]">
        Order summary
      </p>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-white/48">Subtotal</span>
          <span>{formatMoney(subtotal)}</span>
        </div>

        {discount > 0 ? (
          <div className="flex justify-between gap-4">
            <span className="text-white/48">Discount</span>
            <span className="text-[#efc28b]">− {formatMoney(discount)}</span>
          </div>
        ) : null}

        <div className="flex justify-between gap-4">
          <span className="text-white/48">Service charge</span>
          <span>{formatMoney(service)}</span>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-end justify-between gap-4">
            <span className="text-[10px] uppercase tracking-[.13em] text-white/48">
              Total
            </span>
            <span className="lx-serif text-3xl text-[#efc28b]">
              {formatMoney(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
