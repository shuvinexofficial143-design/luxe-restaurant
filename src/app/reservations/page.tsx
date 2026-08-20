import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import ReservationWizard from "@/components/reservations/ReservationWizard";
import LiveAvailabilityBadge from "@/components/reservations/LiveAvailabilityBadge";

export const metadata = { title: "Reserve a Table" };

export default function ReservationsPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Advanced booking"
        title="Reserve"
        text="Choose guests, date, time, dining area and even your table in one mobile-first flow."
        image="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="px-3 py-6 md:px-5 md:py-10">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <LiveAvailabilityBadge />
            <div className="flex gap-2">
              <Link href="/reservations/manage" className="rounded-full border border-[#4a3025]/10 bg-white/60 px-4 py-3 text-[9px] uppercase tracking-[.12em]">
                Manage booking
              </Link>
              <Link href="/reservations/waitlist" className="rounded-full border border-[#4a3025]/10 bg-white/60 px-4 py-3 text-[9px] uppercase tracking-[.12em]">
                Waitlist
              </Link>
            </div>
          </div>

          <ReservationWizard />
        </div>
      </section>
    </LuxeShell>
  );
}
