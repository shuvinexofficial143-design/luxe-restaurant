export default function BillingOverview() {
  const items = [
    [
      "Checkout",
      "Razorpay Checkout script + server-created order",
    ],
    [
      "Verification",
      "HMAC payment signature checked on server",
    ],
    [
      "Webhook",
      "Verified provider event remains secondary reconciliation path",
    ],
    [
      "Receipt",
      "Persistent receipt created only after verified payment",
    ],
    [
      "Refund",
      "Real Razorpay refund API when merchant credentials exist",
    ],
    [
      "No fake success",
      "Missing provider credentials surface an error instead",
    ],
  ];

  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(([title, text]) => (
        <div
          key={title}
          className="rounded-[18px] bg-[#fffaf4] p-4"
        >
          <p className="lx-serif text-xl">
            {title}
          </p>
          <p className="mt-2 text-[9px] leading-5 text-[#75645d]">
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}
