import { depositEstimate } from "@/lib/server/reservations/config";

export default function DepositRequirementCard({
  guests,
  date,
}: {
  guests: number;
  date: string;
}) {
  const deposit = depositEstimate(guests, date);

  return (
    <div
      className={`rounded-[18px] p-4 ${
        deposit.required
          ? "bg-[#7c241e] text-white"
          : "bg-[#335f50] text-white"
      }`}
    >
      <p className="text-[8px] uppercase tracking-[.1em] opacity-60">
        Deposit policy
      </p>
      <p className="lx-serif mt-2 text-2xl">
        {deposit.required
          ? `₹${deposit.amount.toLocaleString("en-IN")} deposit`
          : "No deposit expected"}
      </p>
      <p className="mt-2 text-[9px] leading-5 opacity-55">
        Final deposit requirement is calculated again inside the database
        booking transaction.
      </p>
    </div>
  );
}
