import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import EventFilters from "@/components/events/EventFilters";
import EventCalendarAdvanced from "@/components/events/EventCalendarAdvanced";
import { events } from "@/lib/events/data";

export const metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="What's on"
        title="Events"
        text="Chef collaborations, cellar dinners, seasonal tables, brunch and workshops — each event opens into its own booking flow."
        image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="px-3 py-6 md:px-5 md:py-10">
        <div className="mx-auto max-w-[1180px]">
          <EventCalendarAdvanced />
          <div className="mt-6">
            <EventFilters events={events} />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
