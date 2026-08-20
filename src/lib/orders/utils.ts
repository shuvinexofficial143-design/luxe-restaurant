import type { CartItem } from "./types";

export function createOrderId() {
  return `ORD-${Date.now().toString(36).toUpperCase().slice(-7)}`;
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function serviceCharge(subtotalAfterDiscount: number) {
  return Math.round(subtotalAfterDiscount * 0.05);
}

export function formatMoney(value: number) {
  return `₹${Math.max(0, value).toLocaleString("en-IN")}`;
}

export function itemCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
