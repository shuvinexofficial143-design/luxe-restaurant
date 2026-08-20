export function orderMoney(value: number) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

export function estimateOrderTotal(
  subtotal: number,
  fulfillment: "TABLE" | "PICKUP"
) {
  const serviceCharge =
    fulfillment === "TABLE" ? Math.round(subtotal * 5) / 100 : 0;

  return {
    subtotal,
    serviceCharge,
    total: subtotal + serviceCharge,
  };
}
