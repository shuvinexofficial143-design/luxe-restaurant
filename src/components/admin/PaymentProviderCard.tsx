export default function PaymentProviderCard() {
  return (
    <div className="rounded-[26px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#efc28b]">
        Razorpay
      </p>
      <h2 className="lx-serif mt-2 text-3xl">Real payment foundation.</h2>
      <div className="mt-5 space-y-2 text-[10px] leading-5 text-white/55">
        <p>✓ Server-side order creation</p>
        <p>✓ HMAC payment signature verification</p>
        <p>✓ Webhook signature verification</p>
        <p>✓ Credentials remain server-only</p>
        <p>… Checkout UI activation still requires real merchant credentials</p>
        <p>… Verified webhook persistence/idempotency is next</p>
      </div>
    </div>
  );
}
