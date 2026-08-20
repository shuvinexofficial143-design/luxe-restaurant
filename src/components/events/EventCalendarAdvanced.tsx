import Link from "next/link";
import { events } from "@/lib/events/data";
import { formatEventDate } from "@/lib/events/utils";

export default function EventCalendarAdvanced() {
  return (
    <div className="rounded-[28px] bg-[#201713] p-5 text-white md:p-7">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
        Upcoming calendar
      </p>
      <h2 className="lx-serif mt-2 text-4xl">Save the date.</h2>

      <div className="mt-5 divide-y divide-white/10">
        {events.slice(0, 5).map((event) => (
          <Link
            key={event.slug}
            href={`/events/${event.slug}`}
            className="grid grid-cols-[90px_1fr_auto] gap-3 py-4"
          >
            <p className="text-[9px] uppercase tracking-[.1em] text-[#efc28b]">
              {formatEventDate(event.date)}
            </p>
            <div>
              <p className="lx-serif text-xl">{event.title}</p>
              <p className="mt-1 text-[10px] text-white/45">{event.time}</p>
            </div>
            <span>↗</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
