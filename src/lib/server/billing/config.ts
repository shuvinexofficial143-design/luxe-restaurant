export function razorpayPublicKey() {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
}

export function billingCurrency() {
  return "INR";
}

export function receiptNumber() {
  const date = new Date();
  const stamp = date
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");

  return `LUXE-${stamp}-${crypto
    .randomUUID()
    .slice(0, 8)
    .toUpperCase()}`;
}
