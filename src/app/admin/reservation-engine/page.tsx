import AdminShell from "@/components/admin/AdminShell";
import ReservationEngineStatus from "@/components/reservations/ReservationEngineStatus";

export const metadata = { title: "Reservation Engine" };

export default function ReservationEngineAdminPage() {
  return (
    <AdminShell title="Reservation Engine" eyebrow="Live Inventory">
      <div className="mx-auto max-w-[1050px]">
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[28px] bg-[#fffaf4] p-6">
            <p className="text-[9px] uppercase tracking-[.13em] text-[#7c241e]">
              Concurrency-safe booking
            </p>
            <h2 className="lx-serif mt-2 text-4xl">
              Prevent double-booking at the database layer.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#75645d]">
              The engine uses PostgreSQL advisory transaction locks, expiring
              table holds and a second conflict check when the hold becomes a
              confirmed reservation.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                ["Dining inventory", "10 seeded tables across five areas"],
                ["Hold duration", "8 minutes by default"],
                ["Concurrency", "PostgreSQL transaction lock"],
                ["Waitlist", "Database-backed WAITING entries"],
                ["Deposit rule", "Large parties + Fri/Sat/Sun"],
                ["Payment link", "Razorpay order tied to reservation ID"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[16px] bg-white p-4">
                  <p className="lx-serif text-xl">{title}</p>
                  <p className="mt-2 text-[9px] leading-5 text-[#75645d]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <ReservationEngineStatus />
        </div>

        <div className="mt-5 rounded-[22px] bg-[#fff4de] p-5">
          <p className="text-[9px] uppercase tracking-[.11em] text-[#8a5a21]">
            Required setup
          </p>
          <p className="mt-2 text-sm leading-7 text-[#75645d]">
            Apply database/migrations/005_reservation_engine.sql after the
            earlier Supabase migrations. Razorpay deposit creation remains
            unavailable until real Razorpay credentials are configured.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
