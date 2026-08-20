import LuxeShell from "@/components/luxe/LuxeShell";
import ReservationPolicies from "@/components/reservations/ReservationPolicies";

export const metadata = { title: "Reservation Policies" };

export default function ReservationPoliciesPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="lx-kicker">Before you book</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Reservation policies.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645d]">
            Demo policy content for the portfolio build. Production rules, deposits and cancellation windows must be finalized by the restaurant.
          </p>
          <div className="mt-7"><ReservationPolicies /></div>
        </div>
      </section>
    </LuxeShell>
  );
}
