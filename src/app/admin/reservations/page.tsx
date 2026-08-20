import AdminShell from "@/components/admin/AdminShell";
import ReservationManager from "@/components/admin/ReservationManager";

export const metadata = { title: "Admin Reservations" };

export default function AdminReservationsPage() {
  return (
    <AdminShell title="Reservations" eyebrow="Guest Operations">
      <div className="mx-auto max-w-[1320px]">
        <p className="mb-4 max-w-2xl text-sm leading-7 text-[#75645d]">
          Review locally created reservations and move them between confirmed,
          waitlisted and cancelled demo states.
        </p>
        <ReservationManager />
      </div>
    </AdminShell>
  );
}
