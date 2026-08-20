export default function PaymentStatusCard({
  title,
  amount,
  status,
  reference,
}: {
  title: string;
  amount: number;
  status: string;
  reference: string;
}) {
  return (
    <div className="rounded-[24px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#efc28b]">
        {title}
      </p>
      <p className="lx-serif mt-2 text-4xl">
        ₹
        {Number(amount).toLocaleString(
          "en-IN"
        )}
      </p>
      <div className="mt-4 flex items-center justify-between gap-3 rounded-[14px] bg-white/[.06] p-3">
        <span className="text-[8px] uppercase tracking-[.1em] text-white/40">
          {reference}
        </span>
        <span className="text-[8px] uppercase tracking-[.1em] text-[#efc28b]">
          {status}
        </span>
      </div>
    </div>
  );
}
