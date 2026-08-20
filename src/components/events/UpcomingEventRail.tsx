import Link from "next/link";
import { events } from "@/lib/events/data";

export default function UpcomingEventRail() {
  return (
    <div className="-mx-3 flex gap-3 overflow-x-auto px-3 pb-2 md:mx-0 md:px-0">
      {events.slice(0, 4).map((event) => (
        <Link
          key={event.slug}
          href={`/events/${event.slug}`}
          className="w-[82vw] max-w-[360px] shrink-0 overflow-hidden rounded-[24px] bg-[#fffaf4]"
        >
          <div
            className="h-[240px] bg-cover bg-center"
            style={{ backgroundImage: `url("${event.image}")` }}
          />
          <div className="p-4">
            <p className="text-[8px] uppercase tracking-[.12em] text-[#7c241e]">
              {event.category}
            </p>
            <p className="lx-serif mt-1 text-2xl">{event.title}</p>
            <p className="mt-2 text-[10px] text-[#75645d]">
              {event.time} · ₹{event.price.toLocaleString("en-IN")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
