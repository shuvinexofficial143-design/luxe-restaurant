
import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import ReservationWizard from "@/components/reservations/ReservationWizard";
import LiveAvailabilityBadge from "@/components/reservations/LiveAvailabilityBadge";
import LuxurySectionHeading from "@/components/luxe/redesign/LuxurySectionHeading";

export const metadata = {
  title: "Reserve · LUXE",
};

export default function ReservationsPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Reservations"
        title="Your table awaits"
        text="Choose guests, date, time, dining area and table in a refined mobile-first booking flow."
        image="https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="px-3 py-8 md:px-5 md:py-14">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <LuxurySectionHeading
              eyebrow="Find your evening"
              title="Book with"
              italic="ease."
              text="The advanced booking engine remains intact — only the visual experience has been upgraded."
            />
            <div className="flex flex-wrap gap-2">
              <Link
                href="/reservations/manage"
                className="lx-ghost-button rounded-full px-4 py-3 text-[7px] uppercase tracking-[.12em]"
              >
                Manage booking
              </Link>
              <Link
                href="/reservations/waitlist"
                className="lx-ghost-button rounded-full px-4 py-3 text-[7px] uppercase tracking-[.12em]"
              >
                Waitlist
              </Link>
            </div>
          </div>

          <div className="mb-4">
            <LiveAvailabilityBadge />
          </div>

          <div className="rounded-[28px] border border-[#e7c58f]/12 bg-[#0d0b08] p-3 md:p-5">
            <ReservationWizard />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
