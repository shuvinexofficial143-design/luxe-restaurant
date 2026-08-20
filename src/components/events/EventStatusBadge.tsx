import type { EventRecord } from "@/lib/events/types";
import { seatLabel } from "@/lib/events/tickets";

export default function EventStatusBadge({ event }: { event: EventRecord }) {
  return (
    <span
      className={`rounded-full px-3 py-2 text-[8px] uppercase tracking-[.12em] ${
        event.soldOut
          ? "bg-[#7c241e] text-white"
          : event.seatsRemaining <= 6
            ? "bg-[#fff0d8] text-[#8a5a21]"
            : "bg-[#335f50]/10 text-[#335f50]"
      }`}
    >
      {seatLabel(event)}
    </span>
  );
}
