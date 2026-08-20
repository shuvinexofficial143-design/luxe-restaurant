import { promoCodes } from "./data";
import type { PromoResult } from "./types";

export function evaluatePromo(code: string, subtotal: number): PromoResult {
  const normalized = code.trim().toUpperCase();
  const promo = promoCodes.find((item) => item.code === normalized);

  if (!promo) {
    return {
      code: normalized,
      valid: false,
      label: "Promo code not found",
      discount: 0,
    };
  }

  if (subtotal < promo.minSubtotal) {
    return {
      code: normalized,
      valid: false,
      label: `Minimum subtotal ₹${promo.minSubtotal.toLocaleString("en-IN")}`,
      discount: 0,
    };
  }

  const rawDiscount =
    promo.type === "PERCENT"
      ? Math.round((subtotal * promo.value) / 100)
      : promo.value;

  return {
    code: normalized,
    valid: true,
    label: promo.label,
    discount: Math.min(rawDiscount, subtotal),
  };
}
