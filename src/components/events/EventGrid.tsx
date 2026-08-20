import type { EventRecord } from "@/lib/events/types";
import EventCard from "./EventCard";

export default function EventGrid({ events }: { events: EventRecord[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.slug} event={event} />
      ))}
    </div>
  );
}
