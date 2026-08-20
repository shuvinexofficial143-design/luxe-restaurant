import LuxeShell from "@/components/luxe/LuxeShell";
import RealReservationForm from "@/components/reservations/RealReservationForm";
import ReservationEngineStatus from "@/components/reservations/ReservationEngineStatus";

export const metadata = { title: "Live LUXE Reservations" };

export default function LiveReservationsPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
            <div className="rounded-[30px] bg-[#335f50] p-6 text-white md:p-8">
              <p className="text-[9px] uppercase tracking-[.15em] text-[#efc99a]">
                Atomic reservation engine
              </p>
              <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
                A real table, not a fake slot.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
                Availability comes from the database. Selecting a table creates
                a short atomic hold so another guest cannot claim the same
                table while you finish the booking.
              </p>
            </div>

            <ReservationEngineStatus />
          </div>

          <div className="mt-5">
            <RealReservationForm />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
