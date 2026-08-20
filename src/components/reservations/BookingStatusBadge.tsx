import type { BookingStatus } from "@/lib/reservations/types";

export default function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const style =
    status === "CONFIRMED"
      ? "bg-[#335f50]/10 text-[#335f50]"
      : status === "CANCELLED"
        ? "bg-[#7c241e]/10 text-[#7c241e]"
        : "bg-[#d89a4b]/15 text-[#8a5a21]";

  return (
    <span className={`rounded-full px-3 py-2 text-[8px] uppercase tracking-[.13em] ${style}`}>
      {status}
    </span>
  );
}
