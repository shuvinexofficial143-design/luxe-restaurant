export default function DepositNotice({ amount }: { amount: number }) {
  if (amount <= 0) {
    return (
      <div className="rounded-[20px] bg-[#335f50]/10 p-4 text-[#335f50]">
        <p className="text-[9px] uppercase tracking-[.12em]">No deposit required</p>
        <p className="mt-2 text-xs leading-6">This table can be requested without an upfront deposit in the demo flow.</p>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] bg-[#fff2dd] p-4">
      <p className="text-[9px] uppercase tracking-[.12em] text-[#8a5a21]">Deposit required</p>
      <p className="lx-serif mt-2 text-2xl text-[#7c241e]">₹{amount.toLocaleString("en-IN")}</p>
      <p className="mt-2 text-xs leading-6 text-[#75645d]">Payment remains demo-only until Razorpay or Stripe is connected.</p>
    </div>
  );
}
