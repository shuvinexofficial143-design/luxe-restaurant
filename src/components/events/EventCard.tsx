import Link from "next/link";
import type { EventRecord } from "@/lib/events/types";
import { formatEventDate } from "@/lib/events/utils";
import { seatLabel } from "@/lib/events/tickets";

export default function EventCard({ event }: { event: EventRecord }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group overflow-hidden rounded-[26px] border border-[#4a3025]/10 bg-[#fffaf4] shadow-[0_18px_50px_rgba(70,40,26,.07)]"
    >
      <div className="relative h-[320px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-[1.04]"
          style={{ backgroundImage: `url("${event.image}")` }}
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="rounded-full bg-[#201713]/88 px-3 py-2 text-[8px] uppercase tracking-[.12em] text-white">
            {event.category}
          </span>
          <span
            className={`rounded-full px-3 py-2 text-[8px] uppercase tracking-[.12em] ${
              event.soldOut
                ? "bg-[#7c241e] text-white"
                : "bg-white/90 text-[#7c241e]"
            }`}
          >
            {seatLabel(event)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[9px] uppercase tracking-[.13em] text-[#7c241e]">
          {formatEventDate(event.date)} · {event.time}
        </p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <div>
            <h2 className="lx-serif text-3xl">{event.title}</h2>
            <p className="mt-2 text-xs leading-6 text-[#75645d]">
              {event.subtitle}
            </p>
          </div>
          <p className="lx-serif shrink-0 text-xl text-[#7c241e]">
            ₹{event.price.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </Link>
  );
}
