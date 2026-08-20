import { notFound } from "next/navigation";
import LuxeShell from "@/components/luxe/LuxeShell";
import EventCheckoutForm from "@/components/events/EventCheckoutForm";
import { events, getEvent } from "@/lib/events/data";
import { formatEventDate } from "@/lib/events/utils";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export const metadata = { title: "Event Tickets" };

export default async function EventBookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[900px]">
          <p className="lx-kicker">Event tickets</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            {event.title}
          </h1>
          <p className="mt-4 text-sm text-[#75645d]">
            {formatEventDate(event.date)} · {event.time} · ₹
            {event.price.toLocaleString("en-IN")} per guest
          </p>

          <div className="mt-6">
            <EventCheckoutForm event={event} />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
