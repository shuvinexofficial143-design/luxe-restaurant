import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import RealReservationForm from "@/components/reservations/RealReservationForm";
import ReservationEngineStatus from "@/components/reservations/ReservationEngineStatus";
import LuxurySectionHeading from "@/components/luxe/redesign/LuxurySectionHeading";

export const metadata = {
  title: "Reserve · LUXE",
  description:
    "Check table availability and reserve at LUXE Restaurant in Vijay Nagar, Indore.",
};

export default function ReservationsPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Reservations"
        title="Your table awaits"
        text="Choose your date, party size and dining area, then select an available table and confirm your evening."
        image="https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?auto=format&fit=crop&w=1800&q=82"
      />

      <section className="px-3 py-8 md:px-5 md:py-14">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_300px] lg:items-end">
            <div>
              <LuxurySectionHeading
                eyebrow="Find your evening"
                title="Book with"
                italic="ease."
                text="Availability is checked before a short table hold is created, so your selection stays protected while you finish the booking."
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/reservations/manage"
                  className="lx-ghost-button rounded-full px-4 py-3 text-[10px] uppercase tracking-[.11em]"
                >
                  Manage booking
                </Link>
                <Link
                  href="/reservations/waitlist"
                  className="lx-ghost-button rounded-full px-4 py-3 text-[10px] uppercase tracking-[.11em]"
                >
                  Join waitlist
                </Link>
                <Link
                  href="/reservations/policies"
                  className="lx-ghost-button rounded-full px-4 py-3 text-[10px] uppercase tracking-[.11em]"
                >
                  Policies
                </Link>
              </div>
            </div>
            <ReservationEngineStatus />
          </div>

          <RealReservationForm />
        </div>
      </section>
    </LuxeShell>
  );
}
