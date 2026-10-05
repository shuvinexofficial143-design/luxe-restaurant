import AdminShell from "@/components/admin/AdminShell";
import ReservationManager from "@/components/admin/ReservationManager";

export const metadata = { title: "Admin Reservations · LUXE" };

export default function AdminReservationsPage() {
  return (
    <AdminShell title="Reservations" eyebrow="Guest Operations">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-5 rounded-[26px] bg-[#335f50] p-5 text-white md:p-6">
          <p className="text-[10px] uppercase tracking-[.14em] text-[#efc99a]">
            Upcoming reservations
          </p>
          <h2 className="lx-serif mt-2 text-4xl md:text-5xl">
            Every confirmed table in one view.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
            Review guest details, dining area, table assignment, deposit status
            and booking state from the protected reservation database.
          </p>
        </div>

        <ReservationManager />
      </div>
    </AdminShell>
  );
}
