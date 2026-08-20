import Link from "next/link";
import { notFound } from "next/navigation";
import LuxeShell from "@/components/luxe/LuxeShell";
import EventStatusBadge from "@/components/events/EventStatusBadge";
import UpcomingEventRail from "@/components/events/UpcomingEventRail";
import { events, getEvent } from "@/lib/events/data";
import { formatEventDate } from "@/lib/events/utils";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  return { title: event ? event.title : "Event" };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  return (
    <LuxeShell>
      <section className="px-3 pt-[86px] md:px-5 md:pt-[98px]">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[32px] bg-[#201713] text-white md:grid md:grid-cols-[1.08fr_.92fr]">
          <div
            className="min-h-[54svh] bg-cover bg-center md:min-h-[720px]"
            style={{ backgroundImage: `url("${event.image}")` }}
          />

          <div className="p-5 md:flex md:items-center md:p-9 lg:p-12">
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-[9px] uppercase tracking-[.15em] text-[#efc28b]">
                  {event.category}
                </p>
                <EventStatusBadge event={event} />
              </div>

              <h1 className="lx-serif mt-4 text-5xl leading-[.9] md:text-7xl">
                {event.title}
              </h1>
              <p className="mt-4 text-sm leading-7 text-white/60">
                {event.subtitle}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2">
                {[
                  [formatEventDate(event.date), "date"],
                  [event.time, "time"],
                  [event.duration, "duration"],
                  [`₹${event.price.toLocaleString("en-IN")}`, "per guest"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-[16px] bg-white/[.06] p-3">
                    <p className="text-sm">{value}</p>
                    <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-white/40">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-7 text-white/58">
                {event.description}
              </p>

              <div className="mt-5 space-y-2">
                {event.highlights.map((item) => (
                  <p key={item} className="text-xs text-white/65">
                    ✓ {item}
                  </p>
                ))}
              </div>

              <Link
                href={`/events/booking/${event.slug}`}
                className={`mt-7 flex min-h-13 items-center justify-center rounded-[18px] text-[9px] uppercase tracking-[.14em] ${
                  event.soldOut
                    ? "pointer-events-none bg-white/10 text-white/35"
                    : "bg-[#7c241e] text-white"
                }`}
              >
                {event.soldOut ? "Sold out" : "Book tickets ↗"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 py-10 md:px-5 md:py-14">
        <div className="mx-auto max-w-[1180px]">
          <p className="lx-kicker">More nights</p>
          <h2 className="lx-serif mt-2 text-4xl">Keep exploring.</h2>
          <div className="mt-5">
            <UpcomingEventRail />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
